import React from 'react';
import { Layout } from 'antd';
import { EnvironmentTwoTone, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = ({ history, setIsLoggedIn, magic }) => {

    /* Logout handler */
    const handleLogout = async () => {
        await magic.user.logout();
        setIsLoggedIn(false);
        history.push('/');
    };

    return (
        <Layout>
            <Header className='Navbar'>
                <div className='leftHeader'>
                <EnvironmentTwoTone style={{ fontSize: `40px`, marginRight: `10px` }} />
                    <span>Movie Route Planr</span>
                </div>
                <div className='rightHeader'>
                    <LogoutOutlined onClick={handleLogout} style={{ fontSize: `20px`}} />
                </div>
            </Header>
        </Layout>
    )
}

export default Navbar;