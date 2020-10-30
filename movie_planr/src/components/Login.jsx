import React, { useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Input, Button, Form } from 'antd';

const { Meta } = Card;

/* MAGIC API KEY */
const magic = new Magic(process.env.REACT_APP_MAGIC_KEY);

const Login = ({isLoggedIn, setIsLoggedIn }) => {
    // const [userMetadata, setUserMetadata] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    /* Login handler */
    const handleLogin = async (obj) => {        
        const email = obj['email'];
        if (email) {
            try {
                await magic.auth.loginWithMagicLink({ email });
                setIsLoggingIn(true);
                // setIsLoggedIn(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    /* Update logged in state in App */
    useEffect(() => {
        async function updateStates() {
            const result = await magic.user.isLoggedIn();
            // const result = true;
            setIsLoggedIn(result);
            // const userMetadata = await magic.user.getMetadata();
            // setUserMetadata(userMetadata);
            setIsLoggingIn(false);
        }

        if (isLoggingIn !== false) {
            updateStates();
        }
        
    }, [isLoggingIn, setIsLoggedIn])

    /* Render login component or Redirect to app */
    if (!isLoggedIn) {
        return (
            <div className='site-card-border-less-wrapper'>
                <Card title='Movie Route Planr' bordered={false} style={{ width: 400, height: 400 }}>
                    <Meta title=' 👋 Please sign up or login! 👋'></Meta>
                    <Form onFinish={handleLogin}>
                        <Form.Item type='email' name='email' required='required' placeholder='Enter your email' >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Send</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

        )
    } else {
        return (<Redirect to="/app" />)
    }
    
}
export default Login;