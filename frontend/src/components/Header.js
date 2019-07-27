import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import Login from "./Login";
import Register from "./Register";
import Conditional from "./conditional";


const Header = (props) => {

    var isLogging = false
    
    return (
    <Router>
        <main>
            <Navbar bg="light" variant="light">
            <Navbar.Brand href="home">Hackerspace</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
            <Conditional isLogging={isLogging} />
            <Nav.Link href="booking">Booking</Nav.Link>
            </Nav>
            </Navbar>
            <br>
            </br>
            <Switch>

              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/booking' isLogging = {true}/>

            </Switch>
            
        </main>
    </Router>
        
       
   
        
    )
}

export default Header;