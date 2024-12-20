from sqlalchemy import create_engine
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

# Função para tentar conectar ao banco com retry
def get_engine(max_retries=5):
    for attempt in range(max_retries):
        try:
            print(f"Attempting to connect to database (attempt {attempt + 1}/{max_retries})")
            print(f"Using connection string: postgresql://{DB_USER}:****@{DB_HOST}:{DB_PORT}/{DB_NAME}")
            
            engine = create_engine(DATABASE_URL, pool_pre_ping=True)
            # Testa a conexão
            with engine.connect() as conn:
                conn.execute("SELECT 1")
            return engine
        except Exception as e:
            print(f"Database connection failed: {str(e)}")
            if attempt == max_retries - 1:
                raise e
            time.sleep(5)

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
