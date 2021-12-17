import './index.css';
import AppWrapper from './App';
import reportWebVitals from './reportWebVitals';

var React = require("react");
var ReactDOM = require("react-dom");


ReactDOM.render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
