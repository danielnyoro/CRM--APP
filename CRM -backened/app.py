# app.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import models
import schemas

# Create FastAPI app
app = FastAPI(title="CRM Backend API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = models.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to CRM Backend API", "status": "running"}

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# User endpoints
@app.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    db_user = models.User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        password_hash=user.password,  # Note: In production, hash passwords!
        role=user.role.value if hasattr(user.role, 'value') else user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[schemas.UserResponse])
def read_users(
    skip: int = 0, 
    limit: int = 100, 
    role: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.User)
    if role:
        query = query.filter(models.User.role == role)
    users = query.offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Lead endpoints
@app.post("/leads/", response_model=schemas.LeadResponse)
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    db_lead = models.Lead(
        first_name=lead.first_name,
        last_name=lead.last_name,
        email=lead.email,
        phone=lead.phone,
        company=lead.company,
        job_title=lead.job_title,
        source=lead.source,
        status=lead.status.value if hasattr(lead.status, 'value') else lead.status,
        value=lead.value or 0.0,
        notes=lead.notes,
        owner_id=lead.owner_id,
        sales_agent_id=lead.sales_agent_id
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

@app.get("/leads/", response_model=List[schemas.LeadResponse])
def read_leads(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    owner_id: Optional[int] = None,
    sales_agent_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Lead)
    if status:
        query = query.filter(models.Lead.status == status)
    if owner_id:
        query = query.filter(models.Lead.owner_id == owner_id)
    if sales_agent_id:
        query = query.filter(models.Lead.sales_agent_id == sales_agent_id)
    
    leads = query.order_by(models.Lead.created_at.desc()).offset(skip).limit(limit).all()
    return leads

@app.get("/leads/{lead_id}", response_model=schemas.LeadResponse)
def read_lead(lead_id: int, db: Session = Depends(get_db)):
    db_lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if db_lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    return db_lead

@app.put("/leads/{lead_id}", response_model=schemas.LeadResponse)
def update_lead(lead_id: int, lead_update: schemas.LeadUpdate, db: Session = Depends(get_db)):
    db_lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if db_lead is None:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    # Update fields
    update_data = lead_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_lead, field, value)
    
    db_lead.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_lead)
    return db_lead

# Task endpoints
@app.post("/tasks/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
        status=task.status.value if hasattr(task.status, 'value') else task.status,
        priority=task.priority.value if hasattr(task.priority, 'value') else task.priority,
        assigned_to_id=task.assigned_to_id,
        related_lead_id=task.related_lead_id
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/", response_model=List[schemas.TaskResponse])
def read_tasks(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    assigned_to_id: Optional[int] = None,
    priority: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)
    if status:
        query = query.filter(models.Task.status == status)
    if assigned_to_id:
        query = query.filter(models.Task.assigned_to_id == assigned_to_id)
    if priority:
        query = query.filter(models.Task.priority == priority)
    
    tasks = query.order_by(models.Task.due_date).offset(skip).limit(limit).all()
    return tasks

@app.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

# Sales Agent endpoints
@app.post("/sales-agents/", response_model=schemas.SalesAgentResponse)
def create_sales_agent(agent: schemas.SalesAgentCreate, db: Session = Depends(get_db)):
    # Check if user exists and is not already an agent
    user = db.query(models.User).filter(models.User.id == agent.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    existing_agent = db.query(models.SalesAgent).filter(models.SalesAgent.user_id == agent.user_id).first()
    if existing_agent:
        raise HTTPException(status_code=400, detail="User is already a sales agent")
    
    db_agent = models.SalesAgent(
        user_id=agent.user_id,
        employee_id=agent.employee_id,
        department=agent.department,
        quota=agent.quota or 0.0,
        commission_rate=agent.commission_rate or 0.0
    )
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

@app.get("/sales-agents/", response_model=List[schemas.SalesAgentResponse])
def read_sales_agents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    agents = db.query(models.SalesAgent).offset(skip).limit(limit).all()
    return agents

# Dashboard endpoints
@app.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_leads = db.query(models.Lead).count()
    new_leads = db.query(models.Lead).filter(models.Lead.status == "new").count()
    total_users = db.query(models.User).count()
    active_tasks = db.query(models.Task).filter(models.Task.status.in_(["pending", "in_progress"])).count()
    
    closed_won = db.query(models.Lead).filter(models.Lead.status == "closed_won").count()
    conversion_rate = round((closed_won / total_leads * 100) if total_leads > 0 else 0, 2)
    
    return {
        "total_leads": total_leads,
        "new_leads": new_leads,
        "total_users": total_users,
        "active_tasks": active_tasks,
        "lead_conversion_rate": conversion_rate
    }

# Lead Followup endpoints
@app.post("/lead-followups/", response_model=schemas.LeadFollowupResponse)
def create_lead_followup(followup: schemas.LeadFollowupCreate, db: Session = Depends(get_db)):
    # Check if lead exists
    lead = db.query(models.Lead).filter(models.Lead.id == followup.lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db_followup = models.LeadFollowup(
        lead_id=followup.lead_id,
        followup_date=followup.followup_date,
        notes=followup.notes,
        status=followup.status or "scheduled"
    )
    db.add(db_followup)
    db.commit()
    db.refresh(db_followup)
    return db_followup

@app.get("/leads/{lead_id}/followups", response_model=List[schemas.LeadFollowupResponse])
def get_lead_followups(lead_id: int, db: Session = Depends(get_db)):
    followups = db.query(models.LeadFollowup).filter(models.LeadFollowup.lead_id == lead_id).order_by(models.LeadFollowup.followup_date).all()
    return followups

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    models.create_tables()
    print("Database tables created successfully")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)