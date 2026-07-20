from pydantic import BaseModel
from typing import Optional, List
import datetime

# --- Categories ---
class CategoryBase(BaseModel):
    name: str
    icon: str
    color: str
    text_color: str
    description: str

class CategoryCreate(CategoryBase):
    id: str

class Category(CategoryBase):
    id: str
    class Config:
        from_attributes = True

# --- Users ---
class UserBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str # For demo purposes, we ignore storing the password right now

class User(UserBase):
    id: str
    joined_at: str
    class Config:
        from_attributes = True

# --- Businesses ---
class BusinessBase(BaseModel):
    name: str
    description: Optional[str] = None
    address: str
    city: str
    phone: str
    type: str

class BusinessCreate(BusinessBase):
    user_id: str

class Business(BusinessBase):
    id: str
    verified: bool
    rating: Optional[float] = None
    user_id: str
    listingCount: Optional[int] = 0 # Computed property
    
    class Config:
        from_attributes = True

# --- Listings ---
class WasteListingBase(BaseModel):
    title: str
    description: str
    category_id: str
    quantity: float
    unit: str
    price: float
    image_url: str
    available: bool = True
    featured: bool = False
    tags: Optional[str] = None

class WasteListingCreate(WasteListingBase):
    business_id: str

class WasteListingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    available: Optional[bool] = None

class WasteListing(WasteListingBase):
    id: str
    business_id: str
    created_at: str
    
    class Config:
        from_attributes = True

# For the feed response, we might want to return tags as a list
class WasteListingResponse(WasteListing):
    tags_list: List[str] = []
