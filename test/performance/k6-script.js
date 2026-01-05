import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api/v1';

export const options = {
  scenarios: {
    // 1. Average Load Test: Simulates normal day traffic
    // Run for 2 minutes total
    average_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 10 }, // Ramp up
        { duration: '40s', target: 10 }, // Stay
        { duration: '10s', target: 0 },  // Ramp down
      ],
      gracefulStop: '0s',
    },
    // 2. Stress Test: Push to breaking point
    // Starts after average_load (at 1m)
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 50 },
        { duration: '20s', target: 100 },
        { duration: '20s', target: 200 }, // Peak
        { duration: '10s', target: 0 },
      ],
      gracefulStop: '0s',
      startTime: '1m', 
    },
    // 3. Concurrency/Spike Test: Sudden burst
    // Starts after stress_test (at 2m)
    spike_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 }, // Fast ramp up
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulStop: '0s',
      startTime: '2m30s', 
    },
  },
  thresholds: {
    // Global thresholds
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1000ms (relaxed for dev env)
    errors: ['rate<0.05'], // Error rate should be less than 5%
  },
};

export default function () {
  // Simulate a user journey
  group('Browsing Movies', () => {
    // 1. List Movies
    const listMoviesRes = http.get(`${BASE_URL}/movies?page=1&limit=10`);
    const isListSuccess = check(listMoviesRes, {
      'status is 200': (r) => r.status === 200,
      'content type is json': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
    });

    if (!isListSuccess) {
      errorRate.add(1);
    } else {
      // Extract a movie ID if possible (basic parsing)
      try {
        const body = JSON.parse(listMoviesRes.body);
        if (body.data && body.data.length > 0) {
          const movieId = body.data[0].id;
          
          // 2. Get Movie Details (and related data in parallel)
          const responses = http.batch([
            ['GET', `${BASE_URL}/movies/${movieId}`],
            ['GET', `${BASE_URL}/movies/${movieId}/releases`],
            ['GET', `${BASE_URL}/movies/${movieId}/reviews`],
          ]);

          check(responses[0], { 'movie details status is 200': (r) => r.status === 200 });
          check(responses[1], { 'movie releases status is 200': (r) => r.status === 200 });
          check(responses[2], { 'movie reviews status is 200': (r) => r.status === 200 });
        }
      } catch (e) {
        // failed to parse or no data
      }
    }
  });

  sleep(1);

  group('Browsing Cinemas', () => {
    const listCinemasRes = http.get(`${BASE_URL}/cinemas`);
    check(listCinemasRes, {
      'status is 200': (r) => r.status === 200,
    });
  });

  sleep(Math.random() * 2 + 1); // Random think time 1-3s
}
