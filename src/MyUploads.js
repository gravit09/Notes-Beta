import React, { useState, useEffect, useContext } from "react";
import { databases, storage, account, ID, Query } from "./appwrite";
import { AuthContext } from "./AuthContext";

function MyUploads() {
  const [notes, setNotes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTrendingNotes() {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID,
          [Query.equal("uploaderId", user.$id)]
        );
        setNotes(response.documents);
        //console.log(response.documents);
      } catch (error) {
        console.error(error);
        alert("Error fetching usernotes", error);
      }
    }

    fetchTrendingNotes();
  }, []);

  async function handleDelete(id, fileId) {
    if (!id) {
      alert("No document ID found");
      return;
    }

    if (!fileId) {
      alert("No file ID found");
      return;
    }

    try {
      const deleted = await databases.deleteDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        id
      );

      if (deleted) {
        console.log("Document deletion success");
      }

      const fileDel = await storage.deleteFile(
        process.env.REACT_APP_BUCKET_ID,
        fileId
      );

      if (fileDel) {
        console.log("File deletion success");
      }

      if (deleted && fileDel) {
        alert("Deletion success");
      }
    } catch (err) {
      console.log("Error during deletion", err);
    }
  }

  return (
    <div>
      <h1>My Uploads</h1>
      <div className="flex flex-wrap">
        {notes.map((note) => (
          <div
            key={note.$id}
            className="w-full md:w-1/2 lg:w-1/3 p-6 mb-3 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Title : {note.Title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Subject : {note.Subject}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Author :{note.Author}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Uploaded at : {note.UploadDate.slice(0, 10)}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Total Upvotes : {note.Upvotes}
            </p>
            <a
              onClick={() => {
                console.log(note.Content);
                handleDelete(note.$id, note.Content);
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyUploads;
