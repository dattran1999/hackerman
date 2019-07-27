import React, {Component} from "react";
import {Form,Button, Col, Row} from 'react-bootstrap';


class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: ""
        };
    }
    
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange =(e) => {
        this.setState({password: e.target.value});
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submiy", this.state.email)
  
    
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
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check me out" />
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
  
  export default Login;