# Load Testing

Two k6 scripts against the real backend API. Requires the backend running
locally and seeded (`npm run seed` from `Backend/`, see `scripts/seed.js`).

## Running

Start the backend first: `cd Backend && npm run dev` (default port 8000).

Read-heavy browsing flow:

```bash
k6 run loadtest/browse.js
```

Write-heavy checkout flow:

```bash
k6 run loadtest/checkout.js
```

Override the target if running on a non-default port:

```bash
k6 run -e BASE_URL=http://127.0.0.1:8001/api/v1 loadtest/browse.js
```

## Reading the output

k6 prints a summary at the end. The numbers that matter most:

- `http_req_duration` — p(95) and p(99) are the real numbers to quote, not
  the average (averages hide the slow tail that actually matters to users).
- `http_req_failed` — should be near 0%. Anything above the 1% threshold
  set in each script's `options.thresholds` means something broke under
  load, not just "got slower."
- `checks` — the pass rate of the `check()` assertions in each script
  (login succeeded, product loaded, order placed, etc.) — this catches
  functional breakage under load, not just latency.

## Results

**2026-08-28 run — invalid, do not use these numbers.** Both scripts were
run against the app as-is, which includes a global rate limiter
(`Backend/shared/middlewares/rateLimiter.js`: 100 requests / 5 minutes,
per IP, applied to every route including `/login`). Confirmed directly:
hammering `/login` from one IP returns normally for the first 100
requests, then `429` on every request after. Both `browse.js` (20 VUs)
and `checkout.js` (10 VUs) exceed that 100-request budget within the
first few seconds of ramp-up, so almost everything after that point in
both runs was measuring the rate limiter's `429` response, not the
application's real request handling. That's why the checkout run showed
`http_req_failed: 99.95%` and a nonsensical 152,587 iterations in 70
seconds with only 10 VUs (`checkout.js` early-returns on a failed login
before it reaches its own `sleep()` calls, so once logins start
free-running into `429`s the script loops as fast as the network allows
instead of at its intended human-like pace) — that is the rate limiter
working as configured, not the checkout flow or the atomic stock
reservation breaking under load. Nothing about this run is a real
capacity number, and the raw output was garbled by Windows console
encoding on top of that — it was deleted rather than kept as noise.

**Before a valid run can happen, this needs a decision, not a script
fix:** either raise the rate limiter's `max`/`windowMs` for the duration
of a controlled load test, or exempt the load-test machine's IP from it
(e.g. a `skip` function checking `req.ip` against an allowlist env var),
or accept that ~100 requests/5min/IP is closer to this app's real
measured ceiling than anyone expected and treat *that* as the finding.
That's a security-relevant tradeoff (the limiter exists to blunt brute
force / abuse), not something to change unilaterally while chasing a
benchmark number — flag it to whoever owns this decision before touching
`rateLimiter.js`.

Once that's decided, re-run both scripts and replace this section with
the real summary: date, machine/environment specs, Redis mode (connected
vs. degraded-fallback), and the `http_req_duration` p(95)/p(99),
`http_req_failed` rate, and `checks` pass rate from each script's actual
final summary block.
