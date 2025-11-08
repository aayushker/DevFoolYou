# DevFoolYou Backend API

A powerful FastAPI backend for scraping Devfolio projects, generating embeddings, and performing semantic similarity searches.

## 🚀 Features

- **Single URL Scraping**: Scrape individual project URLs with real-time progress updates
- **Bulk Scraping**: Scrape multiple projects from Devfolio automatically
- **Embedding Generation**: Generate 384-dimensional embeddings using `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Similarity Search**: Find similar projects using cosine similarity
- **Real-time Streaming**: Server-Sent Events (SSE) for live progress updates
- **Automatic Deduplication**: Skip projects that already exist in the database
- **Comprehensive Logging**: Detailed logs for debugging and monitoring

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── core/
│   ├── __init__.py
│   ├── config.py          # Configuration settings
│   └── logger.py          # Logging configuration
├── services/
│   ├── __init__.py
│   ├── mongodb.py         # MongoDB async client
│   ├── embedding.py       # Embedding generation service
│   └── scraper.py         # Scraper service wrapper
├── routers/
│   ├── __init__.py
│   ├── scraper.py         # Single project scraping endpoints
│   ├── similarity.py      # Similarity search endpoints
│   └── bulk.py            # Bulk operations endpoints
├── logs/                  # Application logs
├── temp/                  # Temporary files
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## 🛠️ Installation

### 1. Navigate to Backend Directory

```bash
cd /home/gopatron/Documents/DevFoolYou/backend
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Linux/Mac
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Install Playwright Browsers

```bash
playwright install chromium
```

## ⚙️ Configuration

The backend uses environment variables for configuration. Create a `.env` file in the backend directory:

```env
# API Settings
DEBUG=True
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO

# MongoDB
MONGODB_URL=mongodb+srv://your_connection_string
MONGODB_DATABASE=DevFoolYou
MONGODB_COLLECTION=Cluster0

# CORS
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Using Python directly

```bash
python main.py
```

## 📚 API Endpoints

### Health Check

```
GET /health
```

Returns the health status of the API, MongoDB, and embedding model.

### Scraper Endpoints

#### 1. Scrape Single Project

```
POST /api/scraper/scrape
```

**Request Body:**

```json
{
  "url": "https://devfolio.co/projects/your-project",
  "find_similar": true,
  "store_if_new": true
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Project scraped and processed successfully",
  "project": { ... },
  "similar_projects": [ ... ],
  "already_exists": false
}
```

#### 2. Scrape with Streaming (Real-time Updates)

```
POST /api/scraper/scrape-stream
```

Returns Server-Sent Events (SSE) with progress updates.

#### 3. Validate URL

```
GET /api/scraper/validate-url?url=https://devfolio.co/projects/...
```

### Similarity Search Endpoints

#### 1. Search by Text Query

```
POST /api/similarity/search
```

**Request Body:**

```json
{
  "query": "machine learning project for healthcare",
  "top_k": 5,
  "min_similarity": 0.3
}
```

#### 2. Search by Existing Project URL

```
POST /api/similarity/search-by-url
```

**Request Body:**

```json
{
  "url": "https://devfolio.co/projects/your-project",
  "top_k": 5
}
```

#### 3. Get Statistics

```
GET /api/similarity/stats
```

### Bulk Operations Endpoints

#### 1. Bulk Scrape

```
POST /api/bulk/scrape
```

**Request Body:**

```json
{
  "limit": 100,
  "generate_embeddings": true,
  "store_projects": true
}
```

#### 2. Bulk Scrape with Streaming

```
POST /api/bulk/scrape-stream
```

Returns SSE with real-time progress updates.

#### 3. Generate Embeddings for Existing Projects

```
POST /api/bulk/generate-embeddings
```

**Request Body:**

```json
{
  "limit": null // null = all projects without embeddings
}
```

#### 4. Generate Embeddings with Streaming

```
POST /api/bulk/generate-embeddings-stream
```

#### 5. Get Bulk Status

```
GET /api/bulk/status
```

## 🔄 Typical Workflows

### Workflow 1: Scrape and Find Similar Projects

```bash
# 1. Scrape a single project
curl -X POST "http://localhost:8000/api/scraper/scrape" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://devfolio.co/projects/your-project",
    "find_similar": true,
    "store_if_new": true
  }'
```

### Workflow 2: Bulk Scrape and Generate Embeddings

```bash
# 1. Bulk scrape projects
curl -X POST "http://localhost:8000/api/bulk/scrape" \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 100,
    "generate_embeddings": true,
    "store_projects": true
  }'
```

### Workflow 3: Generate Embeddings for Existing Projects

```bash
# 1. Generate embeddings for projects without them
curl -X POST "http://localhost:8000/api/bulk/generate-embeddings" \
  -H "Content-Type: application/json" \
  -d '{
    "limit": null
  }'
```

### Workflow 4: Search for Similar Projects

```bash
# 1. Search by text query
curl -X POST "http://localhost:8000/api/similarity/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "blockchain voting system",
    "top_k": 5
  }'
```

## 📊 Streaming Events (SSE)

For streaming endpoints, events are sent in this format:

```
data: {"status": "started", "message": "Starting process", "progress": 0}

data: {"status": "scraping", "message": "Scraping project...", "progress": 30}

data: {"status": "complete", "message": "Process completed", "progress": 100, "project": {...}}
```

### Event Statuses

- `started` - Process initiated
- `checking` - Checking if project exists
- `scraping` - Scraping project data
- `embedding` - Generating embeddings
- `searching` - Finding similar projects
- `storing` - Storing in database
- `complete` - Process completed successfully
- `error` - An error occurred

## 🔍 Logging

Logs are stored in `backend/logs/` directory:

- **Console**: INFO level and above
- **File**: DEBUG level and above
- **Format**: `YYYYMMDD_api.log`
- **Rotation**: 10MB per file, 5 backups

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# Scrape a project
curl -X POST http://localhost:8000/api/scraper/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://devfolio.co/projects/some-project"}'
```

### Using the Interactive API Docs

Once the server is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. Check if your IP is whitelisted in MongoDB Atlas
2. Verify the connection string in `.env`
3. Check logs in `backend/logs/`

### Playwright Issues

```bash
# Reinstall browsers
playwright install chromium

# Install system dependencies (Linux)
playwright install-deps
```

### Import Errors

```bash
# Ensure scraper module is accessible
export PYTHONPATH="${PYTHONPATH}:/path/to/DevFoolYou/scraper"
```

## 📈 Performance

- **Single Project Scraping**: ~3-5 seconds per project
- **Embedding Generation**: ~100ms per project (CPU)
- **Similarity Search**: ~50-200ms for 1000 projects
- **Bulk Scraping**: ~6 projects/second with concurrency=6

## 🔐 Security Notes

- The API currently has permissive CORS settings for development
- For production, update `CORS_ORIGINS` in `.env`
- Consider adding authentication/authorization
- Rate limiting recommended for production

## 📝 License

Part of the DevFoolYou project.

## 🤝 Contributing

This backend integrates with the existing scraper module and knowledge base tools. Any changes should maintain compatibility with both.

---

**Made with ❤️ using FastAPI, MongoDB, and Sentence Transformers**
