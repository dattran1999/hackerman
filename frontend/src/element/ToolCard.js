import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BrowserRouter as Route, Link} from 'react-router-dom';
import Tool from "../components/Tool";



export default class ToolCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card style={{ width: '300px', margin: '20px' }} className="p-3">
                <Card.Body>
                    <Card.Img variant="top" src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Electrical/Electrical_Tools_and_Accessories/electrical-screwdrivers.jpg" />
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text text="info">Price: {this.props.price}</Card.Text>
                    <Card.Text text="info">Location: {this.props.location}</Card.Text>
                    <Card.Text text="info">Tool Type: {this.props.type}</Card.Text>
                </Card.Body>
                <Link to={`/product/${this.props.id}`}> <Button variant="primary">Rent</Button> </Link>

                <Route path="/product/:id" component={Tool} />
            </Card>
        );
    }
}