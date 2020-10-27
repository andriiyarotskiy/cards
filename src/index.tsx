import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './n1_main/m1-ui/App';
import {store} from "./n1_main/m2-bll/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

