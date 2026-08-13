from app.database import SessionLocal
from app.models import Product

def seed_products():
    db = SessionLocal()
    
    try:
        existing = db.query(Product).filter(Product.id == "black-umbrella").first()
        if existing:
            print("⚠️ Product already exists, skipping seed...")
            return
        
        product = Product(
            id="black-umbrella",
            name="Black Umbrella",
            price=3000,
            description="Inspired by Dior Sauvage — a fresh, spicy, and woody fragrance with Calabrian bergamot, Sichuan pepper, and Ambroxan. Wild and noble.",
            notes={
                "top": "Bergamot, Pepper",
                "heart": "Lavender, Geranium",
                "base": "Ambroxan, Cedar"
            },
            size="100 mL",
            image="https://placehold.co/400x320/1c1816/d4af37?text=Black+Umbrella",
            stock=20
        )
        
        db.add(product)
        db.commit()
        
        print("✅ Product seeded successfully!")
        print(f"   - ID: {product.id}")
        print(f"   - Name: {product.name}")
        print(f"   - Price: ৳{product.price}")
        print(f"   - Stock: {product.stock}")
        
    except Exception as e:
        print(f"❌ Error seeding product: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Seeding database...")
    seed_products()
    print("✨ Done!")