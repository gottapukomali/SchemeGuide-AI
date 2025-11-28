##YojanaConnect – Government Schemes Chatbot (AI + Python + RAG)

YojanaConnect is an AI-powered chatbot that helps users access accurate information about Central and State Government Schemes. Using Retrieval-Augmented Generation (RAG), it provides details such as eligibility, benefits, required documents, and application procedures.

 ##Features

AI chatbot for government schemes

RAG-based accurate responses

Supports PDF/Text/CSV datasets

Simple and interactive chat UI

Fast Flask backend API

Vector search using ChromaDB/FAISS

##Project Structure
govt-schemes-chatbot/
├── data/
├── embeddings/
├── app/
├── frontend/
├── main.py
└── requirements.txt

##Technologies Used

Backend: Python, Flask/FastAPI, Sentence Transformers, ChromaDB/FAISS, OpenAI
Frontend: HTML, CSS, JavaScript

##Installation
1. Clone the repository
git clone https://github.com/yourusername/govt-schemes-chatbot.git
cd govt-schemes-chatbot

2. Install dependencies
pip install -r requirements.txt

3. Add OpenAI API Key

Create a .env file:

OPENAI_API_KEY=your_api_key_here

4. Add your dataset

Place PDFs/Text/CSV files inside:

/data

5. Generate embeddings
python main.py --embed

6. Run the backend
python main.py

##How It Works (RAG Pipeline)

User asks a question

Query → Embedding

Vector search retrieves scheme data

Retrieved text + query → OpenAI

Bot returns final answer

##Example Queries

“Schemes for farmers”

“Documents needed for PM Kisan”

“Student scholarship schemes”

“Am I eligible for PMAY?”

##Deployment Options

Render

Railway

PythonAnywhere

AWS

Vercel (Frontend) + Render (Backend)

##Future Enhancements

Multi-language support

Voice chatbot

Scheme recommender system

WhatsApp/Telegram bot

Admin dashboard

##License

Open-source for educational use.

##Author

Your Name
Final Year Capstone Project – Government Schemes Chatbot
