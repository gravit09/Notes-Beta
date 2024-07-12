import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { notesData } from "./App";
import "./css/sb-admin-2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFlaskVial,
  faFileInvoice,
  faAddressCard,
  faHeart,
  faMagnifyingGlass,
  faBars,
  faArrowsLeftRight,
  faChartLine,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { setApiState } = useContext(notesData);
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
    <div>
      <title>notesj - Dashboard</title>

      <div id="wrapper" className={hamburger}>
        <ul className={style} id="accordionSidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon">
              <img src="./img/netflix (1).png" />
            </div>
            <div className="sidebar-brand-text mx-3 main-title">notesj</div>
          </a>
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
            <Link to="/Soon" style={{ textDecoration: "none" }}>
              <a className="nav-link">
                <FontAwesomeIcon icon={faListCheck} />
                <span>New Uploads</span>
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
          <li className="nav-item active" onClick={() => setApiState("PYQ")}>
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
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800"> Btech Dashboard</h1>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <div className="row">
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Maths")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-primary text-white shadow"
                            value="Maths"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Maths
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("python")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-success text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Python
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-info text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("C programming")}
                          >
                            <div className="card-body">
                              C programming
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-warning text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("Physics")}
                          >
                            <div className="card-body">
                              Physics
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-danger text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("chemistry")}
                          >
                            <div className="card-body">
                              Chemistry
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-secondary text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("English")}
                          >
                            <div className="card-body">
                              English
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card text-white shadow elec"
                            style={{ backgroundColor: "#D8AED3" }}
                          >
                            <div
                              className="card-body"
                              style={{ cursor: "pointer" }}
                              onClick={() => setApiState("Electrical")}
                            >
                              Electrical engineering
                              <div />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-dark text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("Electronics")}
                          >
                            <div className="card-body">
                              Electronics engineering
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col-lg-4 mb-4">
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-success text-white shadow"
                            style={{ cursor: "pointer" }}
                            onClick={() => setApiState("Mechanical")}
                          >
                            <div className="card-body">
                              Basic Mechanical engineering
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="h-30 d-flex align-items-center justify-content-center">
                      <p className="love">
                        Made with{" "}
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ color: "#e74a3b" }}
                        />{" "}
                        in GLA University
                      </p>
                    </div>
                  </div>
                  <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
