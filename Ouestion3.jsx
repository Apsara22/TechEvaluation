import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fake-json-api.mock.beeceptor.com/users")
      .then((response) => response.json())
      .then((userData) => {
        setData(userData);
        setLoading(false); // stop loading after data comes
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>User List</h2>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Display data */}
      {!loading &&
        data.map((user, index) => (
          <p key={index}>{user.name}</p>
        ))}
    </>
  );
};

export default App;