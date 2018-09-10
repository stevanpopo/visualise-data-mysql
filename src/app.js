import React from 'react';
import ReactDOM from 'react-dom';
// import './scss/main.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    // console.log(this.state);
    return (
      <main>
        <h1>Visualize Data React</h1>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
