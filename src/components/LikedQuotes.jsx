/**
 * LikedQuotes — Renders the list of all liked quotes with a count badge.
 *
 * Props:
 *   likedQuotes – array of { quote, author } objects
 *   onRemove    – callback(index) to remove a specific liked quote
 */
export default function LikedQuotes({ likedQuotes, onRemove }) {
    if (likedQuotes.length === 0) return null;

    return (
        <section className="liked-section" id="liked-section">
            <div className="liked-header">
                <h2>💜 Your Liked Quotes</h2>
                <span className="liked-count" id="liked-count">
                    {likedQuotes.length}
                </span>
            </div>

            <div className="liked-list">
                {likedQuotes.map((item, index) => (
                    <div className="liked-item" key={`${item.author}-${index}`}>
                        <div className="liked-item-content">
                            <p className="liked-item-quote">"{item.quote}"</p>
                            <p className="liked-item-author">— {item.author}</p>
                        </div>
                        <button
                            className="btn-remove"
                            onClick={() => onRemove(index)}
                            title="Remove from liked"
                            aria-label={`Remove quote by ${item.author}`}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
