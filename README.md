# Hormuz Sweeper

> *The strait they described as a "death valley." We made it a game.*

A browser-based Minesweeper clone set in the Strait of Hormuz during the March 2026 geopolitical crisis. You are a US Navy mine clearance unit. Iran has laid 28 naval mines across one of the world's most critical oil chokepoints. Clear them — or watch oil spike to $200/bbl.

**[Play it live at hormuzsweeper.xyz](https://hormuzsweeper.xyz)**

---

## What is this?

Classic Minesweeper, reskinned with geopolitical stakes. Built entirely from real events in March 2026, when Iran declared the Strait of Hormuz closed and began laying naval mines through a corridor that carries ~20% of the world's daily crude oil.

**Historically accurate details baked in:**
- **28 mines** — the reported number Iran had laid by mid-March 2026
- **The US had decommissioned all its Middle East minesweepers** in September 2025 (yes, really)
- Iran's estimated stockpile: **up to 5,000 naval mines**
- The Strait was described by US intelligence as **"death valley"**
- US CENTCOM sank **16 Iranian minelayers** in response
- Oil hit **~$120/barrel** during the crisis
- The game gives you $62/bbl if you win. Optimistic.

---

## Gameplay

Standard Minesweeper rules on a 10×22 grid representing the actual geography of the Strait of Hormuz.

| Action | Effect |
|---|---|
| Left click | Reveal cell |
| Right click | Flag suspected mine (⚑) |
| Click empty cell | Auto-reveal surrounding safe area |
| NEW GAME | Reset |

- **Win:** Reveal every non-mine water cell — strait cleared, oil stabilizes
- **Lose:** Click a mine — tanker sunk, oil spikes
- First click is always safe (mines are placed after your first move)
- ~138 playable water cells, 28 mines (~20% density — intermediate difficulty)

### The Map

```
 COLS:  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21
        ←──── PERSIAN GULF ──────── STRAIT ──────────── GULF OF OMAN ────→

ROW 0:  ████████████████████████████████████████████████████████████████  ← Iran interior
ROW 1:  ████████░░░░░░░░░░░░░░░░░░░░░░████████████████████████████████   ← Iran coastline
ROW 2:  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████████████████     ← Strait opens up
ROW 3:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████░░░░     ← Iran east coast
ROW 4:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░   ← QESHM ISLAND
ROW 5:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ← Open channel
ROW 6:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   ← Open channel
ROW 7:  ████████░░░░░░░░░░░░░░░░░░░░░░░░████████████░░░░░░░░░░░░░░░░     ← MUSANDAM tip
ROW 8:  ████████████████░░░░░░░░░░████████████████████░░░░░░░░░░░░░      ← Oman coast
ROW 9:  █████████████████████████████████████████████████████████░░██    ← Oman interior

        Legend: █ = land (not playable)  ░ = water (may contain mines)
```

**Geographic features modeled:**
- **Qeshm Island** (row 4, cols 16–18) — Iran's largest island, inside the strait
- **Musandam Peninsula** (rows 7–8, cols 12–15) — Oman's exclave that juts north into the strait
- **Bandar Abbas** — Iran's main port city, labeled on the map
- **Shipping Lane** — the dashed line where tankers transit
- **Depth contour** — decorative arc, historically placed

---

## Tech Stack

- **Pure HTML + CSS + Canvas API** — zero dependencies, zero build step
- **Vanilla JavaScript** — all game logic, no frameworks
- **Vercel serverless functions** — API proxies for the landing page's live data widgets
- **External APIs:** alternative.me Fear & Greed Index, oilpriceapi.com Brent Crude price

Both `index.html` and `game.html` are **fully self-contained**. The game works entirely offline — just open `game.html` in any browser.

---

## Project Structure

```
hormuz-sweeper/
├── index.html          Landing page (lore, token info, live oil price ticker)
├── game.html           The game (fully self-contained, zero external deps)
├── logo.png            Brand logo
├── twitter.png         Social card for Twitter/X previews
└── api/
    ├── fear-greed.js   Vercel function: Fear & Greed Index proxy
    └── oil.js          Vercel function: Brent Crude oil price proxy
```

### How the game is built

```
game.html
├── <style>          Dark military terminal aesthetic
├── #hud             MINES counter / title / TIME counter / NEW GAME button
├── <canvas>         704 × 320px game board (22 cols × 10 rows × 32px/cell)
├── #status          Win/lose/instruction bar
├── #footer          Classification label + share button
└── <script>
    ├── LAND[][]     10×22 grid — 1=land, 0=water
    ├── drawMapOnce() Renders the Hormuz map to an offscreen canvas:
    │   ├── Water cells with depth shading
    │   ├── Land cells with sandy variation + rocky texture
    │   ├── Coastline borders (bright edge, inner glow)
    │   ├── Grid lines, depth contour, shipping lane dashes
    │   └── Geographic labels (Iran, Oman, Qeshm, Musandam, etc.)
    ├── drawState()  Blits map + renders game overlay:
    │   ├── Unrevealed: dark semi-transparent overlay
    │   ├── Flagged: ⚑ icon
    │   ├── Mines: ✸ icon (blast cell highlighted red)
    │   └── Numbers: color-coded 1–8
    └── Game logic:  mkBoard / placeMines / flood / handleClick / handleFlag
```

---

## Running Locally

No build step needed:

```bash
git clone https://github.com/mrtdlgc/hormuz-sweeper.git
cd hormuz-sweeper
# Open game.html in your browser — that's it
open game.html
```

To run the landing page with live oil price / fear & greed data, deploy to Vercel or use the Vercel CLI locally:

```bash
npm install -g vercel
vercel dev
```

---

## Quotes From The Actual Conflict

> *"The Strait has been described to CNN as a 'death valley.'"*

> *"Military consequences at a level never seen before."* — Trump, Truth Social

> *"We've made it a priority to target Iran's mine-laying enterprise."* — Gen. Dan Caine, Joint Chiefs

> *"We know that they have not mined the straits."* — Treasury Sec. Bessent (also: wrong)

> *"The greatest minesweeping ability."* — Trump (the US had decommissioned all Middle East minesweepers 6 months prior)

---

## Disclaimer

This is a meme game. No tankers were harmed in the making of this repository.
Oil prices were, unfortunately, harmed by actual geopolitics.
The 28 mines in this game are fictional. The 28 mines Iran reportedly laid are not.

---

*28 mines. 138 water cells. God help the shipping industry.*
