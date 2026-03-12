import QuoteCard from './components/QuoteCard';
import LikedQuotes from './components/LikedQuotes';
import useQuotes from './hooks/useQuotes';

/**
 * App — Root component.
 * Uses the useQuotes custom hook and passes data to child components.
 */
export default function App() {
  const {
    quote,
    loading,
    likedQuotes,
    isLiked,
    fetchQuote,
    toggleLike,
    removeLike,
  } = useQuotes();

  return (
    <>
      <header className="app-header">
        <h1>Daily Motivation ✨</h1>
        <p>Your daily dose of inspiration</p>
      </header>

      <QuoteCard
        quote={quote}
        loading={loading}
        isLiked={isLiked}
        onNewQuote={fetchQuote}
        onToggleLike={toggleLike}
      />

      <LikedQuotes likedQuotes={likedQuotes} onRemove={removeLike} />
    </>
  );
}
