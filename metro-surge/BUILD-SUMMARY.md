# MetroSurge — Build Summary (compressed, cumulative)

> One compressed entry per completed phase. Read this before starting the next phase.
> App = single `metro-surge/index.html` + `README.md`. Stack: Tailwind CDN + vanilla JS + Gemini 1.5 Flash.

## Palette / config (stable across all phases)
- bg `#0f172a`, card `#1e293b`, border `#334155`
- accent orange `#f97316`, accent2 blue `#3b82f6`, ok green `#22c55e`, warn yellow `#eab308`
- text `#f1f5f9`, text2 `#94a3b8`
- Tailwind config maps these as: `bg card borderc accent accent2 ok warn txt txt2`.

---

## ✅ Phase 1 — Project Setup & Foundation  (DONE)
Scaffolded the single-file app. **No JS logic yet** — layout + styling only.

Key DOM anchors created (referenced by later phases):
- `<nav>` sticky navbar: 🚇 logo + "MetroSurge" (orange) + subtitle + `#devfestBadge` chip ("DevFest Gandhinagar 2026"). Badge will host the shortcut tooltip in Bonus.
- `<main>` 2-col grid `lg:grid-cols-[minmax(340px,420px)_1fr]`, single col on mobile.
  - `#inputPanel` (left) — placeholder card, filled in Phase 2.
  - `#outputPanel` (right) — placeholder "No plan generated yet", replaced by `renderPlan()` output in Phase 4.
- `<footer>`: "Built for Gujarat Metro · DevFest Gandhinagar Metro Hackathon".
- `<head>`: title, meta description, emoji 🚇 favicon (Phase 5 may extend OG tags), Tailwind CDN + inline tailwind.config + scrollbar CSS.

## ✅ Phase 2 — Input Form & UI Components  (DONE)
Filled `#inputPanel` with `<form id="eventForm">` (orange left border card). Field IDs/names (used by Phase 3 JS):
- `#eventName` (text)
- `#venue` (select; each `<option>` has `data-station`; value `"Custom Location"` reveals `#customVenueWrap` → `#customStation`)
- `#attendance` (range 1000–200000 step 1000, val 85000) + `#attendanceLabel` (shows "85,000 people")
- `#endTime` (time, default 22:30, dark color-scheme)
- `eventType` radios (pills, `.pill span` CSS + peer-checked turns orange) — values: `Cricket Match`, `Navratri / Festival` (default checked), `Concert`, `Sports Event`, `Other`
- `#isVIP` (toggle checkbox)
- `#apiKey` (password, inside `<details>` collapsible) → Phase 3 syncs to localStorage
- `#generateBtn` (type=submit) containing `#btnSpinner` (hidden svg) + `#btnLabel` text
- `#demoBtn` (type=button) → Phase 3 `loadDemo()`
- Error `<p data-error-for="...">` helpers under eventName & venue for validation.
Added `.pill` CSS to `<style>`. **Still no JS** — all wiring deferred to Phase 3.

