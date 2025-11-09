# 🚀 Quick Start Guide - DevFoolYou Backend

## Prerequisites

- Python 3.8 or higher
- MongoDB Atlas account (or local MongoDB)
- 2GB+ RAM for embedding model

## Installation (5 minutes)

### 1. Navigate to Backend Directory

```bash
cd /home/gopatron/Documents/DevFoolYou/backend
```

### 2. Run the Startup Script

```bash
chmod +x start.sh
./start.sh
```

The script will automatically:

- ✅ Create virtual environment
- ✅ Install all dependencies
- ✅ Install Playwright browsers
- ✅ Create `.env` file from template
- ✅ Start the server

### 3. Verify Installation

Open browser and go to: http://localhost:8000/docs

You should see the interactive API documentation.

## Quick Test

### Test 1: Health Check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{
  "status": "healthy",
  "mongodb": "connected",
  "embedding_model": "loaded"
}
```

### Test 2: Scrape a Single Project

```bash
curl -X POST "http://localhost:8000/api/scraper/scrape" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://devfolio.co/projects/teleport",
    "find_similar": true,
    "store_if_new": true
  }'
```

### Test 3: Find Similar Projects

```bash
curl -X POST "http://localhost:8000/api/similarity/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "file sharing application",
    "top_k": 5
  }'
```

## Common Use Cases

### Use Case 1: Process User Input from Frontend

**Frontend sends project URL → Backend scrapes → Returns similar projects**

```javascript
// Frontend code
const response = await fetch("http://localhost:8000/api/scraper/scrape", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: userInputUrl,
    find_similar: true,
    store_if_new: true,
  }),
});

const data = await response.json();
// data.project - scraped project
// data.similar_projects - top 5 similar projects
```

### Use Case 2: Real-time Progress Updates

**Using Server-Sent Events (SSE)**

```javascript
// Frontend code
const eventSource = new EventSource(
  "http://localhost:8000/api/scraper/scrape-stream",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: userInputUrl }),
  }
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data.status, data.message, data.progress);

  // Update UI with progress
  updateProgressBar(data.progress);
  updateStatusMessage(data.message);

  if (data.status === "complete") {
    displayResults(data.project, data.similar_projects);
    eventSource.close();
  }
};
```

### Use Case 3: Bulk Operations

**Scrape and process multiple projects**

```bash
curl -X POST "http://localhost:8000/api/bulk/scrape" \
  -H "Content-Type: application/json" \
  -d '{
    "limit": 50,
    "generate_embeddings": true,
    "store_projects": true
  }'
```

## API Endpoints Summary

| Endpoint                        | Method | Purpose                                 |
| ------------------------------- | ------ | --------------------------------------- |
| `/health`                       | GET    | Check API health                        |
| `/api/scraper/scrape`           | POST   | Scrape single project                   |
| `/api/scraper/scrape-stream`    | POST   | Scrape with live updates (SSE)          |
| `/api/similarity/search`        | POST   | Search similar projects by text         |
| `/api/similarity/search-by-url` | POST   | Find similar to existing project        |
| `/api/bulk/scrape`              | POST   | Bulk scrape projects                    |
| `/api/bulk/scrape-stream`       | POST   | Bulk scrape with live updates           |
| `/api/bulk/generate-embeddings` | POST   | Generate embeddings for stored projects |

## Frontend Integration Example

```typescript
// services/api.ts
const API_BASE = "http://localhost:8000";

export async function scrapeAndFindSimilar(url: string) {
  const response = await fetch(`${API_BASE}/api/scraper/scrape`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      find_similar: true,
      store_if_new: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to scrape project");
  }

  return response.json();
}

export function scrapeWithProgress(
  url: string,
  onProgress: (data: any) => void
) {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `${API_BASE}/api/scraper/scrape-stream?url=${encodeURIComponent(url)}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onProgress(data);

      if (data.status === "complete") {
        eventSource.close();
        resolve(data);
      } else if (data.status === "error") {
        eventSource.close();
        reject(new Error(data.message));
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      reject(new Error("Connection error"));
    };
  });
}
```

## Troubleshooting

### Problem: "Import fastapi could not be resolved"

**Solution:** Make sure virtual environment is activated and dependencies are installed:

```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Problem: "MongoDB connection failed"

**Solution:** Check your IP is whitelisted in MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Network Access → Add IP Address → Allow from Anywhere

### Problem: "Playwright browser not found"

**Solution:** Install Playwright browsers:

```bash
playwright install chromium
```

### Problem: Port 8000 already in use

**Solution:** Use a different port:

```bash
uvicorn main:app --port 8001
```

## Performance Tips

1. **For Development**: Use `--reload` flag (already in start.sh)
2. **For Production**: Use multiple workers
   ```bash
   uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
   ```
3. **Memory**: Embedding model uses ~500MB RAM
4. **Concurrency**: Adjust `SCRAPER_CONCURRENCY` in .env (default: 6)

## Next Steps

1. ✅ Run the server: `./start.sh`
2. ✅ Test the health endpoint
3. ✅ Try scraping a project
4. ✅ Integrate with your frontend
5. ✅ Deploy to production (optional)

## Support

- Check logs in `backend/logs/`
- Use interactive API docs: http://localhost:8000/docs
- For errors, check the terminal output

---

**Happy Coding! 🎉**
