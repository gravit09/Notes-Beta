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
  faFilePen,
  faArrowsLeftRight,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Assignement() {
  const { setApiState } = useContext(notesData);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTrendingNotes() {
      try {
        const response = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_USER_AssignmentCollection,
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
        process.env.REACT_APP_USER_AssignmentCollection,
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
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={handleClick}
            ></button>
          </div>
          <hr className="sidebar-divider d-none d-md-block" />
        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
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
                    className="form-control bg-light border-0 small"
                    placeholder="Search for Notes"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </div>
                </div>
              </form>
            </nav>
            <div className="container-fluid">
              <div className="row">
                {filteredData.map((note) => {
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
                          <button
                            className="btn btn-primary"
                            onClick={() => handleUpvote(note.$id)}
                          >
                            <FontAwesomeIcon icon={faArrowUp} /> {note.Upvotes}
                          </button>
                        </div>
                        <div className="card-body">
                          <div className="mb-2">
                            <button
                              className="btn btn-success mr-2"
                              onClick={() => handleView(note.Content)}
                            >
                              View
                            </button>
                            <button
                              className="btn btn-info"
                              onClick={() => handleDownload(note.Content)}
                            >
                              Download
                            </button>
                          </div>
                          <p>Subject : {note.Subject}</p>
                          <p className="text-muted">
                            Uploaded by: {note.Author}
                          </p>
                          <p className="text-muted">
                            Uploaded on: {uploadDate.toDateString()}
                          </p>
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

export default Assignement;
