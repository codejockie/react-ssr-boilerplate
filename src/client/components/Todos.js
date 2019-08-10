import React from 'react';
import loadData from '../helpers/loadData';

class Todos extends React.Component {
  constructor(props) {
    super(props);

    if (props.staticContext && props.staticContext.data) {
      this.state = {
        data: props.staticContext.data
      };
    } else {
      this.state = {
        data: []
      };
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.__ROUTE_DATA__) {
        this.setState({
          data: window.__ROUTE_DATA__
        });
        delete window.__ROUTE_DATA__;
      } else {
        loadData('todos').then(data => {
          this.setState({ data });
        });
      }
    }, 0);
  }

  render() {
    const { data } = this.state;
    return <ul>{data.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>;
  }
}

export default Todos;