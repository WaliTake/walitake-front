import json
import os
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import models

# Re-create tables
print("Dropping and recreating tables...")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def load_json(filename):
    # We will just use the mock data from the frontend files by extracting them
    # Since they are TS files, we can't easily import them.
    pass

# For simplicity, we hardcode the initial data here directly mirroring the frontend mocks.
categories = [
  { "id": "cat-org", "name": "Orgánicos", "icon": "Leaf", "color": "bg-emerald-100", "text_color": "text-emerald-700", "description": "Restos de comida, café, poda" },
  { "id": "cat-pla", "name": "Plásticos", "icon": "Recycle", "color": "bg-blue-100", "text_color": "text-blue-700", "description": "Botellas PET, tapitas, envases" },
  { "id": "cat-met", "name": "Metales", "icon": "Wrench", "color": "bg-gray-200", "text_color": "text-gray-700", "description": "Aluminio, cobre, chatarra" },
  { "id": "cat-pap", "name": "Papel y Cartón", "icon": "FileText", "color": "bg-amber-100", "text_color": "text-amber-700", "description": "Cajas, papel de oficina, diarios" },
  { "id": "cat-vid", "name": "Vidrio", "icon": "Wine", "color": "bg-teal-100", "text_color": "text-teal-700", "description": "Botellas, frascos, vidrio roto" },
  { "id": "cat-ele", "name": "Electrónicos", "icon": "Monitor", "color": "bg-indigo-100", "text_color": "text-indigo-700", "description": "RAEE, cables, plaquetas" },
  { "id": "cat-mad", "name": "Madera", "icon": "TreePine", "color": "bg-orange-100", "text_color": "text-orange-700", "description": "Pallets, recortes, aserrín" },
  { "id": "cat-tex", "name": "Textiles", "icon": "Shirt", "color": "bg-pink-100", "text_color": "text-pink-700", "description": "Retazos, ropa en desuso" },
  { "id": "cat-ace", "name": "Aceites", "icon": "Droplets", "color": "bg-yellow-100", "text_color": "text-yellow-700", "description": "AVUs, aceites industriales" },
  { "id": "cat-qui", "name": "Químicos", "icon": "FlaskConical", "color": "bg-purple-100", "text_color": "text-purple-700", "description": "Solventes, pinturas, baterías" }
]

users = [
  { "id": "usr-1", "name": "Martín Silva", "email": "usuario@ecoresiduos.com", "phone": "+54 11 4567-8901", "joined_at": "2024-01-15T10:00:00Z" },
  { "id": "usr-2", "name": "Laura Gómez", "email": "laura@maderera.com", "phone": "+54 261 456-7890", "joined_at": "2024-02-20T14:30:00Z" },
  { "id": "usr-3", "name": "Carlos Ruiz", "email": "carlos@hotelcentro.com", "phone": "+54 351 123-4567", "joined_at": "2024-03-05T09:15:00Z" }
]

businesses = [
  { "id": "biz-1", "name": "Restaurante El Verde", "description": "Gastronomía sustentable con foco en ingredientes locales y reducción de desperdicios.", "address": "Av. Corrientes 1234", "city": "Buenos Aires", "phone": "+54 11 1234-5678", "type": "restaurante", "verified": True, "rating": 4.8, "user_id": "usr-1" },
  { "id": "biz-2", "name": "Maderera Los Pinos", "description": "Aserradero y carpintería industrial. Generamos despuntes y aserrín de maderas nobles.", "address": "Ruta 40 Km 15", "city": "Mendoza", "phone": "+54 261 987-6543", "type": "fabrica", "verified": True, "rating": 4.5, "user_id": "usr-2" },
  { "id": "biz-3", "name": "Hotel Centro", "description": "Hotel 4 estrellas comprometido con la sustentabilidad y el reciclaje de sus residuos.", "address": "San Martín 456", "city": "Córdoba", "phone": "+54 351 234-5678", "type": "hotel", "verified": False, "rating": 4.2, "user_id": "usr-3" }
]

