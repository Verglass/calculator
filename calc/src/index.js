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
      currentDecimal: 0,
      previousDecimal: 0,
      currentOperation: null,
      isStatic: true,
    };
  }

  updateNumber(i) {
    if (this.state.isStatic) {
      this.setState({
        currentNumber: i,
        currentDecimal: 0,
        isStatic: false,
      });
    } else if (this.state.currentDecimal !== 0) {
      this.setState({
        currentNumber: (this.state.currentNumber * 10) + i,
        currentDecimal: this.state.currentDecimal + 1,
      });
    } else {
      this.setState({
        currentNumber: (this.state.currentNumber * 10) + i,
      });
    }
  }

  decimal() {
    if (this.state.currentDecimal === 0) {
      if (this.state.isStatic) {
        this.setState({
          currentNumber: 0,
          currentDecimal: 1,
          isStatic: false,
        });
      } else {
        this.setState({
          currentDecimal: 1,
        });
      }
    }
  }

  operation(i) {
    this.setState({
      previousNumber: this.state.currentNumber,
      previousDecimal: this.state.currentDecimal,
      currentOperation: i,
      isStatic: true,
    });
  }

  add(i) {
    if (this.state.previousDecimal === 0 && this.state.currentDecimal === 0) {
      this.setState({
        currentNumber: this.state.previousNumber + this.state.currentNumber * i,
      });
    } else if (this.state.previousDecimal === 0 && this.state.currentDecimal > 1) {
      this.setState({
        currentNumber: this.state.previousNumber * (10 ** (this.state.currentDecimal - 1)) + this.state.currentNumber * i,
      });
    } else if (this.state.currentDecimal === 0 && this.state.previousDecimal > 1) {
      this.setState({
        currentNumber: this.state.previousNumber + this.state.currentNumber * (10 ** (this.state.previousDecimal - 1)) * i,
        currentDecimal: this.state.previousDecimal,
      });
    } else {
      let diff = this.state.previousDecimal - this.state.currentDecimal;

      if (diff > 0) {
        this.setState({
          currentNumber: this.state.previousNumber + this.state.currentNumber * (10 ** diff) * i,
          currentDecimal: this.state.previousDecimal,
        });
      } else {
        this.setState({
          currentNumber: this.state.previousNumber * (10 ** Math.abs(diff)) + this.state.currentNumber * i,
        });
      }
    }
  }

  multiply() {
    this.setState({
      currentNumber: this.state.previousNumber * this.state.currentNumber,
      currentDecimal: this.state.previousDecimal + this.state.currentDecimal,
    });
  }

  divide() {
    let diff = this.state.currentDecimal - this.state.previousDecimal;

    if (diff > 0) {
      this.setState({
        currentNumber: (this.state.previousNumber / this.state.currentNumber) * (10 ** (diff - 1)),
        currentDecimal: 0,
      });
    } else {
      this.setState({
        currentNumber: this.state.previousNumber / this.state.currentNumber,
        currentDecimal: Math.abs(diff),
      });
    }
  }

  sum() {
    if (this.state.currentOperation) {
      if (this.state.currentOperation === "+") {
        this.add(1);
      } else if (this.state.currentOperation === "-") {
        this.add(-1);
      } else if (this.state.currentOperation === "*") {
        this.multiply();
      } else if (this.state.currentOperation === "/") {
        this.divide();
      }

      this.setState({
        previousNumber: 0,
        previousDecimal: 0,
        currentOperation: null,
        isStatic: true,
      });
    }
  }

  handleClick(i) {
    if (i === "=") {
      this.sum();
    } else if (i === ".") {
      this.decimal();
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
    let currentNumber = this.state.currentNumber;
    let previousNumber = this.state.previousNumber;

    if (this.state.currentDecimal > 0) {
      currentNumber = currentNumber / (10 ** (this.state.currentDecimal - 1));

      if (currentNumber === 0) {
        currentNumber = currentNumber.toFixed(this.state.currentDecimal)
      }
    }

    if (this.state.previousDecimal > 0) {
      previousNumber = previousNumber / (10 ** (this.state.previousDecimal - 1));

      if (previousNumber === 0) {
        previousNumber = previousNumber.toFixed(this.state.currentDecimal)
      }
    }

    return (
      <div>
        <small>{previousNumber}</small>
        <h1>{currentNumber}</h1>
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
          {this.renderBtn("=")}
          {this.renderBtn(0)}
          {this.renderBtn(".")}
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
