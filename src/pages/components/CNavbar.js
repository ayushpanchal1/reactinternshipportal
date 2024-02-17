import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"
import { useSignOut, useAuthUser } from 'react-auth-kit';

function CNavbar() {
  const Session = localStorage.getItem('SessionInfo');
  const signOut = useSignOut();
  const navigate = useNavigate();

  function logout() {
    signOut();
    localStorage.removeItem('SessionInfo');
    navigate("/Login");
  }

  return (
    <Container>
      <Navbar className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Navbar.Brand href="/" style={{ paddingLeft: "10px" }}>
          <img
            src="https://president.somaiya.edu.in/assets/oop/img/Homepage/Somaiya-logo-01.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ backgroundColor: "white" }}
          ></img>
          &nbsp;Internship Management Portal
        </Navbar.Brand>
        <Nav className="me-auto">
          {!Session && (
            <>
              <li className="nav-item">
                <Link to={"/Login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/Signup"} className="nav-link">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/AdminLogin"} className="nav-link">
                  AdminLogin
                </Link>
              </li>
            </>) }
          {Session === 'user' && (<><li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
            <li className="nav-item">
              <Link to={"/submitinternship"} className="nav-link">
                Submit
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/notifications"} className="nav-link">
                Notifications
              </Link>
            </li></>)}
            {Session === 'admin' && (<><li className="nav-item">
            <Link to={"/admindashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminsearch"} className="nav-link">
              Manage
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminpostnotifs"} className="nav-link">
              Post
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/adminnotifs"} className="nav-link">
              Notifications
            </Link>
          </li></>)}
        </Nav>
        <Nav>
        {Session && (
        <><li className="nav-item">
            <button onClick={logout} className="nav-link">
              Sign out
            </button>
          </li></>)}
        </Nav>
      </Navbar>
    </Container>
  )
}

export default CNavbar;