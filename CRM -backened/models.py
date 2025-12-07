# models.py
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./crm.db"  # Changed filename for clarity

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def create_tables():
    Base.metadata.create_all(bind=engine)

# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="customer")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    sales_agent_profile = relationship("SalesAgent", back_populates="user", uselist=False)
    head_of_sales_profile = relationship("HeadOfSales", back_populates="user", uselist=False)
    leads = relationship("Lead", back_populates="owner")
    tasks = relationship("Task", back_populates="assigned_to")

class SalesAgent(Base):
    __tablename__ = "sales_agents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    employee_id = Column(String, unique=True)
    department = Column(String)
    hire_date = Column(DateTime, default=datetime.utcnow)
    quota = Column(Float, default=0.0)
    commission_rate = Column(Float, default=0.0)
    
    # Relationships
    user = relationship("User", back_populates="sales_agent_profile")
    leads = relationship("Lead", back_populates="sales_agent")

class HeadOfSales(Base):
    __tablename__ = "head_of_sales"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    department = Column(String)
    
    # Relationships
    user = relationship("User", back_populates="head_of_sales_profile")

class SalesTeamAssignment(Base):
    __tablename__ = "sales_team_assignments"
    
    id = Column(Integer, primary_key=True, index=True)
    head_of_sales_id = Column(Integer, ForeignKey("head_of_sales.id", ondelete="CASCADE"), nullable=False)
    sales_agent_id = Column(Integer, ForeignKey("sales_agents.id", ondelete="CASCADE"), nullable=False)
    assigned_date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)

class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, index=True)
    phone = Column(String)
    company = Column(String)
    job_title = Column(String)
    source = Column(String)
    status = Column(String, default="new")
    value = Column(Float, default=0.0)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign keys
    owner_id = Column(Integer, ForeignKey("users.id"))
    sales_agent_id = Column(Integer, ForeignKey("sales_agents.id"))
    
    # Relationships
    owner = relationship("User", back_populates="leads")
    sales_agent = relationship("SalesAgent", back_populates="leads")
    followups = relationship("LeadFollowup", back_populates="lead")

class LeadFollowup(Base):
    __tablename__ = "lead_followups"
    
    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id", ondelete="CASCADE"), nullable=False)
    followup_date = Column(DateTime, nullable=False)
    notes = Column(Text)
    status = Column(String, default="scheduled")
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    lead = relationship("Lead", back_populates="followups")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    due_date = Column(DateTime)
    status = Column(String, default="pending")
    priority = Column(String, default="medium")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign keys
    assigned_to_id = Column(Integer, ForeignKey("users.id"))
    related_lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True)
    
    # Relationships
    assigned_to = relationship("User", back_populates="tasks")