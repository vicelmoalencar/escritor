from sqlalchemy import Column, Integer, String, ForeignKey, Text, text
from sqlalchemy.orm import relationship
from .database import Base

class Ebook(Base):
    __tablename__ = "ebooks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    chapters = relationship("Chapter", back_populates="ebook")

class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    ebook_id = Column(Integer, ForeignKey("ebooks.id"))
    ebook = relationship("Ebook", back_populates="chapters")
    topics = relationship("Topic", back_populates="chapter")

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    chapter_id = Column(Integer, ForeignKey("chapters.id"))
    chapter = relationship("Chapter", back_populates="topics")
