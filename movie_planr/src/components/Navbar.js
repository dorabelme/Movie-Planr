import React from 'react';
import { Layout } from 'antd';
import { EnvironmentTwoTone } from '@ant-design/icons';
import '../scss/navbar.scss';

const { Header, Footer, Sider, Content } = Layout;


class Navbar extends React.Component {
    render() {
        return (
            <Layout>
                <Header>
                    <EnvironmentTwoTone style={{ fontSize: `40px`, marginRight: `10px` }} />
                    <span style={{ fontWeight: `600`, fontSize: `20px` }}>Movie Route Planr</span></Header>
            </Layout>
        )
    }
}

export default Navbar;