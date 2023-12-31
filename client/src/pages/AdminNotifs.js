//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';

function App() {
    const auth = useAuthUser()
    const Email = auth().email
    const Session = auth().session

    const [firstname, setFirstName] = useState('') 
    const [lastname, setLastName] = useState('')
    var [notifs, setnotifs] = useState('')
    //console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      if(Session==="user"){
        logout()
      }
      fetchnotif()
    },[]);


      const fetchnotif = () => {
        fetch("http://localhost:1337/api/getnotifs")
          .then(response => {
            return response.json()
          })
          .then(data => {
            data.reverse()
            setnotifs(data)
          })
      }


  return (
    
    <div>
      <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Link to="/admindashboard" className="navbar-brand">
          &nbsp;Internship Management Portal
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
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
          </li>
          <li className="nav-item">
            <button onClick={logout} className="nav-link">
              Sign out
            </button>
          </li>
        </div>
      </nav>
      <br/><br/><br/><br/>
      <Container>
        <Row className="d-flex">
          <Col md={8} lg={12} xs={12}>
          <div>
            {notifs.length > 0 && (
              <ul className='list-unstyled'>
                {notifs.map(notif => (
                  <li><div className="card shadow">
                    <div className="border border-2 border-primary"></div>
                  <div className="card-header">
                    Post by {notif.firstname} {notif.lastname}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><b>{notif.title}</b></h3>
                    <p className="card-text">{notif.info}</p>
                    <a href={notif.link} className="btn btn-primary">Learn More</a>
                  </div>
                </div>
                <br/></li>
                ))}
                </ul>
            )}
          </div>
          
          </Col>
          
        </Row>
      </Container>
    </div>
  );
}

export default App;

