import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { notesData } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./About.css";
import {
  faHouse,
  faFlaskVial,
  faFileInvoice,
  faAddressCard,
  faMagnifyingGlass,
  faBars,
  faFilePen,
  faFileLines,
  faArrowsLeftRight,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function About() {
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
            <a className="nav-link">
              <FontAwesomeIcon icon={faAddressCard} />
              <span>About us</span>
            </a>
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
              <div class="responsive-container-block outer-container">
                <div class="responsive-container-block inner-container">
                  <p class="text-blk heading-text">Our Team</p>
                  <p class="text-blk text-2xl">
                    We are a team of computer science students passionate about
                    web development & app development if you have any doubt
                    regarding coding or want to Contribute to this project feel
                    free to contact us & any feedback related to website will be
                    appreciated.
                  </p>
                  <div class="responsive-container-block cards-container">
                    <div class="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
                      <p class="text-blk name">Gravit</p>
                      <p class="text-blk position">Full-stack Developer</p>
                      <img class="team-member-image" src="./img/gravit.jpeg" />
                      <a href="https://github.com/gravit09" target="_blank">
                        <img
                          class="github-icon"
                          src="https://cdn2.iconfinder.com/data/icons/social-media-iconez/64/GitHub-1024.png"
                        />
                      </a>
                    </div>
                    <div class="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
                      <p class="text-blk name">Athrav Chauhan</p>
                      <p class="text-blk position">Frontend Developer</p>
                      <img class="team-member-image" src="./img/ATHRAV.jpg" />
                      <a
                        href="https://twitter.com/AtharvC67908213"
                        target="_blank"
                      >
                        <img
                          class="social-media-icon"
                          src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg"
                        />
                      </a>
                      <a
                        href="https://www.instagram.com/utopian.1845/"
                        target="_blank"
                      >
                        <img
                          class="social-media-icon"
                          src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"
                        />
                      </a>
                    </div>

                    <div class="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
                      <p class="text-blk name">Eshan Sexana</p>
                      <p class="text-blk position">Marketing Expert</p>
                      <img class="team-member-image" src="./img/Eshan.jpg" />
                      <a
                        href="https://www.instagram.com/eshansaxenaofficial/"
                        target="_blank"
                      >
                        <img
                          class="social-media-icon"
                          src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"
                        />
                      </a>
                    </div>

                    <div class="responsive-cell-block wk-desk-4 wk-ipadp-4 wk-mobile-12 wk-tab-12 card-container">
                      <p class="text-blk name">Muskan Kapoor</p>

                      <p class="text-blk position">Notes Provider</p>
                      <img class="team-member-image" src="./img/Muskan.jpg" />
                      <a
                        href="https://www.instagram.com/_smileymuskan_/"
                        target="_blank"
                      >
                        <img
                          class="social-media-icon"
                          src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
