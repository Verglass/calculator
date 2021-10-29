import React from "react";
import ReactDOM from "react-dom";
import "./index.css"


function Button(props) {
  return (
    <button className="calc-btn" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNumber: 0,
      previousNumber: 0,
      currentOperation: null,
      isStatic: true,
    };
  }

  updateNumber(i) {
    if (this.state.isStatic) {
      this.setState({
        currentNumber: i,
        isStatic: false,
      });
    } else {
      this.setState({
        currentNumber: (this.state.currentNumber*10 + i),
      });
    }
  }

  operation(i) {
    this.setState({
      previousNumber: this.state.currentNumber,
      currentOperation: i,
      isStatic: true,
    });
  }

  sum() {
    if (this.state.currentOperation) {
      if (this.state.currentOperation === "+") {
        this.setState({
          currentNumber: this.state.previousNumber + this.state.currentNumber,
          previousNumber: 0,
          currentOperation: null,
          isStatic: false,
        });
      } else if (this.state.currentOperation === "-") {
        this.setState({
          currentNumber: this.state.previousNumber - this.state.currentNumber,
          previousNumber: 0,
          currentOperation: null,
          isStatic: false,
        });
      } else if (this.state.currentOperation === "*") {
        this.setState({
          currentNumber: this.state.previousNumber * this.state.currentNumber,
          previousNumber: 0,
          currentOperation: null,
          isStatic: false,
        });
      } else if (this.state.currentOperation === "/") {
        this.setState({
          currentNumber: this.state.previousNumber / this.state.currentNumber,
          previousNumber: 0,
          currentOperation: null,
          isStatic: false,
        });
      }
    }
  }

  handleClick(i) {
    if (i === "=") {
      this.sum();
    } else if (Number.isInteger(i)) {
      this.updateNumber(i);
    } else {
      this.operation(i);
    }
  }
  
  renderBtn(i) {
    return (
      <Button value={i} onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <small>{this.state.previousNumber}</small>
        <h1>{this.state.currentNumber}</h1>
        <div>
          {this.renderBtn(1)}
          {this.renderBtn(2)}
          {this.renderBtn(3)}
          {this.renderBtn("+")}
        </div>
        <div>
          {this.renderBtn(4)}
          {this.renderBtn(5)}
          {this.renderBtn(6)}
          {this.renderBtn("-")}
        </div>
        <div>
          {this.renderBtn(7)}
          {this.renderBtn(8)}
          {this.renderBtn(9)}
          {this.renderBtn("*")}
        </div>
        <div>
          {this.renderBtn(0)}
          {this.renderBtn("=")}
          {this.renderBtn("/")}
        </div>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <Calculator />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
