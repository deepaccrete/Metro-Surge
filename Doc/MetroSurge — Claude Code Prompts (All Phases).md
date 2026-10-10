# MetroSurge — Claude Code Prompts (All Phases)

Oct 10, 2026 · @Accrete

## How to Use This File

Copy each phase prompt into Claude Code **one at a time**. Wait for Claude Code to finish before pasting the next phase. Do not skip phases — each one builds on the previous.

- **Total phases:** 5 + 1 bonus
- **Estimated build time:** \~90 minutes
- **Output:** A single `index.html` file that runs in any browser with no install
- **Problem solved:** PS-05 — The Stadium Surge (DevFest Gandhinagar Metro Hackathon)

Get your free Gemini API key before boarding: [aistudio.google.com](https://aistudio.google.com)

## Phase 1 — Project Setup & Foundation

Paste this as your very first message in Claude Code.

```
Create a new single-file web application called "MetroSurge" for the
Gujarat Metro Stadium Surge crowd management system (DevFest Hackathon PS-05).

Tech stack requirements:
- Single HTML file (index.html) — no build tools, no npm, no dependencies to install
- Tailwind CSS via CDN
- Vanilla JavaScript (no frameworks)
- Google Gemini API (free tier) for LLM calls
- Must run by just opening index.html in a browser

Create the file structure:
/metro-surge/
  index.html        ← entire app lives here
  README.md         ← quick setup instructions

In index.html, set up:
1. The full HTML skeleton with Tailwind CDN link in <head>
2. A dark-themed UI (background: #0f172a, accent color: orange #f97316
   to match Gujarat Metro branding)
3. A top navbar with:
   - Logo: "MetroSurge" in orange with a metro icon (use emoji 🚇)
   - Subtitle: "Gujarat Metro · Crowd Intelligence System"
   - A small badge: "DevFest Gandhinagar 2026"
4. A two-column layout (on desktop), single column on mobile:
   - Left column: Input panel
   - Right column: Output panel (initially shows a placeholder)
5. A footer: "Built for Gujarat Metro · DevFest Gandhinagar Metro Hackathon"

Color palette to use throughout:
- Background: #0f172a (dark navy)
- Cards: #1e293b
- Borders: #334155
- Primary accent: #f97316 (orange)
- Secondary accent: #3b82f6 (blue)
- Success: #22c55e (green)
- Warning: #eab308 (yellow)
- Text primary: #f1f5f9
- Text secondary: #94a3b8

Do not add any JavaScript logic yet. Just the layout and styling.
Show me the complete index.html when done.
```

## Phase 2 — Input Form & UI Components

Paste after Phase 1 is complete.

```
Now build the complete INPUT PANEL inside the left column of index.html.

The input panel should be a card (rounded-xl, bg #1e293b, padding 24px)
with the title "Event Details" and an orange left border accent.

Add these form fields with proper labels and styling:

1. EVENT NAME (text input)
   - Placeholder: "e.g. Navratri Night 5 - Riverfront"
   - Helper text: "Cricket match, festival, concert..."

2. VENUE / STATION (dropdown select)
   - Options:
     * Riverfront (Sabarmati) → nearest: Kalupur / Dariapur
     * Narendra Modi Stadium → nearest: Motera
     * GMDC Ground → nearest: Usmanpura
     * Science City → nearest: Science City Metro
     * Custom Location (text field appears)
   - When "Custom" is selected, show a text input for station name

3. EXPECTED ATTENDANCE (number input with slider)
   - Range: 1,000 to 200,000
   - Show the value dynamically as user drags: "85,000 people"
   - Color the slider orange

4. EVENT END TIME (time picker)
   - Default: 22:30
   - Helper: "We'll plan from 60 min before this time"

5. EVENT TYPE (radio buttons styled as pill/chip buttons)
   - 🏏 Cricket Match
   - 🎊 Navratri / Festival
   - 🎵 Concert
   - ⚽ Sports Event
   - 🎭 Other

6. SEVERITY OVERRIDE (toggle switch)
   - Label: "VIP / High Security Event"
   - When ON: adds extra security buffer to the plan

7. API KEY INPUT (small collapsible section at bottom)
   - Label: "Gemini API Key"
   - Type: password
   - Placeholder: "AIza..."
   - Helper: "Get free key at aistudio.google.com"
   - Save to localStorage automatically

8. A large GENERATE PLAN button:
   - Full width, orange background, white text
   - Text: "⚡ Generate Crowd Management Plan"
   - On hover: slightly brighter
   - Shows a loading spinner when processing

Also add a "Try Demo" button below it in outline style:
- Pre-fills: "Navratri Night 5", Riverfront, 85000 people, 22:30, Festival type
- So judges can see it work instantly with one click

Style everything consistently with the dark theme.
All inputs should have dark backgrounds (#0f172a),
orange focus rings, and white text.
```

## Phase 3 — The LLM Brain (Core Logic)

Paste after Phase 2 is complete. This is the most important phase.

````
Now add the JavaScript logic for the Gemini API call and plan generation.

Add a <script> section to index.html with the following:

1. CONSTANTS & CONFIG
   - GEMINI_API_URL using gemini-1.5-flash model (fastest, free)
   - Load API key from localStorage on page load
   - Save API key to localStorage whenever it changes

2. THE MASTER PROMPT FUNCTION
   Create a function buildCrowdManagementPrompt(eventData) that returns
   this exact structured prompt (fill in the eventData variables):

   ---PROMPT START---
   You are MetroSurge, an expert crowd management AI for Gujarat Metro.
   You have deep knowledge of metro operations, crowd flow dynamics,
   and public safety protocols for large events in Ahmedabad/Gandhinagar.

   EVENT DETAILS:
   - Event Name: {eventName}
   - Venue: {venue}
   - Nearest Metro Station: {nearestStation}
   - Expected Attendance: {attendance} people
   - Event End Time: {endTime}
   - Event Type: {eventType}
   - High Security: {isVIP}

   Generate a COMPLETE crowd management plan as a JSON object.

   IMPORTANT: Return ONLY valid JSON, no markdown, no explanation outside JSON.

   The JSON must follow this EXACT structure:
   {
     "summary": {
       "risk_level": "HIGH/MEDIUM/LOW",
       "peak_minute": "time when crowd peaks at station",
       "expected_metro_trips": number,
       "key_concern": "one sentence about biggest risk",
       "control_room_brief": "3-line brief for operator"
     },
     "timeline": [
       {
         "time": "HH:MM",
         "phase": "phase name",
         "action": "what to do",
         "gates": "gate instructions",
         "train_frequency": "every X minutes",
         "holding_zones": "where to hold passengers",
         "staff_count": number,
         "crowd_level": "LOW/MEDIUM/HIGH/CRITICAL"
       }
     ],
     "gate_plan": {
       "gates_to_open": ["Gate 1 - Main", "Gate 3 - North"],
       "gates_to_close": ["Gate 2 - Parking side"],
       "holding_zones": ["Concourse Level A", "Platform 2 Buffer Zone"],
       "entry_exit_split": "description of entry vs exit flow management"
     },
     "train_plan": {
       "normal_frequency": "every 10 minutes",
       "surge_frequency": "every 4 minutes",
       "surge_start": "HH:MM",
       "surge_end": "HH:MM",
       "extra_coaches": "add 2 extra rakes from depot",
       "direction_bias": "towards city center / terminus"
     },
     "announcements": {
       "t_minus_60": {
         "gujarati": "announcement in Gujarati script",
         "hindi": "announcement in Hindi script",
         "english": "announcement in English"
       },
       "t_minus_30": {
         "gujarati": "...",
         "hindi": "...",
         "english": "..."
       },
       "t_zero_event_end": {
         "gujarati": "...",
         "hindi": "...",
         "english": "..."
       },
       "t_plus_15_holding": {
         "gujarati": "...",
         "hindi": "...",
         "english": "..."
       },
       "t_plus_30_clear": {
         "gujarati": "...",
         "hindi": "...",
         "english": "..."
       }
     },
     "staff_deployment": [
       {
         "location": "Station entrance",
         "count": 4,
         "role": "Crowd channeling",
         "time_from": "HH:MM",
         "time_to": "HH:MM"
       }
     ],
     "escalation_triggers": [
       {
         "trigger": "If crowd at gate exceeds 500 people",
         "action": "Activate holding zone B and call control room"
       }
     ],
     "post_event_clear": {
       "estimated_clearance_time": "45 minutes",
       "last_special_train": "HH:MM",
       "return_to_normal": "HH:MM"
     }
   }

   Make the timeline cover from 60 minutes before event end to
   30 minutes after, in 10-minute intervals (9 entries total).

   Make announcements sound authentic, professional and reassuring.
   Gujarati and Hindi must be in their native scripts (not romanized).
   Base crowd dynamics on real metro surge patterns.
   ---PROMPT END---

3. MAIN GENERATE FUNCTION: async function generatePlan()
   - Validate all inputs (show red border + error message if missing)
   - Show loading state on button (spinner + "Generating Plan...")
   - Collect all form values into eventData object
   - Call Gemini API with the prompt
   - Parse the JSON response
   - Call renderPlan(planData) with the result
   - Handle errors gracefully (show error card in output panel)
   - Reset button state after done

4. API CALL FUNCTION: async function callGemini(prompt, apiKey)
   - Use fetch() to call Gemini 1.5 Flash API
   - Proper headers and request body format
   - Extract the text from response.candidates[0].content.parts[0].text
   - Strip any markdown code fences if present (```json ... ```)
   - Parse and return the JSON
   - Throw descriptive errors for API failures

5. DEMO PREFILL FUNCTION: function loadDemo()
   - Set event name: "Navratri Night 5 - Riverfront"
   - Set venue: Riverfront
   - Set attendance slider to 85000
   - Set time to 23:00
   - Set event type to Festival
   - Scroll to the generate button smoothly
````

## Phase 4 — Results Dashboard (The Wow Factor)

Paste after Phase 3 is complete.

```
Now build the OUTPUT PANEL that renders the generated plan beautifully.

Create a function renderPlan(data) that builds the entire output panel
dynamically. The output should have these sections:

━━━ SECTION 1: RISK HEADER BANNER ━━━
A full-width colored banner based on risk_level:
- HIGH → red gradient with warning icon ⚠️
- MEDIUM → orange gradient
- LOW → green gradient
Show: risk level, event name, peak time, expected metro trips
Below it: the control_room_brief in a styled box with monospace font
(this is what the control room operator reads)

━━━ SECTION 2: LIVE TIMELINE (Most impressive part) ━━━
A horizontal stepper / vertical timeline showing each entry from
the timeline array.

Each timeline entry is a card showing:
- TIME in large bold orange text
- PHASE name as a subtitle
- CROWD LEVEL as a colored pill badge:
  * LOW = green, MEDIUM = yellow, HIGH = orange, CRITICAL = red (pulsing animation)
- ACTION in white text (the main instruction)
- Below that, three small info chips:
  🚇 Train frequency
  🚪 Gates instruction
  👥 Staff count

The current-time entry (closest to now) should be highlighted
with a glowing orange border.

━━━ SECTION 3: ANNOUNCEMENT SCRIPTS ━━━
A tabbed section with 5 tabs (one per announcement time):
- T-60 min, T-30 min, At Event End, T+15 Hold, T+30 Clear

Each tab shows three language cards side by side:
- 🇮🇳 Gujarati (in Gujarati script, slightly larger font)
- 🇮🇳 Hindi (in Devanagari script)
- 🇬🇧 English

Each language card has a "📋 Copy" button that copies the text
to clipboard and briefly shows "✓ Copied!"

━━━ SECTION 4: GATE & TRAIN PLAN ━━━
Two cards side by side:

GATE PLAN card:
- Green chips for gates to OPEN
- Red chips for gates to CLOSE
- Blue chips for holding zones
- Entry/exit split description

TRAIN PLAN card:
- Normal vs Surge frequency (show as before/after comparison)
- Surge window (start time → end time) as a timeline bar
- Extra coaches note
- Direction bias

━━━ SECTION 5: STAFF DEPLOYMENT TABLE ━━━
A clean dark table with columns:
Location | Role | Staff Count | From | To

Style with alternating row colors (#1e293b and #0f172a)
Orange header row.

━━━ SECTION 6: ESCALATION TRIGGERS ━━━
A list of alert cards in red/orange tones.
Each shows: ⚡ Trigger condition → Action to take
These look like warning alerts that stand out visually.

━━━ SECTION 7: POST-EVENT SUMMARY ━━━
Three stat boxes in a row:
- Clearance Time
- Last Special Train
- Return to Normal

━━━ ACTION BUTTONS at the bottom ━━━
- "🖨️ Print Plan" → window.print() (add print-friendly CSS)
- "📄 Copy Full Plan as Text" → copies everything as formatted text
- "🔄 Regenerate" → calls generatePlan() again

Add a smooth fade-in animation when the output panel renders.
Scroll to the output panel automatically when plan is ready.
```

## Phase 5 — Polish, Demo Mode & Final Touches

Paste after Phase 4 is complete. This is your last build phase.

```
Final polish pass on index.html. Add these finishing touches:

1. LOADING EXPERIENCE
   While the API call is running, show an animated loading card
   in the output panel with:
   - A pulsing metro icon 🚇
   - Rotating status messages (cycle every 1.5 seconds):
     * "Analyzing crowd patterns..."
     * "Calculating train frequencies..."
     * "Generating Gujarati announcements..."
     * "Building gate deployment plan..."
     * "Finalizing escalation protocols..."
   - An orange progress bar that animates from 0 to 90%
     (jumps to 100% when done)

2. ERROR HANDLING UI
   If API fails, show a friendly error card:
   - Red border, warning icon
   - Human-readable error message
   - For "API key invalid": show link to aistudio.google.com
   - For "Network error": say "Check your connection and try again"
   - A "Retry" button

3. SAMPLE OUTPUT FALLBACK
   Add a hardcoded sample plan JSON for "Navratri Night 5"
   that loads instantly when no API key is provided.
   This lets the demo work EVEN WITHOUT internet or API key.
   Add a banner: "⚠️ Demo Mode - Using sample data. Add API key for live generation."

   The sample JSON must be fully realistic and include:
   - summary with risk_level: "HIGH"
   - 9 timeline entries from 21:30 to 23:30
   - All 5 announcement sets in Gujarati, Hindi, English
   - gate_plan, train_plan, staff_deployment (5 rows), escalation_triggers (3), post_event_clear
   Make the data specific to Navratri at Riverfront, 85,000 people, ending 23:00.

4. PRINT STYLES
   Add @media print CSS:
   - White background, black text
   - Hide: navbar, form panel, buttons, loading states
   - Show: full plan with proper spacing
   - Add "Gujarat Metro — Confidential Operations Document" header
   - Add print timestamp at bottom

5. MOBILE RESPONSIVE FIXES
   - Stack columns on mobile (< 768px)
   - Announcement tabs scroll horizontally on mobile
   - Timeline cards stack vertically
   - Buttons are full-width on mobile

6. MICRO-INTERACTIONS
   - Attendance slider: animate the number counting up/down as user drags
   - Risk level badge: pulse animation for HIGH risk
   - Copy buttons: show checkmark for 2 seconds then revert
   - Generate button: ripple effect on click
   - Tab switching: smooth fade transition

7. LOCAL STORAGE
   - Save the last generated plan to localStorage
   - On page load, if a saved plan exists, show a
     "📂 Load Last Plan" button in the output panel
   - Save API key automatically

8. FINAL META & SEO
   Add to <head>:
   - <title>MetroSurge — Gujarat Metro Crowd Intelligence</title>
   - Meta description
   - Favicon using emoji: <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>🚇</text></svg>">
   - Open Graph tags

9. DO A FINAL REVIEW:
   - Check all JavaScript for any console errors
   - Verify the Gemini API call format is correct for gemini-1.5-flash
   - Make sure demo prefill button works end-to-end
   - Confirm print styles work
   - Test that localStorage save/load works
   - Ensure the copy-to-clipboard buttons work

Show me the complete final index.html file.
```

## Bonus — Judge Demo Script (Ctrl+Shift+D)

Optional but highly recommended. Paste this after Phase 5.

```
Add a hidden "Judge Demo Mode" activated by pressing Ctrl+Shift+D.

When activated:
1. Auto-fills the form with Navratri data
2. Waits 1 second (dramatic pause)
3. Clicks the Generate button automatically
4. Shows a subtle overlay banner: "🎬 Demo Mode Active" in the corner
   (small, bottom-right, fades out after 3 seconds)

Also add keyboard shortcuts (show as a hidden tooltip
when hovering the DevFest badge in the navbar):
- Ctrl+Shift+D = Demo mode (auto-fill + generate)
- Ctrl+Shift+P = Print the current plan
- Ctrl+Shift+R = Reset form to blank

The tooltip should appear on hover with a dark background card
listing all three shortcuts in monospace font.

This lets you run a completely hands-free demo for judges.
No typing, no clicking the form — just one keyboard shortcut
and the full plan appears in under 10 seconds.
```

## Quick Tips

**Before you board the train**

- Run Phase 1 and Phase 2 on Wi-Fi. They need zero internet to build but Claude Code needs connectivity to respond.
- Get your Gemini API key now at [aistudio.google.com](https://aistudio.google.com) — free, takes under 2 minutes.
- Download the Tailwind CDN script locally as a backup in case the CDN is unreachable on the train.
- Phase 5's hardcoded sample data is your safety net if connectivity dies during the demo. Make sure it is built and working.

**Time budget on the train**

| Phase | Task | Minutes |
| --- | --- | --- |
| 1 | Project setup & layout | 10 |
| 2 | Input form | 15 |
| 3 | LLM brain | 20 |
| 4 | Results dashboard | 25 |
| 5 | Polish + sample data | 15 |
| Bonus | Judge demo mode | 5 |
| — | Buffer / rehearse pitch | 10 |

**For your judge pitch, say:**

> "Let me show you what a Gujarat Metro control room operator sees 60 minutes before Navratri ends — generated in under 10 seconds."

Then press **Ctrl+Shift+D**. The form fills itself, the plan generates, and the judges see a full crowd management plan with Gujarati announcements, gate instructions, and an escalation protocol — all without you touching the keyboard again. 🏆
