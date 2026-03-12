import LoadingSpinner from './LoadingSpinner';

/**
 * QuoteCard — Displays the current quote inside a glass-morphism card.
 *
 * Props:
 *   quote      – { quote, author } object (or null)
 *   loading    – boolean, disables buttons and shows spinner
 *   isLiked    – boolean, whether current quote is in the liked list
 *   onNewQuote – callback to fetch a new quote
 *   onToggleLike – callback to like/unlike the current quote
 */
export default function QuoteCard({
    quote,
    loading,
    isLiked,
    onNewQuote,
    onToggleLike,
}) {
    return (
        <div className="glass-card" id="quote-card">
            {loading ? (
                <LoadingSpinner />
            ) : (
                quote && (
                    <div className="quote-fade-enter" key={quote.quote}>
                        <p className="quote-text">{quote.quote}</p>
                        <p className="quote-author">{quote.author}</p>
                    </div>
                )
            )}

            <div className="btn-row">
                <button
                    id="new-quote-btn"
                    className="btn btn-new"
                    onClick={onNewQuote}
                    disabled={loading}
                >
                    ✨ New Quote
                </button>

                <button
                    id="like-btn"
                    className={`btn btn-like ${isLiked ? 'liked' : ''}`}
                    onClick={onToggleLike}
                    disabled={loading}
                >
                    <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
                    {isLiked ? 'Liked' : 'Like'}
                </button>
            </div>
        </div>
    );
}
