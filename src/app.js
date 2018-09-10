import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './scss/main.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: 'http://localhost:4000/',
      dataType: 'jsonp'
    })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
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
