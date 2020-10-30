import React, { useState } from 'react';
import Login from './components/Login';
import AppContainer from './components/AppContainer';
import { Route, Switch } from 'react-router-dom';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Switch>

            <Route
                exact
                path='/'
                render={props => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
                exact path='/app'
                render={(props) => <AppContainer {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
            />

        </Switch>
    )
}

export default App;
