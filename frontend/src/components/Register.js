import React, {Component} from "react";
import {Form,Button, Col, Row} from 'react-bootstrap';


class Register extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
          email: "",
          password: "",
          lastName: "",
          firstName: "",
          age: "",
          number: ""
        };
    }
    handleEmailChange = (e) => {
      this.setState({email: e.target.value});
    }
    handlePasswordChange =(e) => {
      this.setState({password: e.target.value});
    }
    handlelastNameChange = (e) => {
      this.setState({lastName: e.target.value});
    }
    handlefirstNameChange =(e) => {
      this.setState({firstName: e.target.value});
    }
    handlefirstNameChange =(e) => {
      this.setState({firstName: e.target.value});
    }
    handleAgeChange =(e) => {
      this.setState({age: e.target.value});
    }
    handleNumberChange =(e) => {
      this.setState({number: e.target.value});
    }

    handleSubmit = (e) => {
      //e.preventDefault();
      console.log("submit", this.state.email);
      //to do !!! api call
  
    }
    render() {
      return (
        <div>
          <Row>
          <Col></Col>
          <Col xs={6}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter your First name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your Last name" />
              </Form.Group>
            </Form.Row>
          

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Enter your Age" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter your number" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" href="login">
              Submit
            </Button>
            
          </Form>
          </Col>
            <Col></Col>
            </Row>
      </div>
      );
    }
  }
  
  export default Register;