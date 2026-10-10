// MetroSurge — local model config (template)
//
// 1. Copy this file to  config.js   (same folder)
// 2. Point it at your local LLM server (OpenAI-compatible):
//      - Ollama      → http://localhost:11434/v1
//      - LM Studio   → http://localhost:1234/v1
//      - llama.cpp   → http://localhost:8080/v1
// 3. Open index.html — these prefill the Local Model Settings.
//
// No API key, no cloud. config.js is gitignored.

window.LOCAL_LLM_URL   = "http://localhost:11434/v1";
window.LOCAL_LLM_MODEL = "qwen2.5:7b";
