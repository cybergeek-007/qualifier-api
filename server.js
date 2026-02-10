/**
 * University Qualifier Assignment - REST API
 * Simple Express server with POST /bfhl and GET /health endpoints
 * 
 * To get your free Gemini API key:
 * 1. Visit https://aistudio.google.com
 * 2. Sign in with your Google account
 * 3. Click "Get API Key" button
 * 4. Copy the key and paste it in your .env file
 */

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Your official email - change this if needed
const OFFICIAL_EMAIL = 'ritesh1428.be23@chitkarauniversity.edu.in';

// Initialize Gemini AI (only if API key is available)
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

/**
 * Helper function: Generate Fibonacci series up to n positions
 * Example: n=7 → [0, 1, 1, 2, 3, 5, 8]
 */
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const series = [0, 1];
  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }
  return series;
}

/**
 * Helper function: Check if a number is prime
 */
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Helper function: Calculate GCD of two numbers using Euclidean algorithm
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Helper function: Calculate GCD/HCF of an array of numbers
 */
function calculateHCF(numbers) {
  return numbers.reduce((acc, num) => gcd(acc, num));
}

/**
 * Helper function: Calculate LCM of two numbers
 */
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Helper function: Calculate LCM of an array of numbers
 */
function calculateLCM(numbers) {
  return numbers.reduce((acc, num) => lcm(acc, num));
}

/**
 * POST /bfhl - Main endpoint for all operations
 * Handles: fibonacci, prime, lcm, hcf, AI
 */
app.post('/bfhl', async (req, res) => {
  try {
    // Get all keys from the request body
    const keys = Object.keys(req.body);
    
    // Validate: must have exactly one key
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: 'Request must contain exactly one key: fibonacci, prime, lcm, hcf, or AI'
      });
    }
    
    const operation = keys[0];
    const value = req.body[operation];
    
    // Handle each operation type
    switch (operation) {
      case 'fibonacci': {
        // Validate: must be a non-negative integer
        if (!Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'fibonacci value must be a non-negative integer'
          });
        }
        
        const result = generateFibonacci(value);
        return res.status(200).json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: result
        });
      }
      
      case 'prime': {
        // Validate: must be an array of integers
        if (!Array.isArray(value) || value.length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'prime value must be a non-empty array of integers'
          });
        }
        
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'All elements in prime array must be integers'
          });
        }
        
        const result = value.filter(isPrime);
        return res.status(200).json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: result
        });
      }
      
      case 'lcm': {
        // Validate: must be an array of at least 2 positive integers
        if (!Array.isArray(value) || value.length < 2) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'lcm value must be an array with at least 2 integers'
          });
        }
        
        if (!value.every(num => Number.isInteger(num) && num > 0)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'All elements in lcm array must be positive integers'
          });
        }
        
        const result = calculateLCM(value);
        return res.status(200).json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: result
        });
      }
      
      case 'hcf': {
        // Validate: must be an array of at least 2 positive integers
        if (!Array.isArray(value) || value.length < 2) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'hcf value must be an array with at least 2 integers'
          });
        }
        
        if (!value.every(num => Number.isInteger(num) && num > 0)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'All elements in hcf array must be positive integers'
          });
        }
        
        const result = calculateHCF(value);
        return res.status(200).json({
          is_success: true,
          official_email: OFFICIAL_EMAIL,
          data: result
        });
      }
      
      case 'AI': {
        // Validate: must be a non-empty string
        if (typeof value !== 'string' || value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'AI value must be a non-empty string'
          });
        }
        
        // Check if Gemini API is configured
        if (!genAI) {
          return res.status(500).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env file'
          });
        }
        
        try {
          // Get the generative model
          const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
          
          // Ask the question with instruction for single-word response
          const prompt = `Answer this question in exactly one word: ${value}`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          let answer = response.text().trim();
          
          // Extract just the first word if multiple words are returned
          answer = answer.split(/\s+/)[0];
          
          return res.status(200).json({
            is_success: true,
            official_email: OFFICIAL_EMAIL,
            data: answer
          });
        } catch (aiError) {
          console.error('Gemini API error:', aiError);
          return res.status(500).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: 'Failed to get response from AI service'
          });
        }
      }
      
      default: {
        // Invalid operation key
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: 'Invalid key. Allowed keys: fibonacci, prime, lcm, hcf, AI'
        });
      }
    }
  } catch (error) {
    // Catch any unexpected errors (don't expose details to client)
    console.error('Server error:', error);
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: 'Internal server error'
    });
  }
});

/**
 * GET /health - Health check endpoint
 * Always returns success
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

// Export for testing and serverless deployment
module.exports = app;
