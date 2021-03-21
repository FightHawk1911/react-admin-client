import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeageUtils from "./utils/storeageUtils";
import memoryUtils from "./utils/memoryUtils";

const user = storeageUtils.getUser()
memoryUtils.user = Object.keys(user).length === 0 ? { _id: ""} : user

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
