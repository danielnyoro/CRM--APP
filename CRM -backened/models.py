import enum
from datetime import datetime, date

from sqlalchemy import (
    Column, Integer, String, Boolean,
    DateTime, Date, Text, DECIMAL,
    ForeignKey, Enum, UniqueConstraint
)
from sqlalchemy.orm import relationship, declarative_base

# --- Base Class for SQLAlchemy Declarative Models (SQLAlchemy 1.x style) ---
Base = declarative_base()

# --- Enums for Database Fields ---

class UserType(enum.Enum):
    sales_agent = 'sales_agent'
    head_of_sales = 'head_of_sales'
    admin = 'admin'

class LeadSource(enum.Enum):
    website = 'website'
    referral = 'referral'
    social_media = 'social_media'
    cold_call = 'cold_call'
    event = 'event'
    other = 'other'

class LeadStatus(enum.Enum):
    new = 'new'
    contacted = 'contacted'
    qualified = 'qualified'
    proposal = 'proposal'
    negotiation = 'negotiation'
    closed_won = 'closed_won'
    closed_lost = 'closed_lost'
    nurturing = 'nurturing'

class AssignmentType(enum.Enum):
    primary = 'primary'
    secondary = 'secondary'
    collaborative = 'collaborative'

class LeadActionType(enum.Enum):
    call = 'call'
    email = 'email'
    meeting = 'meeting'
    proposal = 'proposal'
    follow_up = 'follow_up'
    demo = 'demo'
    other = 'other'

class ActionPriority(enum.Enum):
    low = 'low'
    medium = 'medium'
    high = 'high'
    urgent = 'urgent'

class ActionStatus(enum.Enum):
    pending = 'pending'
    in_progress = 'in_progress'
    completed = 'completed'
    cancelled = 'cancelled'

class FollowupType(enum.Enum):
    call = 'call'
    email = 'email'
    meeting = 'meeting'
    message = 'message'
    other = 'other'

class FollowupOutcome(enum.Enum):
    positive = 'positive'
    neutral = 'neutral'
    negative = 'negative'
    no_response = 'no_response'

class CommunicationType(enum.Enum):
    incoming = 'incoming'
    outgoing = 'outgoing'

class CommunicationMethod(enum.Enum):
    phone = 'phone'
    email = 'email'
    sms = 'sms'
    in_person = 'in_person'
    video = 'video'

class OversightType(enum.Enum):
    monitoring = 'monitoring'
    intervention = 'intervention'
    assistance = 'assistance'
    review = 'review'

class OpportunityStage(enum.Enum):
    Qualification = 'Qualification'
    Needs_Analysis = 'Needs Analysis'
    Proposal = 'Proposal'
    Negotiation = 'Negotiation'
    Closed_Won = 'Closed Won'
    Closed_Lost = 'Closed Lost'

# --- User and Role Models ---

class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    user_type = Column(Enum(UserType), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    last_login = Column(DateTime)

    # Relationships
    sales_agent = relationship("SalesAgent", back_populates="user", uselist=False)
    head_of_sales = relationship("HeadOfSales", back_populates="user", uselist=False)
    status_changes = relationship(
        "LeadStatusHistory",
        back_populates="changed_by_user",
        foreign_keys="LeadStatusHistory.changed_by"
    )

class SalesAgent(Base):
    __tablename__ = 'sales_agents'
    agent_id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    employee_id = Column(String(20), unique=True, nullable=False)
    department = Column(String(50))
    hire_date = Column(Date, nullable=False)
    phone_number = Column(String(20))

    # Relationships
    user = relationship("User", back_populates="sales_agent")
    assignments_as_agent = relationship(
        "SalesTeamAssignment",
        back_populates="agent",
        foreign_keys="SalesTeamAssignment.agent_id"
    )
    lead_assignments = relationship(
        "LeadAssignment",
        back_populates="agent",
        foreign_keys="LeadAssignment.agent_id"
    )
    opportunities = relationship(
        "Opportunity",
        back_populates="agent",
        foreign_keys="Opportunity.agent_id"
    )
    followups = relationship(
        "LeadFollowup",
        back_populates="agent",
        foreign_keys="LeadFollowup.agent_id"
    )
    communications = relationship(
        "LeadCommunication",
        back_populates="agent",
        foreign_keys="LeadCommunication.agent_id"
    )


class HeadOfSales(Base):
    __tablename__ = 'head_of_sales'
    head_id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), unique=True, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    employee_id = Column(String(20), unique=True, nullable=False)
    department = Column(String(50), nullable=False)
    hire_date = Column(Date, nullable=False)
    phone_number = Column(String(20))

    # Relationships
    user = relationship("User", back_populates="head_of_sales")
    assignments_as_head = relationship(
        "SalesTeamAssignment",
        back_populates="head",
        foreign_keys="SalesTeamAssignment.head_id"
    )
    lead_assignments_made = relationship(
        "LeadAssignment",
        back_populates="assigned_by_head",
        foreign_keys="LeadAssignment.assigned_by"
    )
    oversights = relationship(
        "HeadLeadOversight",
        back_populates="head",
        foreign_keys="HeadLeadOversight.head_id"
    )


class SalesTeamAssignment(Base):
    __tablename__ = 'sales_team_assignments'
    assignment_id = Column(Integer, primary_key=True)
    head_id = Column(ForeignKey('head_of_sales.head_id'), nullable=False)
    agent_id = Column(ForeignKey('sales_agents.agent_id'), nullable=False)
    assigned_date = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)

    __table_args__ = (
        UniqueConstraint('head_id', 'agent_id'),
    )

    # Relationships
    head = relationship("HeadOfSales", back_populates="assignments_as_head", foreign_keys=[head_id])
    agent = relationship("SalesAgent", back_populates="assignments_as_agent", foreign_keys=[agent_id])

