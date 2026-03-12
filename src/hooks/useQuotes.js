import { useState, useEffect, useCallback } from 'react';

// ─── Constants ──────────────────────────────
const API_URL = 'https://dummyjson.com/quotes/random';
const STORAGE_KEY = 'motivational_liked_quotes';

/**
 * useQuotes — Custom hook for fetching and managing quotes.
 *
 * Returns:
 *   quote       – { quote, author } currently displayed
 *   loading     – boolean, true while a fetch is in-flight
 *   likedQuotes – array of liked { quote, author } objects
 *   isLiked     – boolean, whether the current quote is liked
 *   fetchQuote  – function to fetch a new random quote
 *   toggleLike  – function to like/unlike the current quote
 *   removeLike  – function to remove a specific liked quote by index
 */
export default function useQuotes() {
  // ── State ──────────────────────────────────
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedQuotes, setLikedQuotes] = useState(() => {
    // Initialise from localStorage on first render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ── Fetch a random quote from the API ──────
  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      // dummyjson returns { id, quote, author }
      setQuote({ quote: data.quote, author: data.author });
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      // Fallback quote so the UI is never empty
      setQuote({
        quote: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch initial quote on mount ───────────
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // ── Persist liked quotes to localStorage ───
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likedQuotes));
    } catch (error) {
      console.error('Failed to save likes:', error);
    }
  }, [likedQuotes]);

  // ── Derived: is the current quote already liked? ──
  const isLiked =
    quote !== null &&
    likedQuotes.some(
      (q) => q.quote === quote.quote && q.author === quote.author
    );

  // ── Toggle like / unlike for the current quote ──
  const toggleLike = useCallback(() => {
    if (!quote) return;

    setLikedQuotes((prev) => {
      const exists = prev.some(
        (q) => q.quote === quote.quote && q.author === quote.author
      );
      if (exists) {
        // Remove (unlike)
        return prev.filter(
          (q) => !(q.quote === quote.quote && q.author === quote.author)
        );
      }
      // Add (like)
      return [...prev, { quote: quote.quote, author: quote.author }];
    });
  }, [quote]);

  // ── Remove a specific liked quote by index ──
  const removeLike = useCallback((index) => {
    setLikedQuotes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    quote,
    loading,
    likedQuotes,
    isLiked,
    fetchQuote,
    toggleLike,
    removeLike,
  };
}
