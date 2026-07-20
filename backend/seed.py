import datetime
import random
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models

def reset_db():
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()

    # 1. Categories
    cats = [
        {"id": "madera", "name": "Madera", "icon": "TreePine", "color": "bg-[#EFEBE9]", "text_color": "text-[#5D4037]", "description": "Pallets, recortes, aserrín y derivados."},
        {"id": "organico", "name": "Orgánicos", "icon": "Leaf", "color": "bg-[#E8F5E9]", "text_color": "text-[#2E7D32]", "description": "Restos de comida, cáscaras, borra de café."},
        {"id": "carton", "name": "Cartón/Papel", "icon": "Package", "color": "bg-[#FFF3E0]", "text_color": "text-[#E65100]", "description": "Cajas, maples, bobinas y papel picado."},
        {"id": "plastico", "name": "Plásticos", "icon": "Recycle", "color": "bg-[#E3F2FD]", "text_color": "text-[#1565C0]", "description": "PET, tapitas, bidones y film stretch."},
        {"id": "vidrio", "name": "Vidrio", "icon": "Wine", "color": "bg-[#F3E5F5]", "text_color": "text-[#6A1B9A]", "description": "Botellas, frascos y vidrio molido."},
        {"id": "metal", "name": "Metales", "icon": "Wrench", "color": "bg-[#ECEFF1]", "text_color": "text-[#455A64]", "description": "Latas, viruta, retazos de aluminio/hierro."}
    ]
    
    for c in cats:
        db.add(models.Category(**c))
    
    # 2. 10 Users
    user_emails = [
        "usuario@walitake.com",
        "jose@walitake.com",
        "juan@walitake.com",
        "maria@walitake.com",
        "carlos@walitake.com",
        "ana@walitake.com",
        "luis@walitake.com",
        "marta@walitake.com",
        "pedro@walitake.com",
        "sofia@walitake.com"
    ]
    users = []
    for i in range(1, 11):
        email = user_emails[i-1]
        u = models.User(
            id=f"user-{i}",
            name=f"Usuario Test {i}" if i != 1 else "Demo Usuario",
            email=email,
            phone=f"11 5555 {1000+i}",
            xp=random.choice([0, 50, 100, 200, 500])
        )
        users.append(u)
        db.add(u)
        
    db.commit()
    
    # 3. 6 Businesses (Users 1 to 6 own them)
    businesses = []
    business_names = ["EcoMaderas S.A.", "Restaurante Verde", "Fábrica Plástica", "Impresos del Sur", "Metalúrgica San Jorge", "Cafetería Central"]
    cities = ["Capital Federal", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata"]
    types = ["Carpintería", "Gastronomía", "Industria", "Imprenta", "Metalúrgica", "Gastronomía"]
    
    for i in range(6):
        b = models.Business(
            id=f"biz-{i+1}",
            name=business_names[i],
            description=f"Empresa de {types[i]} comprometida con la sustentabilidad.",
            address=f"Calle Falsa {100 + i*10}",
            city=cities[i],
            phone=f"0800-eco-{i}",
            type=types[i],
            verified=True,
            rating=round(random.uniform(4.0, 5.0), 1),
            user_id=f"user-{i+1}"
        )
        businesses.append(b)
        db.add(b)
        
    db.commit()

    # 4. 30 Listings from JSON
    import json
    import os
    
    json_path = os.path.join(os.path.dirname(__file__), 'productos.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    productos = data.get("productos", [])

    # Simple category mapper
    def guess_category(title):
        t = title.lower()
        if "cartón" in t or "papel" in t: return "carton"
        elif "pet" in t or "plástico" in t or "acrílico" in t: return "plastico"
        elif "aluminio" in t or "hierro" in t or "cobre" in t or "metálico" in t: return "metal"
        elif "vidrio" in t: return "vidrio"
        elif "madera" in t or "aserrín" in t or "pallets" in t: return "madera"
        else: return "organico"

    for p in productos:
        cat_id = guess_category(p["tituloObjeto"])
        
        # Find business for this user email
        owner_user = next((u for u in users if u.email == p["usuarioEmail"]), None)
        if owner_user:
            business = next((b for b in businesses if b.user_id == owner_user.id), businesses[0])
        else:
            business = businesses[0]
            
        original_price = p.get("costoAnteriorSinDescuento", 0)
        discount_percent = p.get("promo", 0)
        
        if discount_percent and discount_percent > 0:
            price = int(original_price * (1 - discount_percent / 100))
        else:
            price = original_price
            original_price = None
            discount_percent = None

        l = models.WasteListing(
            id=f"lst-{p['id']}",
            title=p["tituloObjeto"],
            description=p["descripcion"],
            category_id=cat_id,
            quantity=p["cantidadProducto"]["valor"],
            unit=p["cantidadProducto"]["unidad"],
            price=price,
            original_price=original_price,
            discount_percent=discount_percent,
            image_url=p["imagen"],
            business_id=business.id,
            available=True,
            featured=random.random() < 0.2, # 20% are featured
            tags=f"{cat_id},reciclaje,industria"
        )
        db.add(l)
        
    db.commit()
    db.close()
    print(f"Database seeded with {len(users)} users, {len(businesses)} businesses and {len(productos)} listings successfully!")

if __name__ == "__main__":
    reset_db()
    seed_db()
