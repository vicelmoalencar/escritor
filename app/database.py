from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import time

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/escritor")

# Função para tentar conectar ao banco com retry
def get_engine(max_retries=5):
    for attempt in range(max_retries):
        try:
            engine = create_engine(DATABASE_URL, pool_pre_ping=True)
            # Testa a conexão
            with engine.connect() as conn:
                conn.execute("SELECT 1")
            return engine
        except Exception as e:
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
