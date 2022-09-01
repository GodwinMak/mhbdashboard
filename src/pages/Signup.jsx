import React, {useState} from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import './signup.css'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ImageChange from '../component/ImageChange';
import axios from 'axios'
import { signUpRoute } from '../utils/APIRoutes'




const Signup = () => {
  const navigate = useNavigate();


  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleValidation = () =>{
    const { password, confirmPassword, email, userame} = values;

    if (password !== confirmPassword) {
      toast.error("password and confirm password should be the same", toastOptions)
      return false;
    } else if (password.length <= 5) {
      toast.error(
        "password should be greater than 8 characters", toastOptions)
      return false;
    } else if (email.length === "") {
      toast.error(
        "Email is required", toastOptions)
      return false;
    } else if (userame === "") {
      toast.error(
        " User Name is required", toastOptions)
      return false;
    }
    return true
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    if(handleValidation()){
        const { username, email, password } = values;
      const { data } = await axios.post(signUpRoute, {
        username,
        email,
        password
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('MHB-WEB-DASH', JSON.stringify(data.user))
        navigate("/dashboard");
      }
    }
  }

  return (
   <>
      <Container style={{ position: "relative", top: "40px" }}>
      <Row>
        <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={(event) => handleSignUp(event)}>
            <h1 className="text-center">Create account</h1>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type='text'
                name = 'username'
                placeholder='User Name'
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name= 'email'
                placeholder='Enter Email'
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                name= 'password'
                placeholder='Enter password'
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                name= 'confirmPassword'
                placeholder='Reenter Password'
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
              <Button variant="success" type="submit" style={{ position: "relative", top: "10px" }}>Sign Up</Button>
              <div className="py-4">
                <p className="">
                  Don't have an account ? <Link to="/">Login</Link>
                </p>
              </div>
          </Form>
        </Col>
        <Col md={5}>
          <ImageChange/>
        </Col>
      </Row>
    </Container>
    <ToastContainer />
  </>
  )
}

export default Signup
