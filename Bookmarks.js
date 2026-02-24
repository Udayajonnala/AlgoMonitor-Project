import { useEffect, useState } from "react";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks when page loads
  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Remove bookmark function
  const removeBookmark = (contestId) => {
    const updatedBookmarks = bookmarks.filter(
      (contest) => contest.contestId !== contestId
    );

    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="dashboard">
      <h2>Bookmarked Contests</h2>

      {bookmarks.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No bookmarks yet.</p>
      ) : (
        <div className="stats-grid">
          {bookmarks.map((contest) => (
            <div key={contest.contestId} className="stat-box">
              <h3>{contest.name}</h3>
              <p>{contest.platform}</p>
              <p>
                {contest.startTime &&
                  new Date(contest.startTime).toLocaleString()}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => removeBookmark(contest.contestId)}
                  style={{ marginBottom: "10px" }}
                >
                  Remove
                </button>

                <a
                  href={contest.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>View Contest</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}