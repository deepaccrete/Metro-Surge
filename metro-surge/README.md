# 🚇 MetroSurge

**Gujarat Metro · Crowd Intelligence System** — an AI-powered crowd management planner for stadium / festival surge events.

Built for the **DevFest Gandhinagar Metro Hackathon (PS-05 — The Stadium Surge)**.

## What it does

Given an event (venue, expected attendance, end time, type), MetroSurge generates a complete, control-room-ready crowd management plan: a minute-by-minute timeline, gate plan, train surge schedule, multilingual PA announcements (Gujarati / Hindi / English), staff deployment, and escalation protocols.

## Quick setup

1. **No install needed to view.** Just open `index.html` in any modern browser — it runs in **Demo Mode** with realistic sample data (fully offline).
2. **For live AI generation, run a local LLM** (100% on your machine, no cloud, no API key). Recommended: **Ollama**.

### Local model setup (Ollama)

```bash
# 1. Install (macOS)
brew install ollama            # or download from https://ollama.com

# 2. Allow the browser (file://) to call it, then start the server
OLLAMA_ORIGINS=* ollama serve  # run in its own terminal

# 3. Pull a model (good multilingual + JSON)
ollama pull qwen2.5:7b         # or qwen2.5:3b for low-RAM machines
```

Then in the app open **💻 Local Model Settings** and confirm:
- **Endpoint:** `http://localhost:11434/v1`
- **Model:** `qwen2.5:7b`

Click **🔌 Test connection** — it should say ✓ Connected. Then generate.

You can prefill these via `config.js` (copy from `config.example.js`): `window.LOCAL_LLM_URL` / `window.LOCAL_LLM_MODEL`.

**Other runtimes** work too (anything OpenAI-compatible) — just change the endpoint:
- **LM Studio** → `http://localhost:1234/v1`
- **llama.cpp server** → `http://localhost:8080/v1`

Resolution order: **Local Model Settings field → `config.js` → Demo Mode** (if endpoint blank).

> ℹ️ **CORS note:** opening `index.html` as a `file://` page sends `Origin: null`. Start Ollama with `OLLAMA_ORIGINS=*` (or serve the app via `python3 -m http.server` and browse `http://localhost:8000`) so the browser is allowed to reach it.

## Tech stack

- Single `index.html` file — no build tools, no npm, no dependencies
- Tailwind CSS via CDN
- Vanilla JavaScript
- Local LLM via any OpenAI-compatible endpoint (Ollama / LM Studio / llama.cpp) — no cloud, no API key

## Keyboard shortcuts (demo)

- `Ctrl+Shift+D` — Judge Demo Mode (auto-fill + generate)
- `Ctrl+Shift+P` — Print current plan
- `Ctrl+Shift+R` — Reset form
