import React from "react";
import { Layout } from 'antd';
const { Content } = Layout;


function MainPage() {
  return (
    <Layout>
        <Content style={{ padding: '0 50px',minHeight: "85vh",background: "#fff", }}>
        <div>
            <div>
                <h2> Hello world !</h2>
                <br></br>
                <h3>This is a prototype of pipeline orchestraction</h3>
            </div>
        </div>        
        </Content>
    </Layout>
  );
}

export default MainPage;