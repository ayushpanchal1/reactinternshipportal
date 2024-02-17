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

    const [Title, setTitle] = useState('')
    const [Info, setInfo] = useState('')
	  const [lLink, setlLink] = useState('')

    const [firstname, setFirstName] = useState('') 
    const [lastname, setLastName] = useState('')
    console.log(Email)

    const signOut = useSignOut();
    const navigate = useNavigate();

    async function postNotif(event) {
      event.preventDefault()
  
      const response = await fetch('http://localhost:1337/api/postnotif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email,
          firstname,
          lastname,
          Title,
          Info,
          lLink,
        }),
      })
  
      const data = await response.json()
  
      console.log(data)
      
      if (data.error){
        alert("Error ocurred while posting!")
      } else {
        alert("Post successful!")
      }
      
  
    }

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      getadmindata()
      if(Session==="user"){
        logout()
      }
    });

    async function getadmindata() {
      const response = await fetch('http://localhost:1337/api/getadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email
      }),
    })

    const data = await response.json()

    console.log(data)

    setFirstName(data.firstname)
    setLastName(data.lastname)
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

      <br/><br/>

      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={10} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Enter details about your post</h2>
                  <div className="mb-3">
                    <Form onSubmit={postNotif}>
                      <Form.Group className="mb-3" controlId="Title">
                        <Form.Label className="text-center">
                          Title
                        </Form.Label>
                        <Form.Control value={Title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Info">
                        <Form.Label className="text-center">
                          Information
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} value={Info} onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Enter Information body" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="lLink">
                        <Form.Label className="text-center">
                          Link
                        </Form.Label>
                        <Form.Control value={lLink} onChange={(e) => setlLink(e.target.value)} type="url" placeholder="Enter Link to learn more" />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" value="submitnotif" type="submit">
                          Post
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
