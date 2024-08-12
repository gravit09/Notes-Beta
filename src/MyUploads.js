import { Link } from "react-router-dom";
import { notesData } from "./App";
import React, { useState, useEffect, useContext } from "react";
import { databases, storage, account, ID, Query } from "./appwrite";
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
  faFilePen,
  faArrowsLeftRight,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function LatestUploads() {
  const { setApiState } = useContext(notesData);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null); // Track which card is being deleted
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTrendingNotes() {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_COLLECTION_ID,
          [Query.equal("uploaderId", user.$id)]
        );
        const assignments = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_USER_AssignmentCollection,
          [Query.equal("uploaderId", user.$id)]
        );
        const combinedNotes = [...response.documents, ...assignments.documents];
        setNotes(combinedNotes);
        console.log(response.documents);
      } catch (error) {
        console.error(error);
        alert("Error fetching user notes", error);
      }
    }

    fetchTrendingNotes();
  }, [user]);

  async function handleDelete(id, fileId) {
    setDeletingId(id); // Set the ID of the card being deleted

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

      const fileDel = await storage.deleteFile(
        process.env.REACT_APP_BUCKET_ID,
        fileId
      );

      if (deleted && fileDel) {
        alert("Deletion success");
        // Remove the deleted card from the notes array
        setNotes((prevNotes) => prevNotes.filter((note) => note.$id !== id));
      }
    } catch (err) {
      console.log("Error during deletion", err);
    } finally {
      setDeletingId(null); // Reset the deleting state
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
                <span>1st year Dashboard</span>
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
          <div>
            {notes.length === 0 && <h2>No Uploads Yet</h2>}
            <div className="container-fluid">
              <div className="row">
                {notes.map((note) => {
                  const uploadDate = new Date(note.$createdAt);
                  const currentDate = new Date();
                  const timeDiff = currentDate - uploadDate;
                  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

                  return (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 mb-4"
                      key={note.$id}
                    >
                      <div className="card shadow mb-4">
                        {dayDiff <= 3 && (
                          <button className="absolute py-1 px-2 -left-2 -top-2 -rotate-[10deg] border border-black bg-[#7e22ce] text-white font-bold">
                            New!
                          </button>
                        )}
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 className="m-0 font-weight-bold text-primary">
                            {note.Title}
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-2"></div>
                          <p>Subject : {note.Subject}</p>
                          <p>Upvotes : {note.Upvotes}</p>
                          <p className="text-muted">
                            Uploaded on: {uploadDate.toDateString()}
                          </p>
                          <button
                            onClick={() => handleDelete(note.$id, note.Content)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={deletingId === note.$id} // Disable button while deleting
                          >
                            {deletingId === note.$id ? "Deleting..." : "Delete"}
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
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestUploads;
