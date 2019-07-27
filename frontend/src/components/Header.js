import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import Login from "./Login";
import Register from "./Register";


const Header = (props) => {
    return (
    <Router>
        <main>
            <Navbar bg="light" variant="light">
            <Navbar.Brand href="home">Hackerspace</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="booking">Booking</Nav.Link>
            </Nav>
            </Navbar>
            <br>
            </br>
            <Switch>

              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />

            </Switch>
            
        </main>
    </Router>
        
       
   
        
    )
}

export default Header;