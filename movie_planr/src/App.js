import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import AppContainer from './components/AppContainer';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // authorization
    const protectRoute = Component => props => {
        if (isLoggedIn) {
            return <Component {...props} />;
        } else {
            return <Redirect to="/" />;
        }
    };

    const ProtectedAppContainer = protectRoute(AppContainer);

    return (
        <Switch>
            <Route
                exact
                path='/'
                render={props => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
                exact path='/app'
                render={(props) => <ProtectedAppContainer {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
            />
        </Switch>
    )
}

export default App;
