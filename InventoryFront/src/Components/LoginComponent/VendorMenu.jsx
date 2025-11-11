import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../MenuTheme.css"; 

const VendorMenu = () => {
  return (
    <div className="menu-container">
      {/* HEADER */}
      <div className="menu-header vendor-header">
        <h1>Vendor Menu</h1>
      </div>

      {/* NAVBAR */}
      <Navbar expand="lg" className="menu-navbar">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ShowSingleUser" className="logout-link">
              <b>Show User Details</b>
            </Nav.Link>
            <Nav.Link href="/" className="logout-link">
              <b>Logout</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default VendorMenu;
