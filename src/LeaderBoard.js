import React, { useState, useEffect } from "react";
import { databases } from "./appwrite";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Fetch all documents with upvotes
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID
        );

        console.log(response);

        // Aggregate upvotes by Author
        const upvoteCounts = response.documents.reduce((acc, doc) => {
          const { Author, Upvotes } = doc;
          acc[Author] = (acc[Author] || 0) + Upvotes;
          return acc;
        }, {});

        // Convert the object to an array and sort it by upvotes
        const sortedUploaders = Object.entries(upvoteCounts)
          .map(([Author, totalUpvotes]) => ({ Author, totalUpvotes }))
          .sort((a, b) => b.totalUpvotes - a.totalUpvotes)
          .slice(0, 10); // Get top 10

        setLeaderboard(sortedUploaders);
        console.log(leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
        alert("Error fetching leaderboard");
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((uploader, index) => (
          <li key={uploader.Author}>
            {index + 1}. Uploader ID: {uploader.Author}, Upvotes:{" "}
            {uploader.totalUpvotes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
