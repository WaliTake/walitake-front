from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uuid
import datetime

from . import models, schemas
from .database import engine, get_db

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="walitake API", description="API for the walitake Marketplace")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routes ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the walitake API"}

# Categories
@app.get("/categories", response_model=List[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

# Listings
@app.get("/listings", response_model=List[schemas.WasteListingResponse])
def get_listings(
    categoria: str = None, 
    ciudad: str = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.WasteListing)
    
    if categoria:
        query = query.filter(models.WasteListing.category_id == categoria)
        
    if ciudad:
        # Join with businesses to filter by city
        query = query.join(models.Business).filter(models.Business.city.ilike(f"%{ciudad}%"))
        
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (models.WasteListing.title.ilike(search_filter)) | 
            (models.WasteListing.description.ilike(search_filter))
        )
        
    listings = query.all()
    
    # Process tags
    result = []
    for l in listings:
        l_dict = {c.name: getattr(l, c.name) for c in l.__table__.columns}
        l_dict["tags_list"] = l.tags.split(",") if l.tags else []
        result.append(l_dict)
        
    return result

@app.get("/listings/{listing_id}", response_model=schemas.WasteListingResponse)
def get_listing(listing_id: str, db: Session = Depends(get_db)):
    l = db.query(models.WasteListing).filter(models.WasteListing.id == listing_id).first()
    if not l:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    l_dict = {c.name: getattr(l, c.name) for c in l.__table__.columns}
    l_dict["tags_list"] = l.tags.split(",") if l.tags else []
    return l_dict

@app.post("/listings", response_model=schemas.WasteListingResponse)
def create_listing(listing: schemas.WasteListingCreate, db: Session = Depends(get_db)):
    new_id = f"lst-{uuid.uuid4().hex[:8]}"
    db_listing = models.WasteListing(
        id=new_id,
        **listing.model_dump()
    )
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    
    l_dict = {c.name: getattr(db_listing, c.name) for c in db_listing.__table__.columns}
    l_dict["tags_list"] = db_listing.tags.split(",") if db_listing.tags else []
    return l_dict

@app.patch("/listings/{listing_id}", response_model=schemas.WasteListingResponse)
def update_listing(listing_id: str, listing: schemas.WasteListingUpdate, db: Session = Depends(get_db)):
    db_listing = db.query(models.WasteListing).filter(models.WasteListing.id == listing_id).first()
    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")
        
    update_data = listing.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_listing, key, value)
        
    db.commit()
    db.refresh(db_listing)
    
    l_dict = {c.name: getattr(db_listing, c.name) for c in db_listing.__table__.columns}
    l_dict["tags_list"] = db_listing.tags.split(",") if db_listing.tags else []
    return l_dict

@app.delete("/listings/{listing_id}")
def delete_listing(listing_id: str, db: Session = Depends(get_db)):
    db_listing = db.query(models.WasteListing).filter(models.WasteListing.id == listing_id).first()
    if not db_listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    db.delete(db_listing)
    db.commit()
    return {"message": "Listing deleted successfully"}

# Businesses
@app.get("/businesses", response_model=List[schemas.Business])
def get_businesses(db: Session = Depends(get_db)):
    businesses = db.query(models.Business).all()
    # Compute listingCount
    result = []
    for b in businesses:
        b_dict = {c.name: getattr(b, c.name) for c in b.__table__.columns}
        b_dict["listingCount"] = db.query(models.WasteListing).filter(models.WasteListing.business_id == b.id).count()
        result.append(b_dict)
    return result

@app.post("/businesses", response_model=schemas.Business)
def create_business(business: schemas.BusinessCreate, db: Session = Depends(get_db)):
    new_id = f"biz-{uuid.uuid4().hex[:8]}"
    db_business = models.Business(
        id=new_id,
        **business.model_dump()
    )
    db.add(db_business)
    db.commit()
    db.refresh(db_business)
    
    b_dict = {c.name: getattr(db_business, c.name) for c in db_business.__table__.columns}
    b_dict["listingCount"] = 0
    return b_dict

# Auth / Users
@app.post("/auth/login")
def login(credentials: dict, db: Session = Depends(get_db)):
    email = credentials.get("email")
    # Simplification for demo: just return the user with that email, ignore password check
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        # Fallback to the first user if email is just demo
        if email == "usuario@walitake.com":
            user = db.query(models.User).first()
            if not user:
                 raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
            
    return user

@app.post("/auth/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    new_id = f"user-{uuid.uuid4().hex[:8]}"
    db_user = models.User(
        id=new_id,
        name=user.name,
        email=user.email,
        phone=user.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

class CheckoutRequest(schemas.BaseModel):
    user_id: str
    listing_ids: List[str]

@app.post("/checkout")
def checkout(req: CheckoutRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    listings = db.query(models.WasteListing).filter(models.WasteListing.id.in_(req.listing_ids)).all()
    
    # Mark as unavailable
    for l in listings:
        l.available = False
        
    # Gamification: 50 XP per item bought
    earned_xp = len(req.listing_ids) * 50
    user.xp += earned_xp
    
    db.commit()
    return {"message": "Checkout successful", "earned_xp": earned_xp, "new_total_xp": user.xp}
