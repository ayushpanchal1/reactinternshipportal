
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from 'react-auth-kit';


function App() {
  const signIn = useSignIn();
  const navigate = useNavigate();

	const [Email, setEmail] = useState('')
	const [Password, setPassword] = useState('')

  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/adminlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email,
        Password,
      }),
    })

    const data = await response.json()

    console.log(data)
    
    if (data.token !== false){
      signIn({
      token: data.token,
      expiresIn: 3600,
      tokenType: "Bearer",
      authState: {email: Email, session: "admin"},
      });
      alert("Admin Log in successful")
      navigate("/admindashboard")
    } else {
      alert("Log in credentials are incorrect! Sign up if you do not have an account")
    }
    

  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          &nbsp;Internship Management Portal
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/AdminLogin"} className="nav-link">
              AdminLogin
            </Link>
          </li>
        </div>
      </nav>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Admin Log in</h2>
                  <div className="mb-3">
                    <Form onSubmit={loginUser}>

                      <Form.Group className="mb-3" controlId="Email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" value="Log in" type="submit">
                          Log In
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
