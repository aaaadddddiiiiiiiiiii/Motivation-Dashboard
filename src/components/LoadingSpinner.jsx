/**
 * LoadingSpinner — Displays an animated spinner with pulsing text
 * while a quote is being fetched from the API.
 */
export default function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="spinner" />
            <p className="loading-text">Fetching inspiration…</p>
        </div>
    );
}
