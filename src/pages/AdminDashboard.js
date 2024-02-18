
import React from 'react'
import { Col, Button, Row, Container, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from './components/CNavbar';
import AdminProfile from './components/AdminProfile';

function App() {
  const auth = useAuthUser()
  const Email = auth().email
  const Session = auth().session

  const [notifs, setnotifs] = useState('')
  // console.log(Session)

  const [titledelnotif, settitledelnotif] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signOut = useSignOut();
  const navigate = useNavigate();

  function logout() {
    signOut();
    navigate("/Login");
    localStorage.removeItem("SessionInfo");
    localStorage.removeItem("SessionEmail");
  }

  useEffect(() => {
    //Runs on every render
    getmynotifs()
    if (Session === "user") {
      logout()
    }
  }, []);


  async function getmynotifs() {
    //const stuname = `${FirstName} ${LastName}`
    const response = await fetch('http://localhost:1337/api/getmynotifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email
      }),
    })

    const data = await response.json()

    data.reverse()

    console.log(data)

    setnotifs(data)



  }

  async function deletemynotifs(thetitle) {
    console.log(thetitle)



    const response = await fetch('http://localhost:1337/api/deletemynotifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email,
        thetitle,
      }),
    })

    const data = await response.json()
    getmynotifs()
    handleClose()

  }


  return (
    <div>
      <CNavbar />
      <AdminProfile />

      <br /><br />

      <Container>
        <Col md={8} lg={12} xs={12}>
          <h1><b>Notifications posted by you</b></h1>
        </Col>
        <div className="border border-2 border-primary"></div>
        <br />
        <Row className="d-flex">
          <Col md={8} lg={12} xs={12}>

            <div>
              {notifs.length > 0 && (
                <ul className='list-unstyled'>
                  {notifs.map(notif => (
                    <li><div className="card shadow">
                      {/*<div className="border border-2 border-primary"></div>*/}
                      <div className="card-header">
                        Post by You
                      </div>
                      <div className="card-body">
                        <h3 className="card-title"><b>{notif.title}</b></h3>
                        <p className="card-text">{notif.info}</p>
                        <div className="btn btn-primary" onClick={() => { handleShow(); settitledelnotif(notif.title); }}>delete</div>
                      </div>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title style={{color: "#802121"}}>Delete Internship report</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button variant="primary" onClick={() => { deletemynotifs(titledelnotif) }}>
                            Yes, Proceed
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
