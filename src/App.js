import logo from './logo.svg';

import React,{useState} from 'react';
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, MenuProps, Flex, Table, Input } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Icon } from '@ant-design/compatible';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import TableComponent from "./TableComponent.tsx";

const { Header, Content, Footer, Sider } = Layout;


const App: React.FC = () => {
  const [data, setData] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Apps</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                    <Menu.Item key="1" ><Icon type="desktop" /><span> Home </span></Menu.Item>
                    <Menu.SubMenu key="submenu" title={<span><Icon type="pie-chart" />&nbsp;&nbsp;&nbsp;Pipeline </span>}> 
                      <Menu.Item key="3"><span>Template</span></Menu.Item>
                      <Menu.Item key="4"><span>Run</span></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="5" ><Icon type="coffee" /><span> Setting </span></Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: "85vh" }}>
          <div>
          <TableComponent/>
          </div>
          </Content>
          <Flex gap="small" wrap="wrap" style={{ padding: '0 30px'}}></Flex>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;