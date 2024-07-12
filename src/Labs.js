import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { notesData } from "./App";
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

function Labs() {
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
            <a className="nav-link">
              <FontAwesomeIcon icon={faFlaskVial} />
              <span>Practicals &amp; Lab</span>
            </a>
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
                        onClick={() => setApiState("Physics Lab")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-warning text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Physics Lab
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Practical Chemistry")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-danger text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Chemistry Lab
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("English Lab")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-secondary text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              English Lab
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Electrical Lab")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div className="card bg-light text-black shadow">
                            <div
                              className="card-body"
                              style={{ cursor: "pointer" }}
                            >
                              Electrical engineering Lab
                              <div className="text-black-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Electronics Lab")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-dark text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Electronics engineering Lab
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Mechanical Lab")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-success text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Basic Mechanical engineering Lab
                              <div className="text-white-50 small" />
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div
                        className="col-lg-4 mb-4"
                        onClick={() => setApiState("Engineering drawing")}
                      >
                        <Link to="/subject" style={{ textDecoration: "none" }}>
                          <div
                            className="card bg-info text-white shadow"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card-body">
                              Engineering drawing Lab
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

export default Labs;
