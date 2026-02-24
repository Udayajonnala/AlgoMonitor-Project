import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ userStats }) {
  const stats = userStats || {
    totalSolved: 540,
    leetcode: 250,
    codeforces: 180,
    codechef: 110,
    rating: {
      leetcode: 1800,
      codeforces: 1500,
      codechef: 1400,
    },
    topics: {
      Arrays: { leetcode: 50, codeforces: 40, codechef: 20 },
      Strings: { leetcode: 40, codeforces: 35, codechef: 25 },
      DP: { leetcode: 30, codeforces: 25, codechef: 15 },
      Graphs: { leetcode: 20, codeforces: 30, codechef: 10 },
      Greedy: { leetcode: 10, codeforces: 15, codechef: 10 },
    },
  };

  /* PLATFORM CHART */
  const platformData = {
    labels: ["LeetCode", "Codeforces", "CodeChef"],
    datasets: [
      {
        label: "Solved",
        data: [stats.leetcode, stats.codeforces, stats.codechef],
        borderRadius: 6,
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",  // soft indigo
          "rgba(34, 197, 94, 0.7)",   // soft green
          "rgba(251, 191, 36, 0.7)",  // soft amber
        ],
      },
    ],
  };

  /* TOPICS CHART */
  const topicsData = {
    labels: Object.keys(stats.topics),
    datasets: [
      {
        label: "LeetCode",
        data: Object.values(stats.topics).map(t => t.leetcode),
        backgroundColor: "rgba(99, 102, 241, 0.65)",
      },
      {
        label: "Codeforces",
        data: Object.values(stats.topics).map(t => t.codeforces),
        backgroundColor: "rgba(34, 197, 94, 0.65)",
      },
      {
        label: "CodeChef",
        data: Object.values(stats.topics).map(t => t.codechef),
        backgroundColor: "rgba(251, 191, 36, 0.65)",
      },
    ],
  };

  /* CHART OPTIONS */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#d1d5db",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="dashboard">
      <h1 style={{ marginBottom: "25px" }}>Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="stats-grid">
        <div className="stat-box highlight">
          <h3>Total Solved</h3>
          <p>{stats.totalSolved}</p>
        </div>

        <div className="stat-box">
          <h3>LeetCode</h3>
          <p>{stats.leetcode}</p>
          <small>Rating: {stats.rating.leetcode}</small>
        </div>

        <div className="stat-box">
          <h3>Codeforces</h3>
          <p>{stats.codeforces}</p>
          <small>Rating: {stats.rating.codeforces}</small>
        </div>

        <div className="stat-box">
          <h3>CodeChef</h3>
          <p>{stats.codechef}</p>
          <small>Rating: {stats.rating.codechef}</small>
        </div>
      </div>

      {/* PLATFORM CHART */}
      <div className="chart-card">
        <h2>Problems Solved by Platform</h2>
        <div className="chart-box">
          <Bar data={platformData} options={options} />
        </div>
      </div>

      {/* TOPICS CHART */}
      <div className="chart-card">
        <h2>Topics Coverage</h2>
        <div className="chart-box">
          <Bar data={topicsData} options={{ ...options, indexAxis: "y" }} />
        </div>
      </div>
    </div>
  );
}