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
          number: "",
          showError: false 
        };
    }
    //Event trigger 
    handleEmailChange = (e) => {
      this.setState({email: e.target.value});
    }
    handlePasswordChange =(e) => {
      this.setState({password: e.target.value});
    }
    handleLastNameChange = (e) => {
      this.setState({lastName: e.target.value});
    }
    handleFirstNameChange =(e) => {
      this.setState({firstName: e.target.value});
    }
    handleAgeChange =(e) => {
      this.setState({age: e.target.value});
    }
    handleNumberChange =(e) => {
      this.setState({number: e.target.value});
    }

    handleSubmit = (e) => {
      e.preventDefault();
      //Error Handling
      if (this.state.number.length !== 10 || this.state.mail === "" || this.state.password === "" || this.state.firstName === "" ||
      this.state.number === "" || this.state.lastName === "" || this.state.age === "") {
        this.setState({showError: true});       
      } else {
        console.log("submit", this.state.email);
        //to do !!! api call
        this.props.history.push("login");
        const init = {
          method: 'POST',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: `username=${this.state.email}&password=${this.state.password}&first_name=${this.state.firstName}&last_name=${this.state.lastName}&phone_number=${this.state.number}&dob=${this.state.age}`
          } 
          fetch("http://0.0.0.0:8080/register", init)
              .then(r => r.json())
              .then((res) => {
                  if (res.status === "success") {
                      console.log("success");
                  }
              })
      }
      
  
    }
    render() {
      return (
        <div>
          {this.state.showError && <div color="red" className="error-message">Oops! The field can not be empty and the number must be 10 digits!</div>}
          <Row>
          <Col></Col>
          <Col xs={6}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="Enter your First name" onChange={this.handleFirstNameChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your Last name"  onChange={this.handleLastNameChange}/>
              </Form.Group>
            </Form.Row>
          

            <Form.Row>
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Age</Form.Label>
                <input type="date" placeholder="Enter your Age" onChange={this.handleAgeChange}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter your number" onChange={this.handleNumberChange}/>
              </Form.Group>
            </Form.Row>

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