import { useState } from "react";
import BookCard from "./components/BookCard.jsx";
import BookMap from "./components/BookMap.jsx";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function fetchBooks(q) {
    if (!q.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&limit=24`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setBooks(Array.isArray(data.docs) ? data.docs : []);
    } catch (e) {
      setError("Failed to fetch books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    fetchBooks(query);
  }

  return (
    <div className="container">
      <header>
        <h1>Book Finder</h1>
        <form onSubmit={onSubmit} className="search">
          <input
            placeholder="Search by title… (e.g., Harry Potter)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading || !query.trim()}>
            {loading ? "Searching…" : "Search"}
          </button>
        </form>
      </header>

      {error && <div className="banner error">{error}</div>}
      {!error && searched && !loading && books.length === 0 && (
        <div className="banner">No results found.</div>
      )}

      <main className="grid">
        {books.map((b) => (
          <BookCard key={`${b.key}-${b.cover_i || ""}`} book={b} />
        ))}
      </main>

      <section>
        <h2>Map</h2>
        <BookMap books={books} />
      </section>

      <footer>
        <p>
          Data from{" "}
          <a
            href="https://openlibrary.org/dev/docs/api/search"
            target="_blank"
            rel="noreferrer"
          >
            OpenLibrary
          </a>
        </p>
      </footer>
    </div>
  );
}