# --- Lead Management Models ---

class Lead(Base):
    __tablename__ = 'leads'
    lead_id = Column(Integer, primary_key=True)
    lead_source = Column(Enum(LeadSource), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    company_name = Column(String(100))
    email = Column(String(100))
    phone = Column(String(20))
    address = Column(Text)
    city = Column(String(50))
    state = Column(String(50))
    country = Column(String(50))
    lead_status = Column(Enum(LeadStatus), default=LeadStatus.new)
    lead_score = Column(Integer, default=0)
    budget = Column(DECIMAL(15, 2))
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    assignments = relationship("LeadAssignment", back_populates="lead")
    status_history = relationship("LeadStatusHistory", back_populates="lead")
    actions = relationship("LeadAction", back_populates="lead")
    followups = relationship("LeadFollowup", back_populates="lead")
    communications = relationship("LeadCommunication", back_populates="lead")
    oversights = relationship("HeadLeadOversight", back_populates="lead")


class LeadAssignment(Base):
    __tablename__ = 'lead_assignments'
    assignment_id = Column(Integer, primary_key=True)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    agent_id = Column(ForeignKey('sales_agents.agent_id'), nullable=False)
    assigned_by = Column(ForeignKey('head_of_sales.head_id'), nullable=False) # Head of Sales who assigned
    assignment_date = Column(DateTime, default=datetime.now)
    assignment_type = Column(Enum(AssignmentType), default=AssignmentType.primary)
    is_active = Column(Boolean, default=True)

    __table_args__ = (
        UniqueConstraint('lead_id', 'agent_id'),
    )

    # Relationships
    lead = relationship("Lead", back_populates="assignments")
    agent = relationship("SalesAgent", back_populates="lead_assignments", foreign_keys=[agent_id])
    assigned_by_head = relationship("HeadOfSales", back_populates="lead_assignments_made", foreign_keys=[assigned_by])


class LeadStatusHistory(Base):
    __tablename__ = 'lead_status_history'
    history_id = Column(Integer, primary_key=True)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    old_status = Column(String(50))
    new_status = Column(String(50), nullable=False)
    changed_by = Column(ForeignKey('users.user_id'), nullable=False) # User who made the change
    change_reason = Column(Text)
    changed_at = Column(DateTime, default=datetime.now)

    # Relationships
    lead = relationship("Lead", back_populates="status_history")
    changed_by_user = relationship("User", back_populates="status_changes", foreign_keys=[changed_by])


class LeadAction(Base):
    __tablename__ = 'lead_actions'
    action_id = Column(Integer, primary_key=True)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    action_type = Column(Enum(LeadActionType), nullable=False)
    action_date = Column(DateTime, nullable=False)
    due_date = Column(Date)
    priority = Column(Enum(ActionPriority), default=ActionPriority.medium)
    status = Column(Enum(ActionStatus), default=ActionStatus.pending)
    notes = Column(Text)
    outcome = Column(Text)
    completed_date = Column(DateTime)

    # Relationships
    lead = relationship("Lead", back_populates="actions")


class LeadFollowup(Base):
    __tablename__ = 'lead_followups'
    followup_id = Column(Integer, primary_key=True)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    agent_id = Column(ForeignKey('sales_agents.agent_id'), nullable=False)
    followup_date = Column(DateTime, nullable=False)
    followup_type = Column(Enum(FollowupType), nullable=False)
    notes = Column(Text)
    next_followup_date = Column(Date)
    outcome = Column(Enum(FollowupOutcome), default=FollowupOutcome.neutral)

    # Relationships
    lead = relationship("Lead", back_populates="followups")
    agent = relationship("SalesAgent", back_populates="followups", foreign_keys=[agent_id])


class LeadCommunication(Base):
    __tablename__ = 'lead_communications'
    communication_id = Column(Integer, primary_key=True)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    agent_id = Column(ForeignKey('sales_agents.agent_id'), nullable=False)
    communication_type = Column(Enum(CommunicationType), nullable=False)
    method = Column(Enum(CommunicationMethod), nullable=False)
    subject = Column(String(255))
    message = Column(Text)
    communication_date = Column(DateTime, default=datetime.now)
    duration_minutes = Column(Integer)

    # Relationships
    lead = relationship("Lead", back_populates="communications")
    agent = relationship("SalesAgent", back_populates="communications", foreign_keys=[agent_id])


class HeadLeadOversight(Base):
    __tablename__ = 'head_lead_oversight'
    oversight_id = Column(Integer, primary_key=True)
    head_id = Column(ForeignKey('head_of_sales.head_id'), nullable=False)
    lead_id = Column(ForeignKey('leads.lead_id'), nullable=False)
    oversight_type = Column(Enum(OversightType), nullable=False)
    oversight_date = Column(DateTime, default=datetime.now)
    notes = Column(Text)
    action_taken = Column(Text)

    __table_args__ = (
        UniqueConstraint('head_id', 'lead_id', 'oversight_type'),
    )

    # Relationships
    head = relationship("HeadOfSales", back_populates="oversights", foreign_keys=[head_id])
    lead = relationship("Lead", back_populates="oversights", foreign_keys=[lead_id])

# --- Product, Account, and Opportunity Models ---

class Product(Base):
    __tablename__ = 'products'
    product_id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    sku = Column(String(50), unique=True)
    unit_price = Column(DECIMAL(10, 2), nullable=False)
    description = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime,default=datetime.now) 
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)