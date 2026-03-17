# HORMUZ SWEEPER 💣

> *The strait they described as a "death valley." We made it a game.*

**Classic Minesweeper, reskinned as the Strait of Hormuz.**  
You are a US Navy mine clearance unit. Iran has laid 28 naval mines in the world's most critical oil chokepoint. Clear them, or watch oil spike to $200/bbl.

Based entirely on real events, March 2026.

---

## BACKSTORY

On March 4, 2026, Iran declared the Strait of Hormuz "closed" and began laying naval mines — the world's narrowest major oil chokepoint (33km at its tightest), through which ~20% of global crude oil passes daily.

Key facts that make this game historically accurate™:

- **28 mines** — the reported number Iran had laid as of mid-March 2026
- **The US decommissioned all its Middle East minesweepers** in September 2025 (yes, really)
- Iran's estimated stockpile: **up to 5,000 naval mines**
- The Strait was described by US intelligence as **"death valley"**
- Trump threatened consequences **"at a level never seen before"**
- US CENTCOM sank **16 Iranian minelayers** in response
- Oil hit **~$120/barrel** during the crisis
- The game gives you $62/bbl if you win. Optimistic.

---

## HOW TO PLAY

Standard Minesweeper rules:

| Action | Effect |
|--------|--------|
| **Left click** | Reveal cell |
| **Right click** | Flag suspected mine (⚑) |
| **Click empty cell** | Auto-reveal surrounding safe area |
| **[ NEW GAME ]** | Reset |

**Win condition:** Reveal every non-mine water cell  
**Lose condition:** Click a mine → tanker sunk → oil spike

First click is always safe — mines are placed *after* your first move.

---

## THE MAP

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
ROW 8:  ████████████████░░░░░░░░░░░████████████████████░░░░░░░░░░░░░      ← Oman coast
ROW 9:  █████████████████████████████████████████████████████████░░██    ← Oman interior

        Legend: █ = land (not playable)  ░ = water (playable, may contain mines)
```

**Geographic features:**
- **Qeshm Island** (row 4, cols 16–18) — Iran's largest island, inside the strait
- **Musandam Peninsula** (rows 7–8, cols 12–15) — Oman's exclave that juts north into the strait
- **Bandar Abbas** — Iran's main port city, labeled on the map's northeast
- **Shipping Lane** — the dashed line through the middle, where tankers transit
- **Depth contour** — the faint dashed arc, decorative but historically placed

**Playable water cells:** ~138  
**Mine density:** ~20% — roughly intermediate Minesweeper difficulty

---

## TECH STACK

- Pure **HTML + CSS + Canvas API**
- Single self-contained file, zero dependencies, zero build step
- Works fully offline — just open in a browser
- Map is procedurally rendered from the LAND mask array
- Offscreen canvas optimization (map rendered once, blitted each frame)
- Scale-aware mouse handling (works at any browser zoom level)

---

## CODE STRUCTURE

```
hormuz-sweeper.html
├── <style>          Dark military terminal aesthetic
├── #hud             MINES counter / HORMUZ SWEEPER title / TIME counter / NEW GAME
├── <canvas>         704 × 320px  (22 cols × 10 rows × 32px/cell)
├── #status          Win/lose/instruction bar
├── #footer          Classification label + $HORMUZ teaser
└── <script>
    ├── LAND[][]     10×22 grid — 1=land, 0=water
    ├── drawMapOnce() Renders the Hormuz map to an offscreen canvas:
    │   ├── Water cells with depth shading
    │   ├── Land cells with sandy variation + rocky texture
    │   ├── Coastline borders (bright edge, inner glow)
    │   ├── Grid lines, depth contour, shipping lane
    │   └── Geographic labels (Iran, Oman, Qeshm, Musandam, etc.)
    ├── drawState()  Blits map, renders game overlay:
    │   ├── Unrevealed: dark semi-transparent overlay
    │   ├── Flagged: ⚑ icon
    │   ├── Mines: ✸ icon (blast cell highlighted red)
    │   └── Numbers: color-coded 1–8
    ├── Game logic:  mkBoard / placeMines / flood / handleClick / handleFlag
    └── Events:      click (reveal), contextmenu (flag), scale-corrected coords
```

---

## $HORMUZ (COMING TO SOLANA)

> *Utility: minesweeper. Narrative: geopolitical chaos. Vibe: immaculate.*

Possible mechanics for the coin launch:
- Fastest clear time = whitelist for next IDO
- Mine explosion event = coordinated sell (very authentic price action)
- Top leaderboard = airdrop eligibility  
- Token burn = extra flags per game

---

## QUOTES FROM THE ACTUAL CONFLICT

> *"The Strait has been described to CNN as a 'death valley.'"*

> *"Military consequences at a level never seen before."* — Trump, Truth Social

> *"We've made it a priority to target Iran's mine-laying enterprise."* — Gen. Dan Caine, Joint Chiefs

> *"We know that they have not mined the straits."* — Treasury Sec. Bessent (also: wrong)

> *"The greatest minesweeping ability."* — Trump (the US had decommissioned all Middle East minesweepers 6 months prior)

---

## DISCLAIMER

This is a meme game. No tankers were harmed in the making of this repository.  
Oil prices were, unfortunately, harmed by actual geopolitics.  
The 28 mines in this game are fictional. The 28 mines Iran reportedly laid are not.

---

*28 mines. 138 water cells. God help the shipping industry.*
