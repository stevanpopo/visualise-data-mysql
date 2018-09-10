import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bulma';
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

  handleChange = ({ target: {value} }) => {
    this.setState({ selected: value });
  }

  render() {
    console.log(this.state);
    if(!this.state.data) return <h2 className="title is-2">Loading...</h2>;
    return (
      <main>
        <h1>Visualize Data React</h1>

        <div className='control'>
          <div className='select'>
            <select onChange={this.handleChange}>
              <option>Select dropdown</option>
              {Object.keys(this.state.data[0]).map((key, i) =>
                <option key={i}>{key}</option>
              )}
            </select>
          </div>
        </div>

        {this.state.data.map((record, i) =>
          <h3 key={i}>{record.education}</h3>
        )}
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
