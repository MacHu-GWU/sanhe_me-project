# Browser Fingerprint Implementation for Rate Limiting

## 📋 Overview

This document explains how browser fingerprinting was implemented in the chat application to enable rate limiting without user authentication.

## 🎯 Goal

Enable backend rate limiting based on unique browser identification, without requiring user login.

## 🔧 Implementation

### Frontend Changes (`components/chat/chat.tsx`)

#### 1. Browser Fingerprint Generation

```typescript
// Using FingerprintJS library
const fp = await FingerprintJS.load();
const result = await fp.get();
browserFingerprintRef.current = result.visitorId;
```

**What it does:**
- Analyzes browser characteristics (Canvas, WebGL, Audio fingerprints, fonts, screen resolution, timezone, etc.)
- Generates a unique `visitorId` with 99.5% uniqueness
- Stored in `useRef` instead of `useState` for closure compatibility

**Why FingerprintJS?**
- Industry-standard library
- Works without cookies or localStorage
- Survives browser restarts
- Resistant to VPN/proxy changes

#### 2. Fetch Interception (Critical Solution)

```typescript
const originalFetch = window.fetch;
window.fetch = async (input, init?) => {
  if (typeof input === 'string' && input.includes('/api/chat')) {
    init = init || {};
    init.headers = {
      ...init.headers,
      'X-Client-Fingerprint': browserFingerprintRef.current,
    };
  }
  return originalFetch(input, init);
};
```

**How it works:**
1. Save original `window.fetch` function
2. Override `window.fetch` with custom function
3. Intercept requests to `/api/chat`
4. Inject `X-Client-Fingerprint` header
5. Call original fetch with modified headers
6. Cleanup: restore original fetch on component unmount

**Why this approach?**
- AI SDK v5's `useChat` does **NOT** support custom headers or fetch options
- TypeScript errors confirmed: `headers` and `fetch` are not valid `UseChatOptions`
- Fetch interception is the only way to inject headers transparently

#### 3. Error Handling

```typescript
onError: (error) => {
  if (error.message.includes("Too many requests") ||
      error.message.includes("Rate limit") ||
      error.message.includes("429")) {
    toast.error(
      "You have reached the usage limit, please try again in 60 minutes 😅",
      { duration: 8000 }
    );
  }
}
```

**What it does:**
- Detects HTTP 429 (Too Many Requests) errors
- Shows user-friendly message in English
- 8-second toast duration (long enough to read)

### Backend Integration (`api/index.py`)

Backend can now access the fingerprint from request headers:

```python
@app.post("/api/chat")
async def handle_chat_data(request: Request, protocol: str = Query("data")):
    # Extract browser fingerprint
    fingerprint = request.headers.get('x-client-fingerprint', '')

    # Your rate limiting logic here
    # Example: check Redis for usage count by fingerprint
    # if exceeds_limit(fingerprint):
    #     raise HTTPException(status_code=429, detail="Rate limit exceeded")

    # ... rest of your code
```

## ❌ Failed Attempts (Learning History)

### Attempt 1: Direct `useChat` headers option
```typescript
// ❌ FAILED
useChat({
  headers: {
    'X-Client-Fingerprint': fingerprint
  }
})
```
**Error:** `'headers' does not exist in type 'UseChatOptions'`

### Attempt 2: Custom fetch option
```typescript
// ❌ FAILED
useChat({
  fetch: async (input, init) => {
    return fetch(input, {
      ...init,
      headers: { ...init?.headers, 'X-Client-Fingerprint': fingerprint }
    });
  }
})
```
**Error:** `'fetch' does not exist in type 'UseChatOptions'`

### Attempt 3: useState with closure
```typescript
// ❌ FAILED
const [fingerprint, setFingerprint] = useState("");

useChat({
  fetch: async (input, init) => {
    // Closure captured empty string "", never updated
    headers: { 'X-Client-Fingerprint': fingerprint }
  }
})
```
**Problem:** Closure captured initial empty value, never updated even after fingerprint generated

### ✅ Final Solution: useRef + Fetch Interceptor

```typescript
const browserFingerprintRef = useRef<string>("");

useEffect(() => {
  // 1. Generate fingerprint
  const result = await fp.get();
  browserFingerprintRef.current = result.visitorId;

  // 2. Intercept fetch
  window.fetch = async (input, init?) => {
    if (input.includes('/api/chat')) {
      init.headers = {
        ...init.headers,
        'X-Client-Fingerprint': browserFingerprintRef.current // Always latest value
      };
    }
    return originalFetch(input, init);
  };
}, []);
```

**Why it works:**
- `useRef.current` always contains the latest value
- Fetch interceptor reads from ref on every request
- No closure problems
- No AI SDK limitations

## 📊 Request Flow

```
User sends message
    ↓
React component calls sendMessage()
    ↓
AI SDK v5 internally calls fetch('/api/chat')
    ↓
Our interceptor catches the fetch call
    ↓
Inject X-Client-Fingerprint header
    ↓
Request sent to backend with fingerprint
    ↓
Backend extracts fingerprint from headers
    ↓
Backend checks rate limit (Redis/Database)
    ↓
If exceeded: return HTTP 429
    ↓
Frontend shows "usage limit" error
```

## 🧪 Testing

### Console Output (Normal Flow)
```
🔍 Browser Fingerprint Generated: abc123def456...
```

### Network Request Headers
```
GET /api/chat
Headers:
  x-client-fingerprint: abc123def456...
  content-type: application/json
  ...
```

### Backend Logs
```python
# Print from api/index.py
x-client-fingerprint: abc123def456...
```

## 📝 Dependencies Added

```bash
npm install @fingerprintjs/fingerprintjs
```

**Package:** `@fingerprintjs/fingerprintjs`
- Version: Latest
- Purpose: Generate unique browser fingerprints
- Size: ~15KB gzipped
- License: MIT

## 🔐 Privacy Considerations

- Fingerprint is generated client-side only
- No personal information collected
- No cookies or localStorage used
- Fingerprint only sent to your own backend
- Used solely for rate limiting, not tracking

## 🚀 Next Steps (Backend Implementation)

You mentioned you'll implement the backend yourself. Here's what you need:

1. **Redis Setup** (recommended for rate limiting)
   ```python
   import redis
   redis_client = redis.Redis(host='localhost', port=6379, db=0)
   ```

2. **Rate Limit Logic**
   ```python
   def check_rate_limit(fingerprint: str) -> bool:
       key = f"limit:{fingerprint}:hourly:{datetime.now().strftime('%Y%m%d%H')}"
       count = redis_client.get(key) or 0
       if int(count) >= MAX_REQUESTS_PER_HOUR:
           return False  # Exceeded
       redis_client.incr(key)
       redis_client.expire(key, 3600)  # 1 hour TTL
       return True
   ```

3. **Token Usage Tracking**
   ```python
   # After Bedrock call
   token_key = f"tokens:{fingerprint}:hourly"
   total_tokens = response.usage.inputTokens + response.usage.outputTokens
   redis_client.incrby(token_key, total_tokens)
   ```

## 📚 References

- [FingerprintJS Documentation](https://github.com/fingerprintjs/fingerprintjs)
- [AI SDK v5 Documentation](https://sdk.vercel.ai/docs)
- [HTTP 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)
