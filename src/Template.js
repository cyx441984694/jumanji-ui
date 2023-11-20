import React from 'react';
import './index.css';
import { Breadcrumb, Layout, theme } from 'antd';

import TableComponent from "./TableComponent.tsx";
const { Content } = Layout;

function Template(){
    

    return (
    <Layout>
        <Content style={{ padding: '0 50px',minHeight: "85vh",background: "#fff", }}>
        <div className="Template">
            <div className="Template-header">
                <h2> Create template</h2>
                <TableComponent/>
            </div>
        </div>        
        </Content>
    </Layout>
    );
}

export default Template;