# Daily Motivation ✨ — Motivational Quotes App

🔗 **Live Demo:** [motivation-dashboard.vercel.app](https://motivation-dashboard.vercel.app)

A React-based web app that fetches random motivational quotes and lets you **like**, **collect**, and **persist** your favourites.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
src/
├── main.jsx                  # Entry point — mounts <App />
├── index.css                 # Global design system (dark theme, glass UI)
├── App.jsx                   # Root component — wires hook to children
├── App.css                   # (empty — styles live in index.css)
├── hooks/
│   └── useQuotes.js          # Custom hook for all quote logic
└── components/
    ├── QuoteCard.jsx          # Displays quote + action buttons
    ├── LikedQuotes.jsx        # Renders liked-quotes list
    └── LoadingSpinner.jsx     # Animated loading indicator
```

---

## 🔧 File-by-File Explanation

### `src/hooks/useQuotes.js` — Custom Hook

This is the **brain** of the app. It manages all state and side-effects.

| Export | Type | Description |
|--------|------|-------------|
| `quote` | `{ quote, author }` | The currently displayed quote |
| `loading` | `boolean` | `true` while a fetch is in-flight |
| `likedQuotes` | `array` | All liked `{ quote, author }` objects |
| `isLiked` | `boolean` | Whether the current quote is in the liked list |
| `fetchQuote()` | `function` | Fetches a new random quote from the API |
| `toggleLike()` | `function` | Adds or removes the current quote from likes |
| `removeLike(index)` | `function` | Removes a specific liked quote by its index |

**Key functions explained:**

- **`fetchQuote()`** — Calls `fetch('https://dummyjson.com/quotes/random')`, parses the JSON, and stores `{ quote, author }` in state. Sets `loading` to `true` before the request and `false` after. Includes a fallback quote in case of network errors.

- **`toggleLike()`** — Checks if the current quote already exists in `likedQuotes` (matching both `quote` and `author`). If yes, it filters it out (unlike). If no, it appends it (like). Uses functional state update (`setLikedQuotes(prev => ...)`) for safe array mutation.

- **`removeLike(index)`** — Filters `likedQuotes` by index to remove a specific entry from the liked list.

**`useEffect` hooks (side-effects):**

1. **Initial fetch** — Runs `fetchQuote()` once on component mount (`[]` dependency).
2. **Persist to localStorage** — Runs whenever `likedQuotes` changes, saving the array as JSON under the key `motivational_liked_quotes`.
3. **Restore from localStorage** — Uses a lazy initialiser in `useState(() => ...)` to read stored likes on first render.

---

### `src/components/QuoteCard.jsx`

Renders the quote card with a glass-morphism design.

| Prop | Type | Description |
|------|------|-------------|
| `quote` | `object` | Current `{ quote, author }` |
| `loading` | `boolean` | Shows spinner when `true`, disables buttons |
| `isLiked` | `boolean` | Toggles heart icon & button style |
| `onNewQuote` | `function` | Called on "New Quote" click |
| `onToggleLike` | `function` | Called on "Like" click |

- Shows `<LoadingSpinner />` while `loading` is `true`.
- Uses a `key` on the quote wrapper to trigger a CSS fade-in animation on every new quote.

---

### `src/components/LikedQuotes.jsx`

Displays a scrollable list of all liked quotes.

| Prop | Type | Description |
|------|------|-------------|
| `likedQuotes` | `array` | Array of `{ quote, author }` |
| `onRemove` | `function` | `onRemove(index)` removes a liked quote |

- Returns `null` when the array is empty (hides the section entirely).
- Shows a count badge with the total number of liked quotes.
- Each item has a **✕** button to remove it.

---

### `src/components/LoadingSpinner.jsx`

A pure presentational component — animated CSS spinner + "Fetching inspiration…" pulsing text. No props required.

---

### `src/App.jsx`

The root component. It:
1. Calls `useQuotes()` to get all state and handlers.
2. Renders the header, `<QuoteCard />`, and `<LikedQuotes />`.
3. Passes hook values as props.

---

## 📚 React Concepts Used

| Concept | Where |
|---------|-------|
| `useEffect` — data fetching on mount | `useQuotes.js` |
| `useEffect` — syncing to localStorage | `useQuotes.js` |
| `useState` — managing quote, loading, likedQuotes | `useQuotes.js` |
| `useCallback` — stable function references | `useQuotes.js` |
| Array state updates (add/remove) | `toggleLike()`, `removeLike()` |
| Conditional rendering | `QuoteCard.jsx` (loading vs. quote) |
| Props drilling | `App → QuoteCard`, `App → LikedQuotes` |
| Derived state (`isLiked`) | `useQuotes.js` |

---

## 🌐 API

**Endpoint:** `https://dummyjson.com/quotes/random`

Returns:
```json
{
  "id": 42,
  "quote": "Be yourself; everyone else is already taken.",
  "author": "Oscar Wilde"
}
```

---

## 📝 License

This project is for educational purposes (Term 3 Project).
