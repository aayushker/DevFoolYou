# AI Intelligence Layer

## Overview

The AI Intelligence Layer is a RAG (Retrieval-Augmented Generation) based system that provides intelligent analysis and verdicts on project similarity using Google's Gemini AI (free tier).

## Features

- **Automated Analysis**: Generates AI-powered verdicts on project similarity
- **RAG-Based**: Combines vector search results with AI analysis
- **Concise Summaries**: Provides ~150 word summaries in bullet points
- **Multi-Perspective**: Analyzes similarity, technology overlap, and unique aspects
- **Free Tier**: Uses Gemini 1.5 Flash model (free API tier)

## How It Works

1. **Input**: User searches for similar projects (by URL or query)
2. **Vector Search**: System finds top 5 similar projects using embeddings
3. **RAG Analysis**: AI analyzes the input project and similar projects
4. **Verdict**: AI generates a structured verdict with:
   - Overall Similarity Assessment
   - Key Similarities
   - Technology Overlap
   - Unique Aspects
   - Recommendations

## API Response

```json
{
  "status": "success",
  "message": "Found 5 similar projects",
  "results": [...],
  "count": 5,
  "ai_verdict": {
    "verdict": "• Overall: Excellent similarity match...\n• Key Similarities: ...",
    "model": "gemini-1.5-flash",
    "status": "success",
    "projects_analyzed": 5
  }
}
```

## Setup

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment

Add to your `.env` file:

```bash
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash
GEMINI_MAX_OUTPUT_TOKENS=200
GEMINI_TEMPERATURE=0.7
```

### 3. Install Dependencies

```bash
pip install google-generativeai
```

Or install all requirements:

```bash
pip install -r requirements.txt
```

## Usage

### Find Similar Projects by URL

```bash
curl -X POST "http://localhost:8000/similarity/search-by-url" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://devfolio.co/projects/yourproject",
    "top_k": 5
  }'
```

### Find Similar Projects by Query

```bash
curl -X POST "http://localhost:8000/similarity/search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Machine learning project for image classification",
    "top_k": 5,
    "min_similarity": 0.3
  }'
```

### Find Similar Projects by Project Data

```bash
curl -X POST "http://localhost:8000/similarity/find-by-project" \
  -H "Content-Type: application/json" \
  -d '{
    "nameOfProject": "My Project",
    "descriptionOfProject": "A cool ML project",
    "technologiesUsedInProject": ["Python", "TensorFlow"],
    "tagsOfProject": ["AI", "ML"]
  }'
```

## AI Verdict Structure

The AI verdict provides:

1. **Overall Similarity Assessment**: Quality rating (Excellent/Good/Moderate/Poor)
2. **Key Similarities**: What makes these projects similar
3. **Technology Overlap**: Common technologies and frameworks
4. **Unique Aspects**: What makes the input project distinct
5. **Recommendations**: How to use these similar projects

## Example AI Verdict

```
• Overall Similarity Assessment: Excellent - Strong alignment in domain and approach

• Key Similarities:
  - All projects focus on machine learning image classification
  - Similar use of CNNs and deep learning architectures
  - Common focus on real-time processing

• Technology Overlap:
  - Python ecosystem (TensorFlow, PyTorch, Keras)
  - Similar data preprocessing techniques
  - OpenCV for image handling

• Unique Aspects:
  - Your project includes mobile deployment
  - Novel data augmentation approach
  - Edge computing optimization

• Recommendations:
  - Review model architectures from Project #1 and #3
  - Consider hybrid approach from Project #2
  - Leverage deployment strategies from similar projects
```

## Error Handling

The system gracefully handles errors:

- **No API Key**: AI verdict is skipped, similarity results still returned
- **API Error**: Returns fallback message with error status
- **No Results**: Provides appropriate message

## Rate Limits (Gemini Free Tier)

- **Requests**: 15 requests per minute
- **Tokens**: 1 million tokens per day
- **Model**: gemini-1.5-flash

**Note**: The system is designed to stay well within these limits with ~200 tokens per request.

## Customization

### Adjust Output Length

In `.env`:

```bash
GEMINI_MAX_OUTPUT_TOKENS=300  # ~225 words
```

### Adjust Creativity

In `.env`:

```bash
GEMINI_TEMPERATURE=0.5  # More focused (0.0-1.0)
GEMINI_TEMPERATURE=0.9  # More creative
```

### Change Model

```bash
GEMINI_MODEL=gemini-pro  # Alternative model
```

## Architecture

```
User Request
    ↓
Similarity Router
    ↓
Vector Search (Embeddings) → Top 5 Projects
    ↓
AI Intelligence Service
    ↓
Gemini AI (RAG Analysis)
    ↓
Structured Verdict
    ↓
Response with AI Verdict
```

## Benefits

1. **Enhanced UX**: Users get instant AI insights
2. **Time Saving**: No manual analysis needed
3. **Objective**: AI provides unbiased comparison
4. **Actionable**: Recommendations guide next steps
5. **Free**: No cost for API usage (within limits)

## Troubleshooting

### AI Verdict Not Generated

1. Check if `GEMINI_API_KEY` is set in `.env`
2. Verify API key is valid
3. Check logs for error messages
4. Ensure you haven't exceeded rate limits

### Verdict Too Long/Short

Adjust `GEMINI_MAX_OUTPUT_TOKENS` in `.env`

### Verdict Not Relevant

- Try adjusting `GEMINI_TEMPERATURE`
- Ensure input project has good descriptions
- Check if similar projects are truly relevant

## Future Enhancements

- [ ] Cache AI verdicts for repeated queries
- [ ] Support multiple AI models
- [ ] Custom prompt templates
- [ ] User feedback on verdict quality
- [ ] Multi-language support
