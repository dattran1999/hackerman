import React, {Component} from "react";
import {Form,Button, Col, Row} from 'react-bootstrap';


class Login extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          showError: false
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
        if (this.state.email === "" || this.state.password === "") {
            this.setState({showError: true});       
        } else {
            console.log("submit", this.state.email);
            //to do !!! api call
            this.props.history.push("booking");
            this.props
     
        }
  
    
    }
    render() {
      return (
          <div>
               {this.state.showError && <div color="red" className="error-message">Oops! The field can not be empty!</div>}
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
                    <Form.Check type="checkbox" label="Remember my email" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmit} href ='booking'>
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