## ✅ Phase 3 — LLM Brain  (DONE)
Added one `<script>` IIFE before `</body>`. All code namespaced inside; selected fns exposed on `window.MetroSurge`.
- **Config:** `GEMINI_MODEL='gemini-1.5-flash'`, `GEMINI_API_URL` (v1beta `:generateContent`), localStorage keys `metrosurge_api_key` / `metrosurge_last_plan`.
- **UI wiring:** API key load+persist; attendance slider → animated counting `#attendanceLabel` via `renderAttendance()`; venue change toggles `#customVenueWrap`; inline validation `showError/clearError` using `[data-error-for]`.
- `collectEventData()` → `{eventName, venue, nearestStation, attendance, endTime, eventType, isVIP:'YES'/'NO'}` (resolves custom station + data-station attr).
- `buildCrowdManagementPrompt(d)` — returns the exact master prompt from spec (full JSON schema).
- `callGemini(prompt,apiKey)` — fetch POST `?key=`, `responseMimeType:'application/json'`, temp 0.7; error prefixes **NETWORK / API_KEY / RATE / API / BLOCKED / EMPTY / PARSE** (Phase 5 error UI keys off these). `parsePlanJSON()` strips ```json fences + brace-slice fallback.
- `generatePlan()` — validates eventName+venue; if no API key calls `window.getSamplePlan(eventData)` (defined Phase 5) and sets `window.__demoMode=true`; else live call. Saves plan to localStorage, sets `planData.__event`, calls `renderPlan`.
- `setLoading(on)` toggles spinner/label + calls `showLoadingCard()` if defined (Phase 5).
- `loadDemo()` — Navratri Night 5 / Riverfront / 85000 / 23:00 / Festival, smooth-scrolls to generate btn.
- **STUBS to replace in Phase 4:** `renderPlan(data)` (currently JSON dump) and `renderError(err)` (basic card). `escapeHTML` helper available. Hooks referenced but defined later: `window.getSamplePlan`, `showLoadingCard` (Phase 5).

## ✅ Phase 4 — Results Dashboard  (DONE)
Replaced stubs with full `renderPlan(data)` (inside IIFE). Renders into `#outputPanel` a `#planRoot` with `.ms-fade`, then `wirePlanEvents()`, then smooth-scrolls.
- **Lookups:** `CROWD{}` (LOW/MED/HIGH/CRITICAL→pill+bar; CRITICAL pulses), `RISK{}` (HIGH red/MED orange/LOW green gradients), `ANN_TABS[]` (5 keys ↔ labels). `currentPlan` module var holds latest plan for action buttons.
- **§1 Risk banner:** gradient header (HIGH adds `.ms-pulse`), risk/peak/trips/key_concern + mono `control_room_brief` box.
- **§2 Timeline:** card per entry; current entry (time ≤ now, latest) gets `.ms-glow` + "NOW" tag (`nowMinutes()`/`toMin()`); crowd pill + chips 🚇🚪👥🅿️.
- **§3 Announcements:** tab buttons `[data-ann-tab]` + panels `[data-ann-panel]`; `langCard()` ×3 (GU larger font) each with `.copy-btn[data-copy]`.
- **§4** `gatePlanCard` (green/red/blue chip lists) + `trainPlanCard` (normal vs surge, window bar).
- **§5** staff table (orange header, alternating `bg-card`/`bg-bg` rows).
- **§6** escalation cards (red). **§7** three `statBox`es.
- **Actions** (`.no-print`): `#printBtn`→window.print, `#copyAllBtn`→`copyText(planToText())`, `#regenBtn`→generatePlan. `copyText()` uses clipboard API + execCommand fallback, shows "✓ Copied!" 2s.
- Added CSS: `.section-h`, `.chip`, `.ms-fade`, `.ms-pulse`, `.ms-glow`.
- `renderError` still basic (upgraded in Phase 5). All fields use `escapeHTML` + `|| '—'` fallbacks so partial JSON won't crash.