listings = [
  { "id": "lst-1", "title": "Restos orgánicos de cocina", "description": "Cáscaras de frutas, verduras y borra de café. Ideal para compostaje. Se generan diariamente.", "category_id": "cat-org", "quantity": 15, "unit": "kg", "price": 0, "image_url": "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80", "business_id": "biz-1", "available": True, "created_at": "2024-03-10T10:00:00Z", "featured": True, "tags": "compost,organico,cafe" },
  { "id": "lst-2", "title": "Pallets de madera (Descarte)", "description": "Pallets de pino rotos, no aptos para carga pero perfectos para desarmar o leña. Hay que retirarlos.", "category_id": "cat-mad", "quantity": 40, "unit": "unidades", "price": 0, "image_url": "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80", "business_id": "biz-2", "available": True, "created_at": "2024-03-12T14:30:00Z", "featured": True, "tags": "pallets,madera,leña" },
  { "id": "lst-3", "title": "Aceite Vegetal Usado (AVU)", "description": "Aceite de freidora filtrado, en bidones de 20 litros. Listo para planta de biodiesel.", "category_id": "cat-ace", "quantity": 60, "unit": "litros", "price": 500, "image_url": "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80", "business_id": "biz-1", "available": True, "created_at": "2024-03-14T09:15:00Z", "featured": False, "tags": "avu,aceite,biodiesel" },
  { "id": "lst-4", "title": "Cartón corrugado limpio", "description": "Cajas de embalaje desarmadas y atadas. Limpias y secas.", "category_id": "cat-pap", "quantity": 120, "unit": "kg", "price": 150, "image_url": "https://images.unsplash.com/photo-1606166187734-a4cb7407ca01?auto=format&fit=crop&q=80", "business_id": "biz-3", "available": True, "created_at": "2024-03-15T11:00:00Z", "featured": False, "tags": "carton,reciclaje,embalaje" },
  { "id": "lst-5", "title": "Botellas PET transparentes", "description": "Botellas de agua mineral aplastadas. Separadas por color.", "category_id": "cat-pla", "quantity": 200, "unit": "kg", "price": 250, "image_url": "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&q=80", "business_id": "biz-3", "available": True, "created_at": "2024-03-15T16:20:00Z", "featured": False, "tags": "pet,plastico,botellas" },
  { "id": "lst-6", "title": "Aserrín y viruta seca", "description": "Bolsas de aserrín de madera de pino y álamo. Sin tratamientos químicos.", "category_id": "cat-mad", "quantity": 500, "unit": "kg", "price": 0, "image_url": "https://images.unsplash.com/photo-1611145328833-28956b9c7cf8?auto=format&fit=crop&q=80", "business_id": "biz-2", "available": False, "created_at": "2024-03-11T08:00:00Z", "featured": False, "tags": "aserrin,viruta,pino" },
  { "id": "lst-7", "title": "Chatarra de hierro", "description": "Recortes de chapa y perfiles de remodelación. Ideal fundición.", "category_id": "cat-met", "quantity": 350, "unit": "kg", "price": 400, "image_url": "https://images.unsplash.com/photo-1532054955743-4e334d924d54?auto=format&fit=crop&q=80", "business_id": "biz-3", "available": True, "created_at": "2024-03-16T10:45:00Z", "featured": True, "tags": "hierro,chatarra,metal" },
  { "id": "lst-8", "title": "Frascos de vidrio (varios tamaños)", "description": "Frascos de conservas limpios sin etiquetas. Perfectos para emprendedores de mermeladas.", "category_id": "cat-vid", "quantity": 300, "unit": "unidades", "price": 0, "image_url": "https://images.unsplash.com/photo-1542617714-c116492dc0cc?auto=format&fit=crop&q=80", "business_id": "biz-1", "available": True, "created_at": "2024-03-16T14:30:00Z", "featured": False, "tags": "vidrio,frascos,reutilizacion" },
  { "id": "lst-9", "title": "Cables de cobre pelados", "description": "Cobre de primera calidad, sin vaina plástica. Sobrantes de obra eléctrica.", "category_id": "cat-met", "quantity": 45, "unit": "kg", "price": 8500, "image_url": "https://images.unsplash.com/photo-1558455823-c9ceb55d9d95?auto=format&fit=crop&q=80", "business_id": "biz-2", "available": True, "created_at": "2024-03-17T09:00:00Z", "featured": True, "tags": "cobre,cables,metal" },
  { "id": "lst-10", "title": "Monitores CRT antiguos", "description": "Monitores de PC fuera de uso. Para desarme y recuperación de metales y plaquetas.", "category_id": "cat-ele", "quantity": 12, "unit": "unidades", "price": 0, "image_url": "https://images.unsplash.com/photo-1550005973-740f1f24e0f1?auto=format&fit=crop&q=80", "business_id": "biz-3", "available": True, "created_at": "2024-03-17T11:15:00Z", "featured": False, "tags": "raee,monitores,electronica" }
]

def seed_db():
    db = SessionLocal()
    try:
        print("Seeding Categories...")
        for c in categories:
            db.add(models.Category(**c))
        
        print("Seeding Users...")
        for u in users:
            db.add(models.User(**u))
            
        print("Seeding Businesses...")
        for b in businesses:
            db.add(models.Business(**b))
            
        print("Seeding Listings...")
        for l in listings:
            db.add(models.WasteListing(**l))
            
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
