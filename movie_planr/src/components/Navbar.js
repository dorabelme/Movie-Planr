import React from 'react';
import { Layout } from 'antd';
import { EnvironmentTwoTone } from '@ant-design/icons';

const { Header } = Layout;


const Navbar = () => {
    return (
        <Layout>
            <Header className='Navbar'>
                <EnvironmentTwoTone style={{ fontSize: `40px`, marginRight: `10px` }} />
                <span>Movie Route Planr</span>
            </Header>
        </Layout>
    )
}

export default Navbar;