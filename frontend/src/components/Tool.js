import Tool from '../element/ToolCard.js';
import React from "react";
import CardColumns from "react-bootstrap/CardColumns"

export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        fetch(`0.0.0.0:8080/product/${this.props.id}`)
            .then(r => r.json())
            .then(r => {
                console.log(r);
            })

    }
    render(){
        return (
            <h1>{this.props.name}</h1>

        );
    }
}