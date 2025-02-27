import { Link } from "react-router-dom";
import "./css/sb-admin-2.min.css";
import { useState, useEffect, useContext } from "react";
import { notesData } from "./App";
import styles from "./card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFlaskVial,
  faFileInvoice,
  faAddressCard,
  faMagnifyingGlass,
  faBars,
  faAngleUp,
  faFilePen,
  faFileLines,
  faArrowsLeftRight,
  faCode,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Subject() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const { apiState, setApiState } = useContext(notesData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbzemxKZ5H5ui3MQS1_D6j95lPGghTm81e3N8Hk1lAoCz7jSBEA4Se5m7AuLNLfJfW_GvA/exec?subject=${apiState}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.log("error in trad api", err);
      }
    };

    fetchData();
  }, [apiState]);

  console.log(data);

  const filteredData = filter
    ? data.filter((note) => {
        return note.title.toLowerCase().includes(filter.toLowerCase());
      })
    : data;

  console.log(filteredData);

  // Toggle styling
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const [hamburger, setHamburger] = useState("");
  const hamChange = () => {
    if (hamburger == "") {
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
      style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <div id="wrapper" className={hamburger}>
      <ul className={style} id="accordionSidebar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon rotate-n-15">
              <img src="./img/netflix (1).png" alt="Logo" />
            </div>
            <div className="sidebar-brand-text mx-3 main-title">notesj</div>
          </div>
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
        <li
          className="nav-item active"
          onClick={() => setApiState("Assignement")}
        >
          <Link to="/code" style={{ textDecoration: "none" }}>
            <a className="nav-link">
              <FontAwesomeIcon icon={faCode} />
              <span>Code Resources</span>
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
        <div id="content">
          {" "}
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
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setFilter(e.target.value)}
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
            <div id={styles["card-container"]}>
              {data && data.length > 0 ? (
                filteredData.map((item) => (
                  <div className={styles.card} key={item.id}>
                    <h1 className={styles.subject}>{item.subject}</h1>
                    <h2 className={styles.title}>{item.title}</h2>
                    <h3 className={styles.type}>{item.type}</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <a
                        href={item.link}
                        target="_blank"
                        className={styles["download-button"]}
                        rel="noreferrer"
                      >
                        Download
                      </a>
                      <a
                        href={item.view}
                        target="_blank"
                        className="btn btn-info p-3 w-25"
                      >
                        view
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="loading">Loading...</div>
              )}
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <FontAwesomeIcon icon={faAngleUp} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Subject;
