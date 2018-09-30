import React from "react";
import { Button } from "react-bootstrap";

var $ = require("jquery");

export default class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { greeting: "Hello, " + this.props.name + "!" };
    // This binding is necessary to make `this` work in the callback
    this.getPythonHello = this.getPythonHello.bind(this);
  }

  getPythonHello() {
    $.ajax({
      type: "GET",
      url: "http://localhost:5000/hello"
    })
      .done(data => {
        console.log("Data: " + data);
        this.personaliseGreeting(data);
      })
      .fail((xhr, textStatus, errorThrown) => {
        alert(xhr.responseText);
        alert(textStatus);
      });
  }

  personaliseGreeting(greeting) {
    this.setState({ greeting: greeting + ", " + this.props.name + "!" });
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <hr />
        <Button bsSize="large" bsStyle="danger" onClick={this.getPythonHello}>
          Say Hello!
        </Button>
      </div>
    );
  }
}
