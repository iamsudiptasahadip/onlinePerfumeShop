from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routes import products, orders, contact

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    debug=settings.DEBUG
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(contact.router)

@app.get("/")
def read_root():
    return {
        "message": f"Welcome to {settings.APP_NAME} API",
        "version": "1.0.0",
        "endpoints": {
            "products": "/api/products",
            "orders": "/api/orders",
            "contact": "/api/contact"
        }
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}