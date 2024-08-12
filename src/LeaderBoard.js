import React, { useState, useEffect } from "react";
import { databases } from "./appwrite";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Fetch all notes with upvotes
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID
        );

        // Fetch all the assignments
        const assignmentVotes = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_USER_AssignmentCollection
        );

        const combined = [...response.documents, ...assignmentVotes.documents];

        // Aggregate upvotes by Author
        const upvoteCounts = combined.reduce((acc, doc) => {
          const { Author, Upvotes } = doc;
          acc[Author] = (acc[Author] || 0) + Upvotes;
          return acc;
        }, {});

        console.log(upvoteCounts);

        // Convert the object to an array and sort it by upvotes
        const sortedUploaders = Object.entries(upvoteCounts)
          .map(([Author, totalUpvotes]) => ({ Author, totalUpvotes }))
          .sort((a, b) => b.totalUpvotes - a.totalUpvotes)
          .slice(0, 10); // Get top 10

        setLeaderboard(sortedUploaders);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
        alert("Error fetching leaderboard");
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-8">
      <Link to="/" style={{ textDecoration: "none" }}>
        <a className="sidebar-brand d-flex align-items-center mb-3 text-2xl justify-content-center">
          <div className="sidebar-brand-icon">
            <img src="./img/netflix (1).png" />
          </div>
          <div className="sidebar-brand-text mx-3 main-title">notesj</div>
        </a>
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upload Leaderboard
      </h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 text-left">
              Rank
            </th>
            <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 text-left">
              UserName
            </th>
            <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 text-left">
              Upvotes
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((uploader, index) => {
            let rankStyle = {};

            if (index === 0) {
              rankStyle = {
                backgroundColor: "#ffcc00",
                color: "black",
                fontWeight: "bold",
              };
            } else if (index === 1) {
              rankStyle = {
                backgroundColor: "silver",
                color: "black",
                fontWeight: "bold",
              };
            } else if (index === 2) {
              rankStyle = {
                backgroundColor: "#cd7f32",
                color: "black",
                fontWeight: "bold",
              };
            }

            return (
              <tr key={uploader.Author} className="border-b" style={rankStyle}>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{uploader.Author}</td>
                <td className="py-3 px-4">{uploader.totalUpvotes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
