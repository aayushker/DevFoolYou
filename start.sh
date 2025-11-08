#!/bin/bash

echo "🚀 Starting Backend Server on port 8080..."
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8080 &

echo "⏳ Waiting for backend to start..."
sleep 3

echo "🚀 Starting Frontend Server on port 3000..."
cd ../frontend
npm install
npm run dev
