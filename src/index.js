import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );

  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      history: history.concat([{
        squares:squares,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
    });


    let status;
    if(winner){
      status = 'Winner:' + winner;
    }else{
      status = 'Next player:' + (this.state.xIsNext ? 'X' : '0'); 
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//=============================================
//Count Up

class CountApp extends React.Component{
  constructor(){
    super()
    this.state={
      count:0,
    }
  }

  puls(){
    this.setState({count: this.state.count + 1})
  }

  minus(){
    this.setState({count: this.state.count - 1})
  }



  render(){
    return(
      <div>
        <h1>カウントApp</h1>
        <p>{this.state.count}</p>
        <div>
          <button onClick={() => this.puls()}>+</button>
          <button onClick={() => this.minus()}>-</button>
        </div>
      </div>
    );
  }
}

//================================
//ToDoアプリ
class TodoApp extends React.Component{
  constructor(){
    super();
    this.state={
      todoList:[],
      value: "",
    }
  }

  onChange(e){
    this.setState({value: e.target.value})
  }

  add(){
    this.setState({
      todoList: this.state.todoList.concat(this.state.value),
      value: "",
    })
    console.log(this.state.value);
  }


  render(){
    const todoListNode = this.state.todoList.map((todo,idx) =>{
      return <li key={idx}>{todo}</li>
    })

    return(
      <div>
        <h1>TODO管理</h1>
        <div>
          <input 
            type="text"
            value={this.state.value}
            onChange={e => this.onChange(e)}
          />
        </div>
        <button onClick={()=>this.add}>追加</button>
        <ul>
          {todoListNode}
        </ul>
      </div>
    );
  }
}


//=================================


ReactDOM.render(
  <CountApp />,
  document.getElementById('hello')
);

ReactDOM.render(
  <TodoApp />,
  document.getElementById('toDo')
);
