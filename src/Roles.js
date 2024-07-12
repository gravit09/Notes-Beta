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
  faHeart,
  faMagnifyingGlass,
  faBars,
  faArrowsLeftRight,
  faChartLine,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function Roles() {
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

          <h1>Join Our College Notes Team!</h1>

          <p>Hello Future Team Member,</p>

          <p>
            We're excited to invite you to be part of our college notes team.
            We're dedicated team of students trying to make academic life easier
            for everyone. With your help, we can do even more!
          </p>

          <h2>Why join us?</h2>

          <ul>
            <li>
              <strong>Help Your Peers:</strong> Contribute to your college
              community by sharing notes and assignments, helping fellow
              students succeed.
            </li>
            <li>
              <strong>Connect & Grow:</strong> Network with like-minded
              students, passionate about education and personal growth.
            </li>
            <li>
              <strong>Leave a Legacy:</strong> Make a lasting impact on future
              students – your work will help them excel.
            </li>
          </ul>

          <h2>How can you help?</h2>

          <ul>
            <li>
              <strong>Share Notes & Assignments:</strong> Provide the latest
              assignments and notes to support your peers.
            </li>
            <li>
              <strong>Create Content:</strong> Share your insights through
              articles, guides, and tutorials related to academics or student
              life.
            </li>
            <li>
              <strong>Manage Our Website:</strong> If you're tech-savvy, help
              maintain and improve our platform.
            </li>
            <li>
              <strong>Promote & Engage:</strong> Spread the word about our
              website and engage more students through social media and events.
            </li>
          </ul>

          <h2>Ready to join?</h2>

          <p>
            If you're interested, contact us at{" "}
            <a href="mailto:thedevelopers404@gmail.com">
              thedevelopers404@gmail.com
            </a>
            . Let's chat about how you can make a difference on our team.
          </p>

          <p>
            We're looking forward to welcoming you and working together to
            support our college community. Together, we can create a fantastic
            resource for academic success!
          </p>

          <p>
            Thanks for considering this opportunity. We can't wait to have you
            onboard!
          </p>

          <p>Warm regards,</p>

          <p>The Devs</p>
        </div>
      </div>
    </div>
  );
}

export default Roles;
