import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { databases, storage, account, ID, Query } from "./appwrite";
import { notesData } from "./App";
import { AuthContext } from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./About.css";

import {
  faHouse,
  faFlaskVial,
  faFileInvoice,
  faAddressCard,
  faMagnifyingGlass,
  faBars,
  faArrowUp,
  faFileLines,
  faArrowsLeftRight,
  faFilePen,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function LatestUploads() {
  const { setApiState } = useContext(notesData);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTrendingNotes() {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID,
          []
        );
        setNotes(response.documents);
        console.log(response.documents);
      } catch (error) {
        console.error(error);
        alert("Error fetching trending notes");
      }
    }

    fetchTrendingNotes();
  }, []);

  //console.log(user);

  async function handleDownload(fileId) {
    try {
      const response = await storage.getFileDownload(
        process.env.REACT_APP_BUCKET_ID,
        fileId
      );
      window.location.href = response.href;
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  //for filtering data according to user search
  const filteredData = search
    ? notes.filter((note) =>
        note.Title.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  //handle the view option
  async function handleView(fileId) {
    try {
      const response = await storage.getFileView(
        process.env.REACT_APP_BUCKET_ID,
        fileId
      );
      window.location.href = response.href;
      console.log(response);
    } catch (err) {
      console.log("Error in viewing", err);
    }
  }

  async function handleUpvote(noteId) {
    if (!user) {
      alert("You must be logged in to upvote");
      return;
    }

    const userId = user.targets?.[0]?.userId || user.userId;

    try {
      // Check if user has already upvoted this note
      const upvoteCheck = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_UPVOTES_COLLECTION_ID,
        [Query.equal("userId", userId), Query.equal("noteId", noteId)]
      );

      if (upvoteCheck.documents.length > 0) {
        alert("You have already upvoted this note");
        return;
      }

      // Add upvote entry
      await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_UPVOTES_COLLECTION_ID,
        ID.unique(),
        {
          userId: userId,
          noteId: noteId,
        }
      );

      // Increase upvote count in the notes collection
      const note = notes.find((note) => note.$id === noteId);
      const updatedUpvotes = (note.Upvotes || 0) + 1;

      await databases.updateDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        noteId,
        {
          Upvotes: updatedUpvotes,
        }
      );

      // Update local state
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.$id === noteId ? { ...n, Upvotes: updatedUpvotes } : n
        )
      );
    } catch (error) {
      console.log("Error upvoting:", error);
    }
  }

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const [hamburger, setHamburger] = useState("");

  const hamChange = () => {
    if (hamburger === "") {
      setHamburger("sidebar-toggled");
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setHamburger("");
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  const handleClick = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <div>
      <div id="wrapper" className={hamburger}>
        <ul className={style} id="accordionSidebar">
          <Link to="/" style={{ textDecoration: "none" }}>
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
              <div className="sidebar-brand-icon">
                <img src="./img/netflix (1).png" />
              </div>
              <div className="sidebar-brand-text mx-3 main-title">notesj</div>
            </a>
          </Link>

          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link to="/" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faHouse} />
                <span>GLA 1st year Dashboard</span>
              </a>
            </Link>
          </li>
          <li className="nav-item active" onClick={() => setApiState("PYQ")}>
            <Link to="/upload" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faAddressCard} />
                <span>Upload Notes</span>
              </a>
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/lab" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faFlaskVial} />
                <span>Practicals &amp; Lab</span>
              </a>
            </Link>
          </li>
          <li
            className="nav-item active"
            onClick={() => setApiState("Assignement")}
          >
            <Link to="/assignment" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faFilePen} />
                <span>New Assignements</span>
              </a>
            </Link>
          </li>
          <li
            className="nav-item active"
            onClick={() => setApiState("Assignement")}
          >
            <Link to="/Soon" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faFileLines} />
                <span>New Notes</span>
              </a>
            </Link>
          </li>
          <li
            className="nav-item active"
            onClick={() => setApiState("Assignement")}
          >
            <Link to="/leaderboard" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faFileLines} />
                <span>Leaderboard</span>
              </a>
            </Link>
          </li>
          <li
            className="nav-item active"
            onClick={() => setApiState("Assignement")}
          >
            <Link to="/myuploads" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faListCheck} />
                <span>My Uploads</span>
              </a>
            </Link>
          </li>
          <li className="nav-item active" onClick={() => setApiState("PYQ")}>
            <Link to="/subject" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faFileInvoice} />
                <span>Previous Year Papers</span>
              </a>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/about" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faAddressCard} />
                <span>About us</span>
              </a>
            </Link>
          </li>
          <hr className="sidebar-divider" />
          <hr className="sidebar-divider d-none d-md-block" />
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0 p-2 "
              onClick={handleClick}
            >
              <FontAwesomeIcon
                icon={faArrowsLeftRight}
                style={{ color: "#bcc7e6" }}
              />
            </button>
          </div>
        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={hamChange}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input
                  type="text"
                  value={search}
                  className="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
            </form>
            {!user ? (
              <div className="inline-flex items-center ml-4 px-3 py-2 font-medium text-center  bg-blue-700 rounded-lg">
                <Link to="/login" className="logout-button">
                  Login
                </Link>
              </div>
            ) : (
              <div className="inline-flex items-center ml-4 px-3 py-2 font-medium text-center  bg-blue-700 rounded-lg">
                <a
                  onClick={async () => {
                    await account.deleteSession("current");
                    setUser(null);
                  }}
                  className="logout-button"
                >
                  Logout
                </a>
              </div>
            )}
          </nav>
          <div className="flex flex-wrap">
            {filteredData.map((note) => (
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
                  onClick={() => handleDownload(note.Content)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Download
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
                <a
                  onClick={() => handleView(note.Content)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View
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
                <a
                  onClick={() => handleUpvote(note.$id)}
                  className="inline-flex items-center ml-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upvote
                  <FontAwesomeIcon className="ml-2" icon={faArrowUp} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestUploads;
