
import React,{ Component } from 'react';
import './index.css';
import { Button, MenuProps, Flex } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Icon } from '@ant-design/compatible';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MainPage from "./MainPage";
import PipelineRun from "./PipelineRun";
import Template from "./Template";


const { Header, Content, Footer, Sider } = Layout;


class RouterApp extends Component{



  render() {
  
    return (
      <Router>
        <Layout>
          <Header className='header' style={{ display: 'flex', alignItems: 'center' }}>
            <div className="app-logo" />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Apps</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0'}}>
              <Sider  width={200}>
                <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }}>
                        <Menu.Item key="1" ><Icon type="desktop" /><span> Home </span><Link to="/" /></Menu.Item>
                        <Menu.SubMenu key="submenu" title={<span><Icon type="pie-chart" />&nbsp;&nbsp;&nbsp;Pipeline </span>}> 
                          <Menu.Item key="3"><span>Template</span>
                          <Link to="/pipelinetemplate" />
                          </Menu.Item>
                          <Menu.Item key="4"><span>Run</span><Link to="/pipelinerun" /></Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="5" ><Icon type="coffee" /><span> Setting </span></Menu.Item>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: "85vh",background: "#fff",}}>
              <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path ="/pipelinetemplate" element={<Template />}/>
                <Route path ="/pipelinerun" element={<PipelineRun />}/>
              </Routes>
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Router>
    );
  };
}

export default RouterApp;