import logo from './logo.svg';

import React,{useState} from 'react';
import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, MenuProps, Flex, Table, Input } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import TableComponent from "./TableComponent.tsx";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1'].map((key) => ({
  key,
  label: `Controller`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `workflow ${key}`,

      children: new Array(1).fill(null).map((_, j) => {
        const subKey = index * 1 + j +1;
        return {
          key: subKey,
          label: `playbook${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = () => {
  const [data, setData] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Apps</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
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