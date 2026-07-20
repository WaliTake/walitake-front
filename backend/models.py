from sqlalchemy import Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=True)
    joined_at = Column(String, default=lambda: datetime.datetime.now().isoformat())
    xp = Column(Integer, default=0)

    business = relationship("Business", back_populates="owner", uselist=False)

class Business(Base):
    __tablename__ = "businesses"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text, nullable=True)
    address = Column(String)
    city = Column(String, index=True)
    phone = Column(String)
    type = Column(String)
    verified = Column(Boolean, default=False)
    rating = Column(Float, nullable=True)
    user_id = Column(String, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="business")
    listings = relationship("WasteListing", back_populates="business")

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    icon = Column(String)
    color = Column(String)
    text_color = Column(String)
    description = Column(Text)

    listings = relationship("WasteListing", back_populates="category")

class WasteListing(Base):
    __tablename__ = "waste_listings"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    category_id = Column(String, ForeignKey("categories.id"))
    quantity = Column(Float)
    unit = Column(String)
    price = Column(Float)
    original_price = Column(Float, nullable=True)
    discount_percent = Column(Integer, nullable=True)
    image_url = Column(String)
    business_id = Column(String, ForeignKey("businesses.id"))
    available = Column(Boolean, default=True)
    created_at = Column(String, default=lambda: datetime.datetime.now().isoformat())
    featured = Column(Boolean, default=False)
    tags = Column(String, nullable=True) # Stored as comma separated string

    business = relationship("Business", back_populates="listings")
    category = relationship("Category", back_populates="listings")
