import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"


export default class Tool extends React.Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
        console.log(this.props.id);
        let path = '/';
        // this.props.history.push(path);
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
                <Button variant="primary" onClick={this.routeChange}> Rent </Button>
            </Card>
        );
    }
}