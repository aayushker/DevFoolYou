# AI-Powered Similarity Endpoints

All three similarity search endpoints now include **AI verdict** in their responses using Google Gemini API (free tier).

## Endpoints with AI Response

### 1. **POST `/similarity/search-by-url`** ⭐ RECOMMENDED

**Find similar projects by project URL**

**Request:**

```json
{
  "url": "https://devfolio.co/projects/your-project-url",
  "top_k": 5
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
      "nameOfProject": "Similar Project",
      "descriptionOfProject": "...",
      "similarity_score": 0.87,
      "technologiesUsedInProject": [...],
      "tagsOfProject": [...]
    }
  ],
  "ai_verdict": {
    "verdict": "• Overall Similarity: Excellent match\n• Key Similarities: All projects focus on...\n• Technology Overlap: React, Node.js...\n• Unique Aspects: Your project stands out by...\n• Recommendations: Consider reviewing...",
    "model": "gemini-1.5-flash",
    "status": "success",
    "projects_analyzed": 5
  }
}
```

---

### 2. **POST `/similarity/search`**

**Find similar projects by text query**

**Request:**

```json
{
  "query": "AI-powered healthcare chatbot using React and Python",
  "top_k": 5,
  "min_similarity": 0.3
}
```

**Response:**
Same structure as above, with AI verdict included.

---

### 3. **POST `/similarity/find-by-project`**

**Find similar projects by providing project data directly**

**Request:**

```json
{
  "nameOfProject": "My Project",
  "descriptionOfProject": "An AI-powered web app...",
  "technologiesUsedInProject": ["React", "Python", "TensorFlow"],
  "tagsOfProject": ["AI", "Healthcare", "Web"]
}
```

**Response:**
Same structure as above, with AI verdict included.

---

## AI Verdict Structure

The `ai_verdict` field contains:

- **verdict**: AI-generated analysis in bullet points (~150 words)
  - Overall Similarity Assessment
  - Key Similarities
  - Technology Overlap
  - Unique Aspects
  - Recommendations
- **model**: Gemini model used (e.g., "gemini-1.5-flash")
- **status**: "success", "error", or "no_results"
- **projects_analyzed**: Number of similar projects analyzed

---

## Setup Required

1. **Get Gemini API Key** (Free): https://makersuite.google.com/app/apikey

2. **Add to `.env` file:**

```bash
GEMINI_API_KEY=your_api_key_here
```

3. **Install dependencies:**

```bash
pip install -r requirements.txt
```

---

## How It Works (RAG-Based)

1. **Retrieve**: Get top 5 similar projects using vector similarity search
2. **Augment**: Create a detailed context with input project + similar projects data
3. **Generate**: Use Gemini AI to analyze and provide intelligent verdict

The AI analyzes:

- Project descriptions
- Technology stacks
- Tags and categories
- Similarity scores
- Unique differentiators

And provides actionable insights in a concise format!
