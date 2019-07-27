import Tool from '../element/Tool.js';
import React from "react";
import CardDeck from "react-bootstrap/CardDeck"

export default class ToolColumn extends React.Component {
    constructor(props) {
        super(props);
    }
    getTools() {
        let tools = 
            [
                {
                    name: "Screw Driver",
                    price: 900,
                    location: "here",
                    type: "machine"
                }, 
                {
                    name: "Screw Driver",
                    price: 900,
                    location: "here",
                    type: "machine"
                }
            ];
        // fetch('0.0.0.0:8080/tools')
        //     .then(r => r.json())
        //     .then(r => {
        //         tool = r;
        //     })
        return tools.map(
            t => (
                <Tool
                    name={t.name}
                    price={t.price}
                    location={t.location}
                    type={t.type}
                />
            )
        );
        
    }
    render(){
        return (
            <CardDeck>
                {this.getTools()}
            </CardDeck>
        );
    }
}