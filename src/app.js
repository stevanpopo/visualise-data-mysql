import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bulma';
import './scss/main.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      selected: 'education'
    };
  }

  getData(arg){
    axios({
      method: 'GET',
      url: `http://localhost:4000/${arg}`,
      dataType: 'jsonp'
    })
      .then(res => {
        // console.log(res);
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentDidMount(){
    // console.log(this.props.match.params.cat);
    axios({
      method: 'GET',
      url: `http://localhost:4000/undefined`,
      dataType: 'jsonp'
    })
      .then(res => {
        this.setState({ keys: res.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = ({ target: {value} }) => {
    this.getData(value);
    this.setState({ selected: value });
  }

  render() {
    console.log(this.state);
    if(!this.state.keys) return <h2 className="title is-2">Loading...</h2>;
    return (
      <main className="container">
        <h1 className="title is-1">Visualize Data React</h1>
        <h3 className="subtitle">Choose a data point to show in the table...</h3>

        <div className='control'>
          <div className='select'>
            <select onChange={this.handleChange}>
              <option>Select dropdown</option>
              {this.state.keys.map((key, i) =>
                <option key={i}>{this.capitalizeFirstLetter(key)}</option>
              )}
            </select>
          </div>
        </div>

        {this.state.data && <table className="table is-striped">
          <thead>
            <tr>
              <th>#</th>
              <th className="col-2">{this.capitalizeFirstLetter(this.state.selected)}</th>
              <th>Count</th>
              <th>Average Age</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.data.map((record, i) =>
              <tr key={i}>
                <td>{i}</td>
                <td className="col-2">{record[this.state.selected]}</td>
                <td>{record.count}</td>
                <td>{record.average_age}</td>
              </tr>
            )}
          </tbody>
          {/* <h3>There are {this.state.data.rowsCount} rows in response to this query.</h3> */}
        </table>}

        {/* {this.state.data && <h3>There are {this.state.data.rowsCount} rows in response to this query.</h3>} */}
        {/* {this.state.data && this.state.data.rowsCount > 100 && <h3>There are {this.state.data.rowsCount - 100} rows that are not being displayed.</h3>} */}

      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
