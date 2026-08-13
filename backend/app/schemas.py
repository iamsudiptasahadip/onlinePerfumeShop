from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum

class ProductBase(BaseModel):
    id: str
    name: str
    price: int
    description: str
    notes: Dict[str, str]
    size: str
    image: str
    stock: Optional[int] = 10

class ProductResponse(ProductBase):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    unit_price: int
    total_price: int

class OrderItemResponse(OrderItemBase):
    id: int

class OrderStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    shipping_address: str
    city: Optional[str] = None
    postal_code: Optional[str] = None
    items: List[OrderItemBase]
    payment_method: Optional[str] = "cash_on_delivery"
    notes: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    customer_email: str
    customer_phone: Optional[str]
    shipping_address: str
    city: Optional[str]
    postal_code: Optional[str]
    total_amount: int
    status: OrderStatus
    payment_method: Optional[str]
    payment_status: str
    notes: Optional[str]
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True