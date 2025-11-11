import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../../MenuTheme.css"; // ✅ single shared CSS file

const ManagerMenu = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>Manager Menu</h1>
      </div>

      <Navbar expand="lg" className="menu-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={<span><b>SKU</b></span>} id="sku-dropdown">
              <NavDropdown.Item href="/SKURepo">SKU List</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<span><b>Product</b></span>} id="product-dropdown">
              <NavDropdown.Item href="/ProdRepo">Product List</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<span><b>Stock</b></span>} id="stock-dropdown">
              <NavDropdown.Item href="/TransRepo/OUT">Stock Issued</NavDropdown.Item>
              <NavDropdown.Item href="/TransRepo/IN">Stock Purchased</NavDropdown.Item>
            </NavDropdown>

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

export default ManagerMenu;
