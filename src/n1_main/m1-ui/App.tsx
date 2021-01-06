import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./component/Header/Header";
import {Profile} from "./component/Profile/Profile";
import AuthPage from "./pages/AuthPage";
import PasswordChange from "./component/PasswordChange/PasswordChange";


const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path='/' render={() => <Profile/>}/>
                    <Route path='/authPage' render={() => <AuthPage/>}/>
                    <Route path='/passwordChange/:token' render={() => <PasswordChange/>}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
