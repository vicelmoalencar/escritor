from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
from datetime import datetime
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from . import models, database
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(title="Escritor - Sistema Criador de Ebooks")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class EbookBase(BaseModel):
    title: str
    description: str

class EbookCreate(EbookBase):
    pass

class ChapterBase(BaseModel):
    title: str
    order: int
    is_accepted: bool = False

class ChapterCreate(ChapterBase):
    ebook_id: int

class TopicBase(BaseModel):
    title: str
    is_accepted: bool = False

class TopicCreate(TopicBase):
    chapter_id: int

# Configuração OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/ebooks/")
def create_ebook(ebook: EbookCreate, db: Session = Depends(get_db)):
    db_ebook = models.Ebook(title=ebook.title, description=ebook.description)
    db.add(db_ebook)
    db.commit()
    db.refresh(db_ebook)
    return db_ebook

@app.get("/ebooks/")
def list_ebooks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ebooks = db.query(models.Ebook).offset(skip).limit(limit).all()
    return ebooks

@app.post("/generate-chapters/{ebook_id}")
async def generate_chapters(ebook_id: int, db: Session = Depends(get_db)):
    ebook = db.query(models.Ebook).filter(models.Ebook.id == ebook_id).first()
    if not ebook:
        raise HTTPException(status_code=404, detail="Ebook not found")

    try:
        prompt = f"""
        Crie uma lista de 10 capítulos para um ebook com o título: {ebook.title}
        Descrição do ebook: {ebook.description}
        
        Formate cada capítulo como "Capítulo X: Título do Capítulo"
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um especialista em criar estruturas de ebooks."},
                {"role": "user", "content": prompt}
            ]
        )
        
        chapters = response.choices[0].message.content.strip().split("\n")
        formatted_chapters = []
        
        for i, chapter_title in enumerate(chapters, 1):
            db_chapter = models.Chapter(
                title=chapter_title.strip(),
                order=i,
                ebook_id=ebook_id
            )
            db.add(db_chapter)
            formatted_chapters.append(db_chapter)
        
        db.commit()
        return {"chapters": formatted_chapters}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-topics/{chapter_id}")
async def generate_topics(chapter_id: int, db: Session = Depends(get_db)):
    chapter = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")

    try:
        prompt = f"""
        Crie uma lista de 5 tópicos principais para o capítulo:
        {chapter.title}
        
        Formate cada tópico como um item de lista com um título conciso.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Você é um especialista em criar estruturas de conteúdo."},
                {"role": "user", "content": prompt}
            ]
        )
        
        topics = response.choices[0].message.content.strip().split("\n")
        formatted_topics = []
        
        for topic_title in topics:
            db_topic = models.Topic(
                title=topic_title.strip(),
                chapter_id=chapter_id
            )
            db.add(db_topic)
            formatted_topics.append(db_topic)
            
        db.commit()
        return {"topics": formatted_topics}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/chapters/{chapter_id}/accept")
def accept_chapter(chapter_id: int, accept: bool, db: Session = Depends(get_db)):
    chapter = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    
    chapter.is_accepted = accept
    db.commit()
    return chapter

@app.put("/topics/{topic_id}/accept")
def accept_topic(topic_id: int, accept: bool, db: Session = Depends(get_db)):
    topic = db.query(models.Topic).filter(models.Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    topic.is_accepted = accept
    db.commit()
    return topic

@app.get("/")
async def read_root():
    return {"message": "Bem-vindo ao Sistema Criador de Ebooks!"}
