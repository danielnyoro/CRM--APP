# schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums
class UserRole(str, Enum):
    ADMIN = "admin"
    HEAD_OF_SALES = "head_of_sales"
    SALES_AGENT = "sales_agent"
    CUSTOMER = "customer"

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    CLOSED_WON = "closed_won"
    CLOSED_LOST = "closed_lost"

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = UserRole.CUSTOMER

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        orm_mode = True

# Lead Schemas
class LeadBase(BaseModel):
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    source: Optional[str] = None
    status: Optional[LeadStatus] = LeadStatus.NEW
    value: Optional[float] = 0.0
    notes: Optional[str] = None
    owner_id: Optional[int] = None
    sales_agent_id: Optional[int] = None

class LeadCreate(LeadBase):
    pass

class LeadUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    status: Optional[str] = None
    value: Optional[float] = None
    notes: Optional[str] = None
    sales_agent_id: Optional[int] = None

class LeadResponse(LeadBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Task Schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[TaskStatus] = TaskStatus.PENDING
    priority: Optional[TaskPriority] = TaskPriority.MEDIUM
    assigned_to_id: Optional[int] = None
    related_lead_id: Optional[int] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_to_id: Optional[int] = None

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

# Sales Agent Schemas
class SalesAgentBase(BaseModel):
    user_id: int
    employee_id: Optional[str] = None
    department: Optional[str] = None
    quota: Optional[float] = 0.0
    commission_rate: Optional[float] = 0.0

class SalesAgentCreate(SalesAgentBase):
    pass

class SalesAgentResponse(SalesAgentBase):
    id: int
    hire_date: datetime
    
    class Config:
        orm_mode = True

# Lead Followup Schemas
class LeadFollowupBase(BaseModel):
    lead_id: int
    followup_date: datetime
    notes: Optional[str] = None
    status: Optional[str] = "scheduled"

class LeadFollowupCreate(LeadFollowupBase):
    pass

class LeadFollowupResponse(LeadFollowupBase):
    id: int
    completed: bool
    created_at: datetime
    
    class Config:
        orm_mode = True