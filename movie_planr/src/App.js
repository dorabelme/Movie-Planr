import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Magic } from 'magic-sdk';
import Login from './components/Login';
import AppContainer from './components/AppContainer';


/* MAGIC API KEY */
const magic = new Magic(process.env.REACT_APP_MAGIC_KEY);

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

    useEffect(() => {
        const loginLogic = async () => {
            const result = await magic.user.isLoggedIn();
            setIsLoggedIn(result);
        }

        loginLogic();
    }, [])

    const ProtectedAppContainer = protectRoute(AppContainer);

    return (
        <Switch>
            <Route
                exact
                path='/'
                render={props => <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} magic={magic} />}
            />
            <Route
                exact path='/app'
                render={(props) => <ProtectedAppContainer {...props} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} magic={magic} />}
            />
        </Switch>
    )
}

export default App;
