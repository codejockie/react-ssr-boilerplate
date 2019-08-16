import React from 'react';

const Home = props => (
  <div>
    <h1>Hello {props.name}!</h1>
    <button onClick={() => console.log('Clicked!!!')}>Click Me</button>
  </div>
);

export default {
  component: Home
};
