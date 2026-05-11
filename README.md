# Security Logger (Real-Time OS Monitor) 

**Security Logger** is a browser-based dashboard that simulates real-time OS security monitoring and provides on-page risk scoring, vulnerability-style analysis, and exportable event logs.

> ✅ Runs as a simple static web app: open `index.html` in any modern browser.

## Demo / Run locally
1. Download or clone this repository.
2. Open `index.html` in your browser.

Because it’s static, no build step or backend is required.

## Features
- Real-time (simulated) security event generation
- Severity-based counters (Critical / High / Medium / Low)
- Security Risk Score meter
- “Vulnerability Analysis” based on recent event patterns
- Filter logs by **Severity** and **Event Type**
- View event details
- Export logs to a `.txt` file
- Simulate an attack burst
- Clear logs

## Tech stack
- HTML, CSS, Vanilla JavaScript
- Font Awesome (via CDN)

## Notes / Limitations
- This project **simulates** security events for educational/demo purposes. It does not monitor real OS logs.
- Do not treat the output as a real security audit.

## Project structure
- `index.html` — UI layout
- `style.css` — styling and theming
- `script.js` — app logic (event generation, filters, scoring, export)

## Reporting issues
If you find bugs or want improvements, open an issue using the GitHub Issues tab.

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md).
