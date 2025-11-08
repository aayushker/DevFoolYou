# API Documentation

## Main Endpoint: Find Similar Projects

### `POST /api/scraper/find-similar`

**Purpose:** Given a project URL, return the project details and top 5 similar projects.

**Workflow:**

```
User submits URL
    ↓
Is project in DB?
    ↓
  YES → Get project → Check embeddings → Perform similarity search
    ↓
  NO → Scrape project → Generate embeddings → Store in DB → Perform similarity search
    ↓
Return project + top 5 similar projects (without embeddings)
```

**Request:**

```json
POST /api/scraper/find-similar
Content-Type: application/json

{
  "url": "https://devfolio.co/projects/project-name-xyz123"
}
```

**Response (Success):**

```json
{
  "status": "success",
  "message": "Found 5 similar projects",
  "was_scraped": false,
  "project": {
    "nameOfProject": "Project Name",
    "urlOfProject": "https://devfolio.co/projects/project-name-xyz123",
    "tagLine": "An awesome project that does X",
    "description": "Detailed description...",
    "githubURL": "https://github.com/user/repo",
    "technologies": ["React", "Node.js", "MongoDB"],
    "teamMembers": ["Alice", "Bob"],
    "likes": 123,
    "videoDemo": "https://youtube.com/...",
    "images": ["https://...", "https://..."],
    "try": "https://app.example.com",
    "builtAt": "HackathonName 2024"
    // Note: NO embeddingsOfData field
  },
  "similar_projects": [
    {
      "nameOfProject": "Similar Project 1",
      "urlOfProject": "https://devfolio.co/projects/similar-1",
      "tagLine": "Another awesome project",
      "similarity_score": 0.89,
      "technologies": ["React", "Express", "MongoDB"],
      ...
      // Note: NO embeddingsOfData field
    },
    {
      "nameOfProject": "Similar Project 2",
      "similarity_score": 0.85,
      ...
    },
    // ... 3 more similar projects
  ]
}
```

**Response (Error - Project has no embeddings):**

```json
{
  "detail": "Project exists in database but has no embeddings. Please generate embeddings first using /api/bulk/generate-embeddings endpoint."
}
```

**Response (Error - Failed to scrape):**

```json
{
  "detail": "Failed to scrape project. Please check the URL and try again."
}
```

---

## Other Endpoints

### `POST /api/scraper/scrape`

Legacy endpoint that redirects to `/find-similar`. Same request/response format.

### `GET /api/scraper/validate-url?url={url}`

Validates if a URL is a valid Devfolio project URL.

**Response:**

```json
{
  "valid": true,
  "message": "Valid Devfolio project URL"
}
```

---

## Similarity Endpoints

### `POST /api/similarity/search`

Search for similar projects using a text query.

**Request:**

```json
{
  "query": "machine learning image recognition",
  "top_k": 5,
  "min_similarity": 0.3
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Found 5 similar projects",
  "count": 5,
  "results": [
    {
      "nameOfProject": "ML Image Classifier",
      "similarity_score": 0.87,
      ...
      // NO embeddingsOfData field
    },
    ...
  ]
}
```

### `POST /api/similarity/search-by-url`

Find similar projects based on an existing project URL (must be in DB).

**Request:**

```json
{
  "url": "https://devfolio.co/projects/example-abc123",
  "top_k": 5
}
```

### `GET /api/similarity/stats`

Get database statistics.

**Response:**

```json
{
  "status": "success",
  "total_projects": 1000,
  "projects_with_embeddings": 950,
  "projects_without_embeddings": 50,
  "embedding_dimension": 384,
  "model": "all-MiniLM-L6-v2"
}
```

---

## Bulk Operations

### `POST /api/bulk/scrape`

Bulk scrape projects from Devfolio.

**Request:**

```json
{
  "limit": 100,
  "generate_embeddings": true,
  "store_projects": true
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Bulk scrape completed successfully",
  "total_scraped": 95,
  "total_failed": 5,
  "total_stored": 90,
  "duplicates": 5
}
```

### `POST /api/bulk/generate-embeddings`

Generate embeddings for projects that don't have them.

**Request:**

```json
{
  "limit": null // null = process all projects without embeddings
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Processed 50 projects",
  "processed": 50,
  "updated": 48,
  "failed": 2
}
```

### `GET /api/bulk/status`

Get bulk operation statistics.

**Response:**

```json
{
  "status": "success",
  "total_projects": 1000,
  "projects_with_embeddings": 950,
  "projects_without_embeddings": 50,
  "completion_percentage": 95.0
}
```

---

## Health Check

### `GET /api/health`

Check if the API is running.

**Response:**

```json
{
  "status": "healthy",
  "message": "DevFoolYou Backend API is running",
  "version": "1.0.0",
  "timestamp": "2025-11-09T12:34:56.789Z"
}
```

---

## Important Notes

### ✅ Security

- **Embeddings are NEVER returned** in any endpoint response
- All project data is sanitized before sending to client
- Proper error handling and logging throughout

### 🚀 Performance

- Database lookups are indexed by `urlOfProject`
- Vector similarity uses MongoDB Atlas Vector Search (HNSW algorithm)
- Embedding generation uses efficient `all-MiniLM-L6-v2` model

### 🔄 Caching

- Projects are stored in MongoDB after first scrape
- Subsequent requests for the same URL are instant (no re-scraping)
- Use `was_scraped` field to detect newly scraped vs cached projects

### 📝 Logging

- All operations are logged to `backend/logs/api_YYYYMMDD.log`
- Includes timestamps, log levels, and detailed error traces
- Useful for debugging and monitoring

---

## Environment Variables

Required in `.env` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DATABASE=devfoolyou

# Embedding Model
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384

# API Settings
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
LOG_LEVEL=INFO

# Scraper Settings
MAX_CONCURRENT_SCRAPES=5
SCRAPE_DELAY_MS=1000
```

---

## Frontend Integration Example

```typescript
// React/Next.js example
import { useState } from "react";

interface Project {
  nameOfProject: string;
  urlOfProject: string;
  tagLine: string;
  description: string;
  technologies: string[];
  similarity_score?: number;
  // ... other fields
}

interface FindSimilarResponse {
  status: string;
  message: string;
  project: Project;
  similar_projects: Project[];
  was_scraped: boolean;
}

async function findSimilarProjects(url: string): Promise<FindSimilarResponse> {
  const response = await fetch(
    "http://localhost:8000/api/scraper/find-similar",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to find similar projects");
  }

  return response.json();
}

// Usage in component
export function ProjectSearch() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<FindSimilarResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await findSimilarProjects(url);
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://devfolio.co/projects/..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Find Similar"}
      </button>

      {results && (
        <div>
          <h2>{results.project.nameOfProject}</h2>
          <p>{results.project.tagLine}</p>
          {results.was_scraped && <span>✨ Newly scraped!</span>}

          <h3>Similar Projects:</h3>
          {results.similar_projects.map((proj) => (
            <div key={proj.urlOfProject}>
              <h4>{proj.nameOfProject}</h4>
              <p>Similarity: {(proj.similarity_score! * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
