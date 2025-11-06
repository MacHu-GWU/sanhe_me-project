/**
 * Next.js Route Handler for streaming chat responses
 *
 * This route handler acts as a transparent proxy between the frontend and FastAPI backend,
 * correctly handling Server-Sent Events (SSE) streaming without buffering.
 *
 * Why we need this:
 * - Next.js rewrites (in next.config.js) buffer the entire response before sending to client
 * - This causes streaming responses to appear all at once instead of progressively
 * - This Route Handler uses ReadableStream to forward chunks immediately as they arrive
 */

import { NextRequest } from 'next/server';

const FASTAPI_URL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8000'
  : process.env.FASTAPI_URL || 'http://127.0.0.1:8000';

export async function POST(request: NextRequest) {
  try {
    // Forward all headers from the original request
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      // Skip host header to avoid conflicts
      if (key.toLowerCase() !== 'host') {
        headers.set(key, value);
      }
    });

    // Get request body
    const body = await request.text();

    // Make request to FastAPI backend
    const response = await fetch(`${FASTAPI_URL}/api/chat`, {
      method: 'POST',
      headers,
      body,
    });

    // Check if response is ok
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Backend request failed', status: response.status }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return streaming response without buffering
    // This is the key: we return the response body directly as a stream
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Vercel-AI-UI-Message-Stream': response.headers.get('X-Vercel-AI-UI-Message-Stream') || 'v1',
      },
    });
  } catch (error) {
    console.error('Error in chat route handler:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
