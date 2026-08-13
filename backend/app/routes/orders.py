from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import uuid
from app.database import get_db
from app.models import Order, OrderItem, Product, OrderStatus
from app.schemas import OrderCreate, OrderResponse, OrderUpdate

router = APIRouter(prefix="/api/orders", tags=["orders"])

def generate_order_number():
    date_part = datetime.now().strftime("%Y%m%d")
    random_part = str(uuid.uuid4().hex[:6].upper())
    return f"ORD-{date_part}-{random_part}"

@router.post("/", response_model=OrderResponse)
def create_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    total_amount = 0
    order_items_data = []
    
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        
        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400, 
                detail=f"Insufficient stock for {product.name}. Available: {product.stock}"
            )
        
        item_total = item.unit_price * item.quantity
        total_amount += item_total
        
        order_items_data.append({
            "product_id": item.product_id,
            "product_name": product.name,
            "quantity": item.quantity,
            "unit_price": item.unit_price,
            "total_price": item_total
        })
        
        product.stock -= item.quantity
    
    order_number = generate_order_number()
    new_order = Order(
        order_number=order_number,
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        customer_phone=order_data.customer_phone,
        shipping_address=order_data.shipping_address,
        city=order_data.city,
        postal_code=order_data.postal_code,
        total_amount=total_amount,
        payment_method=order_data.payment_method,
        notes=order_data.notes,
        status=OrderStatus.PENDING
    )
    
    db.add(new_order)
    db.flush()
    
    for item_data in order_items_data:
        order_item = OrderItem(
            order_id=new_order.id,
            **item_data
        )
        db.add(order_item)
    
    db.commit()
    db.refresh(new_order)
    
    return new_order

@router.get("/", response_model=List[OrderResponse])
def get_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[OrderStatus] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    orders = query.offset(skip).limit(limit).all()
    return orders

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/track/{order_number}", response_model=OrderResponse)
def track_order(order_number: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.patch("/{order_id}", response_model=OrderResponse)
def update_order(order_id: int, order_update: OrderUpdate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order_update.status:
        order.status = order_update.status
    if order_update.payment_status:
        order.payment_status = order_update.payment_status
    if order_update.notes:
        order.notes = order_update.notes
    
    db.commit()
    db.refresh(order)
    return order

@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db.delete(order)
    db.commit()
    return {"message": "Order deleted successfully"}