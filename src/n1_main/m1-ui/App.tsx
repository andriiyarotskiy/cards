import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import Header from "./component/Header/Header";
import {Profile} from "./component/Profile/Profile";
import AuthPage from "./pages/AuthPage";
import PasswordChange from "./component/PasswordChange/PasswordChange";
import {TableCardsPack} from "./component/TableCardsPack/TableCardsPack";



const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Switch>
                    <Route exact path='/' render={() => <Profile/>}/>
                    <Route path='/authPage' render={() => <AuthPage/>}/>
                    <Route path='/passwordChange/:token' render={() => <PasswordChange/>}/>
                    <Route path='/packs' render={() => <TableCardsPack/>} />
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
