import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from './components/CNavbar';

function App() {
  const auth = useAuthUser()
  const Email = auth().email
  const Session = auth().session

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [notifs, setnotifs] = useState('')
  //console.log(Email)

  const signOut = useSignOut();
  const navigate = useNavigate();

  function logout() {
    signOut();
    navigate("/login");
  }

  useEffect(() => {
    //Runs on every render
    getuserdata()
    if (Session === "admin") {
      logout()
    }
    fetchnotif()
    //getnotifs()
  }, []);

  //this works?????
  async function getuserdata() {
    const response = await fetch('http://localhost:1337/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email
      }),
    })

    const data = await response.json()

    setFirstName(data.firstname)
    setLastName(data.lastname)
  }

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
      <CNavbar />
      <Container style={{ marginTop: '100px' }}>
        <Row className="d-flex">
          <Col md={8} lg={12} xs={12}>

            <div>
              {notifs.length > 0 && (
                <ul className='list-unstyled'>
                  {notifs.map(notif => (
                    <li><div className="card shadow">
                      {/*<div className="border border-2 border-primary"></div>*/}
                      <div className="card-header">
                        Post by {notif.firstname} {notif.lastname}
                      </div>
                      <div className="card-body">
                        <h3 className="card-title"><b>{notif.title}</b></h3>
                        <p className="card-text">{notif.info}</p>
                        <a href={notif.link} className="btn btn-primary">Learn More</a>
                      </div>
                    </div>
                      <br /></li>
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