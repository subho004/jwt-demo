# JWT Demo

This is a simple Next.js application demonstrating JWT authentication. It includes:

- Middleware for JWT validation
- An API route that requires JWT authentication
- Utility functions for encoding and decoding JWTs
- Tests for JWT functions

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/jwt-demo.git
cd jwt-demo
```

### Install Dependencies
```
npm i
```
### Development Server

To start the development server, use:
```
npm run dev
```

The server will be running at http://localhost:3000.

## Testing the API

The API endpoint is protected and requires a valid JWT for access. To generate a JWT and test the API:

	1.	Generate a JWT
Uncomment the lines in src/app/api/protected/route.ts to generate a JWT.
```
// Uncomment the following lines to generate a JWT
// import { encodeJwt } from '../../../lib/jwt';
// const jwt = encodeJwt(SECRET, 'user123', { name: 'John Doe' }, 3600);
// console.log('Generated JWT:', jwt);
```
  2.	Test with cURL
```
curl -H "Authorization: Bearer YOUR_VALID_JWT" http://localhost:3000/api/protected
```

## Running Tests

To run the tests for JWT functions:

```
npm test
```
This will execute the tests defined in src/tests/api.test.ts, which check the functionality of JWT encoding, decoding, and validation.

### Example
```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNzIxODc4MjE2fQ.YTJpN0wzSE44a3AyQUU3TW5QZk8ySkRmNEcyV3Y0NENSTWxtUW91WHY3QT0" http://localhost:3000/api/protected
{"message":"Authorized"}%
```

```
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJzdWIiOiJ1c2VyMTIzIiwiZXhwIjoxNzIxODc3NzU3fQ.czNLQjA0cHNPK0JHemFGU291bFA0MS9NNW5LT3lVOSt4cUlpNW5Y" http://localhost:3000/api/protected
{"message":"unauthorized"}%
```
