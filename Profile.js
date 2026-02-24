import { useState, useEffect } from "react";

export default function Profile() {
  const [handles, setHandles] = useState({
    leetcode: "",
    codeforces: "",
    codechef: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Load saved handles
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("handles"));
    if (saved) setHandles(saved);
  }, []);

  // ✅ handle input change
  const handleChange = (e) => {
    setHandles({ ...handles, [e.target.name]: e.target.value });
  };

  // ✅ Codeforces validation (official API)
  const validateCodeforces = async (handle) => {
    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${handle}`
      );
      const data = await res.json();
      return data.status === "OK";
    } catch {
      return false;
    }
  };

  // ✅ LeetCode validation (GraphQL)
 const validateLeetcode = async (handle) => {
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=https://leetcode.com/${handle}`
    );

    const text = await res.text();

    // If profile exists, page contains username
    return text.toLowerCase().includes(handle.toLowerCase());
  } catch {
    return false;
  }
};
  // ✅ CodeChef validation (page content check)
  const validateCodechef = async (handle) => {
    try {
      const res = await fetch(
        `https://api.allorigins.win/raw?url=https://www.codechef.com/users/${handle}`
      );
      const text = await res.text();
      return !text.includes("User does not exist");
    } catch {
      return false;
    }
  };

  // ✅ Save handles
  const saveHandles = async () => {
    setLoading(true);

    const { leetcode, codeforces, codechef } = handles;

    if (!leetcode && !codeforces && !codechef) {
      alert("⚠️ Please enter at least one handle");
      setLoading(false);
      return;
    }

    if (codeforces) {
      const valid = await validateCodeforces(codeforces);
      if (!valid) {
        alert("❌ Codeforces handle does not exist");
        setLoading(false);
        return;
      }
    }

    if (leetcode) {
      const valid = await validateLeetcode(leetcode);
      if (!valid) {
        alert("❌ LeetCode handle does not exist");
        setLoading(false);
        return;
      }
    }

    if (codechef) {
      const valid = await validateCodechef(codechef);
      if (!valid) {
        alert("❌ CodeChef handle does not exist");
        setLoading(false);
        return;
      }
    }

    localStorage.setItem("handles", JSON.stringify(handles));
    alert("✅ Handles saved successfully!");
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h1>Profile</h1>

      <input
        type="text"
        name="leetcode"
        placeholder="LeetCode handle"
        value={handles.leetcode}
        onChange={handleChange}
      />

      <input
        type="text"
        name="codeforces"
        placeholder="Codeforces handle"
        value={handles.codeforces}
        onChange={handleChange}
      />

      <input
        type="text"
        name="codechef"
        placeholder="CodeChef handle"
        value={handles.codechef}
        onChange={handleChange}
      />

      <button onClick={saveHandles}>
        {loading ? "Checking..." : "Save Handles"}
      </button>
    </div>
  );
}