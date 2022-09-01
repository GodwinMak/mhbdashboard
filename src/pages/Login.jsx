import React, {useState} from 'react'
import {Container, Row, Col, Form, Button} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"

import ImageChange from '../component/ImageChange';

import axios from 'axios'

import { loginRoute } from '../utils/APIRoutes';


const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleValidation = () => {
    const { password, email, } = values;
    if (password === "") {
      toast.error("Email and password is required", toastOptions)
      return false;
    } else if (email.length === "") {
      toast.error(
        "Email and password is required", toastOptions
      );
      return false;
    }
    return true
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
        email,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('EM-app-user', JSON.stringify(data.user))
        navigate("/dashboard");
      }
    };
  }

  return (
    <>
      <Container style={{ position: "relative", top: "100px" }}>
        <Row>
          <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
            <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={(event) => handleLogin(event)}>
              <h1>Login</h1>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  required
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  required
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Button variant="success" type="submit" style={{ position: "relative", top: "10px" }}>Login</Button>
              <div className="py-4">
                <p className="">
                  Don't have an account ? <Link to="/signup">Signup</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5}>
            <ImageChange />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  )
}

export default Login