## ✅ Phase 5 — Polish, Demo Mode & Final Touches  (DONE)
All added inside same IIFE (Phase 5 block before EVENTS) + head/CSS.
- **Head:** theme-color + OG/Twitter meta tags (title already set Phase 1).
- **Loading:** `showLoadingCard()` — pulsing 🚇, rotating `LOAD_MSGS` (5, every 1.5s), progress bar 6→90% random, `finishLoadingBar()` jumps to 100%. Called by `setLoading(true)`.
- **Error UI:** reassigned `renderError` — parses prefix code (API_KEY/NETWORK/RATE/PARSE/EMPTY/BLOCKED) → friendly title+body, API_KEY shows aistudio link, all show `#retryBtn`→generatePlan.
- **renderPlan wrapped** to call `finishLoadingBar()` first (via saved `_render`).
- **Sample fallback:** `window.getSamplePlan(ev)` — full realistic HIGH-risk Navratri/Riverfront/85k plan: 9 timeline entries 22:00→23:30 (CRITICAL peak 23:00–23:20), all 5 announcement sets in real Gujarati+Hindi+English scripts, gate/train/5-row staff/3 escalation/post-event. Triggers Demo-Mode banner (`window.__demoMode`). *(Note: spec said 21:30–23:30; used 22:00–23:30 to match demo end-time 23:00 window — still 9 entries.)*
- **Print:** `@media print` (white bg, hides nav/footer/#inputPanel/.no-print, shows all announcement tabs, `#printHeader` "Gujarat Metro — Confidential Operations Document" + `#printFooter` timestamp via `beforeprint`).
- **Micro-interactions:** generate-btn ripple (`.ms-ripple`); risk HIGH pulse + CRITICAL pill pulse + copy ✓ + tab fade (from Phase 4).
- **Load Last Plan:** `initLastPlan()` prepends 📂 button to `#outputPanel` if `metrosurge_last_plan` in localStorage.
- Mobile: already responsive (grid stacks <lg, ann tabs overflow-x, action btns flex-wrap).

## ✅ Bonus — Judge Demo Mode  (DONE)
- Global `keydown`: **Ctrl+Shift+D** `runJudgeDemo()` (loadDemo → banner → 1s pause → generatePlan), **Ctrl+Shift+P** print, **Ctrl+Shift+R** `resetForm()` (form.reset, keeps saved API key, restores placeholder).
- `showDemoBanner()` — fixed bottom-right "🎬 Demo Mode Active", fades out ~3s.
- Shortcut **tooltip** added inside `#devfestBadge` (group-hover, monospace, lists 3 shortcuts).
- Exposed `window.MetroSurge.runJudgeDemo / resetForm`.

---

## ✅ Light theme + GMRC logo  (DONE)
- Palette flipped to **light** (brand): page `#f5f7fa`, white cards, navy text, Gujarat Metro orange `#ef7d1a`. Later refactored to CSS-variable tokens (see Phase 6).
- Official **GMRC "આપણી મેટ્રો" logo** downloaded → `assets/gmrc-logo.png`; shown in navbar + print header, 🚇 emoji fallback via `onerror`.
- API key via gitignored `config.js` (`window.GEMINI_API_KEY`); resolution: in-app field → config.js → Demo Mode.

## ✅ Phase 6 — Advanced System  (DONE)
Palette refactored to **CSS variables** (`--c-*` RGB triplets) with Tailwind `rgb(var(--c-x) / <alpha-value>)` → enables runtime theming + opacity modifiers. `:root` = light, `html.dark` = dark.
- **Theme toggle** (`#themeToggle` in navbar): light↔dark, persisted `metrosurge_theme`, applied pre-paint via head script; `applyTheme()` + `initTheme()`; calls `sim.redraw()` to recolor canvases.
- **Live Operations Simulator** (`#commandCenter`, injected by `injectAdvanced()` from `wirePlanEvents`): animated **crowd-load gauge** (canvas 270° arc), **station particle schematic** (entrance→concourse→platform→train, dots spawn ∝ crowd level, trains clear batches), **play/pause/scrub/speed** controls, live clock stepping through timeline (`createSimulation()`), auto-highlights matching `.tl-card` (`data-tl-idx`).
- **Crowd-level area chart** across timeline (`drawCrowdChart`, canvas, LOW..CRIT, marks active point).
- **Animated KPI counters** (`#kpiStrip`): Attendance / Metro Trips / Peak Staff / Escalation count (`animateCount` cubic-ease).
- **Voice announcements**: `.speak-btn` per language card → `speakAnnouncement()` via Web Speech API (`gu-IN`/`hi-IN`/`en-IN`), toggle play/stop, animated sound bars; speech cancelled on re-render.
- Helpers: `rgbv()`/`cssTriplet()` read live theme colors so canvases theme-correctly; `LEVEL_NUM`/`levelColor`/`roundRect`.
- All advanced features work in **Demo Mode** (no API/network needed). JS validated (`node --check`).

---

## ✅ Local model (Gemini removed)  (DONE)
Swapped cloud Gemini for a **local, OpenAI-compatible LLM** (Ollama / LM Studio / llama.cpp). No key, no cloud.
- Config: `DEFAULT_LLM_URL='http://localhost:11434/v1'`, `DEFAULT_LLM_MODEL='qwen2.5:7b'`; localStorage `metrosurge_llm_url`/`metrosurge_llm_model`; config.js `window.LOCAL_LLM_URL`/`LOCAL_LLM_MODEL`.
- Form: API-key field → **💻 Local Model Settings** (`#llmUrl`, `#llmModel`, `#llmTestBtn`→GET `/models`, `#llmStatus`).
- `callGemini`→`callLocalLLM(prompt, base, model)` POST `{base}/chat/completions` (messages + `response_format:json_object`), reads `choices[0].message.content`. Errors: **CONN / MODEL / API / EMPTY / PARSE** with Ollama-specific guidance (ollama serve, pull, `OLLAMA_ORIGINS=*`).
- generatePlan: empty endpoint → Demo Mode; else live local call. resetForm keeps LLM settings. Exports `callLocalLLM`.
- README + config.example.js rewritten for Ollama setup + CORS note. **Runtime not installed yet** (user said leave it): `brew install ollama` → `OLLAMA_ORIGINS=* ollama serve` → `ollama pull qwen2.5:7b`.
- JS validated (`node --check`); zero Gemini refs remain.

---

# 🏁 BUILD COMPLETE — all 5 phases + bonus + advanced + local-model
Deliverables in `metro-surge/`: `index.html` (whole app), `README.md`, `BUILD-SUMMARY.md`.
Open `index.html` in a browser → works offline in Demo Mode (no key) or live with a Gemini key.
To demo: press **Ctrl+Shift+D**.
