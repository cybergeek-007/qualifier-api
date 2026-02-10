# University Qualifier REST API

A simple REST API built with Node.js and Express for the university qualifier assignment.

## Features

- **POST /bfhl** - Performs various operations:
  - `fibonacci` - Generate Fibonacci series
  - `prime` - Filter prime numbers from an array
  - `lcm` - Calculate Least Common Multiple
  - `hcf` - Calculate Highest Common Factor (GCD)
  - `AI` - Get single-word answers using Google Gemini

- **GET /health** - Health check endpoint

## Setup Instructions

### 1. Clone or Download the Project

```bash
cd university-qualifier-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Gemini API key
```

### 4. Get Your Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click on **"Get API Key"** button
4. Copy the generated key
5. Paste it in your `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### 5. Run Locally

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev
```

The server will start on `http://localhost:3000`

## API Usage Examples

### Health Check
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in"
}
```

### Fibonacci
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### Prime Filter
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 4, 7, 9, 11]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "data": [2, 7, 11]
}
```

### LCM Calculation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "data": 72
}
```

### HCF Calculation
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24, 36, 60]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "data": 12
}
```

### AI Question
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital city of Maharashtra?"}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "data": "Mumbai"
}
```

## Deployment

### Deploy on Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variable**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key
   - Redeploy: `vercel --prod`

### Deploy on Railway

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login and Deploy**:
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variable**:
   ```bash
   railway variables set GEMINI_API_KEY=your_api_key
   ```

### Deploy on Render

1. Go to [Render](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo or upload files
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable `GEMINI_API_KEY`
6. Click **"Create Web Service"**

## Error Responses

The API returns proper error responses with HTTP status codes:

**Invalid Input (400):**
```json
{
  "is_success": false,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "error": "fibonacci value must be a non-negative integer"
}
```

**Server Error (500):**
```json
{
  "is_success": false,
  "official_email": "ritesh1428.be23@chitkarauniversity.edu.in",
  "error": "Internal server error"
}
```

## Validation Rules

- **fibonacci**: Must be a non-negative integer
- **prime**: Must be a non-empty array of integers
- **lcm**: Must be an array of at least 2 positive integers
- **hcf**: Must be an array of at least 2 positive integers
- **AI**: Must be a non-empty string

## Requirements

- Node.js 18 or higher
- Google Gemini API key (free tier)

## License

MIT
