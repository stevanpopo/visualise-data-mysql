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

        {this.state.data && <p>There are {this.state.data.rowsCount.total_rows} rows in response to this query. {this.state.data && this.state.data.rowsCount.total_rows > 100 && <span className="has-text-weight-semibold">{this.state.data.rowsCount.total_rows - 100} rows are not being displayed due to a 100 row display limit.</span>}</p>}


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
            {this.state.data.demographicData.map((row, i) =>
              <tr key={i}>
                <td>{i}</td>
                <td className="col-2">{row[this.state.selected]}</td>
                <td>{row.count}</td>
                <td>{row.average_age.toFixed(1)}</td>
              </tr>
            )}
          </tbody>
        </table>}
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
