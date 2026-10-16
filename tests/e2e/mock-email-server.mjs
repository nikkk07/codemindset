// Minimal stand-in for the transactional email API used during end-to-end tests.
// A message containing "SIMULATE_FAILURE" gets a 500 response; anything else is accepted.
import http from 'node:http';

const port = Number(process.argv[2] ?? 4010);
http
  .createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/emails') {
      res.writeHead(404).end();
      return;
    }
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const auth = req.headers.authorization;
      if (auth !== 'Bearer test-key') {
        res.writeHead(401, { 'Content-Type': 'application/json' }).end('{"error":"unauthorised"}');
        return;
      }
      if (body.includes('SIMULATE_FAILURE')) {
        res.writeHead(500, { 'Content-Type': 'application/json' }).end('{"error":"failure"}');
        return;
      }
      res
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ id: `test_${Date.now()}` }));
    });
  })
  .listen(port, '127.0.0.1');
