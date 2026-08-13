from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=dict)
def submit_contact(form: ContactCreate, db: Session = Depends(get_db)):
    new_message = ContactMessage(
        name=form.name,
        email=form.email,
        message=form.message
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    return {
        "message": "Message sent successfully!", 
        "status": "success",
        "id": new_message.id
    }

@router.get("/", response_model=List[ContactResponse])
def get_contact_messages(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    messages = db.query(ContactMessage).offset(skip).limit(limit).all()
    return messages

@router.get("/{message_id}", response_model=ContactResponse)
def get_contact_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.patch("/{message_id}/read")
def mark_as_read(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.is_read = 1
    db.commit()
    return {"message": "Marked as read"}

@router.delete("/{message_id}")
def delete_contact_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return {"message": "Message deleted successfully"}