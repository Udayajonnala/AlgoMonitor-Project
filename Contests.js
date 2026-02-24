import { useEffect, useState } from "react";
import ContestCard from "../components/ContestCard";

function Contests() {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);

  // ✅ Load contests
  useEffect(() => {
    const loadContests = async () => {
      try {
        const res = await fetch("https://codeforces.com/api/contest.list");
        const data = await res.json();

        const upcomingList = data.result
          .filter(c => c.phase === "BEFORE")
          .slice(0, 5)
          .map(c => ({
            contestId: `cf-${c.id}`,
            name: c.name,
            platform: "Codeforces",
            startTime: c.startTimeSeconds * 1000,
            url: `https://codeforces.com/contest/${c.id}`
          }));

        const pastList = data.result
          .filter(c => c.phase === "FINISHED")
          .slice(0, 5)
          .map(c => ({
            contestId: `cf-${c.id}`,
            name: c.name,
            platform: "Codeforces",
            startTime: c.startTimeSeconds * 1000,
            url: `https://codeforces.com/contest/${c.id}`
          }));

        setUpcoming(upcomingList);
        setPast(pastList);
      } catch (error) {
        alert("Failed to load contests");
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  // ✅ Load saved bookmarks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved);
  }, []);

  // ✅ Bookmark function
  const bookmarkContest = (contest) => {
    const exists = bookmarked.find(
      c => c.contestId === contest.contestId
    );

    if (exists) {
      alert("Already bookmarked");
      return;
    }

    const updated = [...bookmarked, contest];
    setBookmarked(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));

    alert("Bookmarked successfully!");
  };

  if (loading) return <h2>Loading contests...</h2>;

  return (
    <div className="dashboard">
      <h2>Upcoming Contests</h2>
      <div className="stats-grid">
        {upcoming.length === 0 ? (
          <p>No upcoming contests</p>
        ) : (
          upcoming.map(contest => (
            <ContestCard
              key={contest.contestId}
              contest={contest}
              bookmark={bookmarkContest}
            />
          ))
        )}
      </div>

      <h2 style={{ marginTop: "40px" }}>Past Contests</h2>
      <div className="stats-grid">
        {past.length === 0 ? (
          <p>No past contests</p>
        ) : (
          past.map(contest => (
            <ContestCard
              key={contest.contestId}
              contest={contest}
              bookmark={bookmarkContest}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Contests;