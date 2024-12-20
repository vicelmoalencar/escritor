from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import time

load_dotenv()

# Obter variáveis de ambiente
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST", "escritor-db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "escritor")

# Construir DATABASE_URL
if not DB_PASSWORD:
    raise ValueError("DB_PASSWORD environment variable is not set!")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def get_engine(max_retries=5):
    last_exception = None
    for attempt in range(max_retries):
        try:
            print(f"Attempting to connect to database (attempt {attempt + 1}/{max_retries})")
            print(f"Using connection string: postgresql://{DB_USER}:****@{DB_HOST}:{DB_PORT}/{DB_NAME}")
            
            engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True,
                pool_size=5,
                max_overflow=10
            )
            
            # Test the connection
            with engine.connect() as conn:
                result = conn.execute(text("SELECT 1")).scalar()
                if result == 1:
                    print("Successfully connected to database!")
                    return engine
                
        except Exception as e:
            last_exception = e
            print(f"Database connection failed: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(5)
                continue
            
    if last_exception:
        raise last_exception
    
    raise Exception("Failed to connect to database after all retries")

# Create engine with retry logic
engine = get_engine()

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for declarative models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
