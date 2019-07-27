import React, {Component} from "react";
import {Form,Button, Col, Row} from 'react-bootstrap';


class Register extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: ""
        };
    }
    
    validateForm() {
        const init = {
            method: 'POST',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `username=${this.state.email}&password=${this.state.password}`
        } 
        fetch("http://0.0.0.0:8080/register", init)
            .then(r => r.json())
            .then((res) => {
                if (res.status === "success") {
                    console.log("success");
                }
            })
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange =(e) => {
        this.setState({password: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
      return (
          <div>
            <Row>
            <Col></Col>
            <Col xs={6}>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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