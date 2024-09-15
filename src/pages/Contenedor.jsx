import React, { useState } from 'react';
import {MenuFoldOutlined ,MenuUnfoldOutlined} from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { Layout, theme ,Button,Tooltip} from 'antd';
import Sidebar from '../components/Sidebar';
import Cargando from '../components/Cargando';
import {LogoutOutlined} from '@ant-design/icons';
import MessageResult from '../components/MessageResult';

const { Header, Content, Footer, Sider } = Layout;

const Contenedor = ({children}) => {
  const {logOut}=useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <MessageResult/>
      <Cargando state={false}/>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
     
        }}
        trigger={null} collapsible collapsed={collapsed}
      >
        <Sidebar/>
      </Sider>
      <Layout>
      <Header
        style={{ 
          position:'fixed',
          display:'flex',
          padding: 0,
          marginTop:'5px',
          borderRadius:'10px',
          height:'40px',
          background: colorBgContainer,
        }}
      >
      
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          margin:0,
          width: 40,
          height:40,
        }}
      />
    </Header>
    <Header style={{display:'flex',justifyContent:'flex-end',alignItems:'center', height:'50px'}}>
    <Tooltip
      title="Cerrar Sesión"
    >
      <LogoutOutlined  
        style={{
          backgroundColor:'white',
          fontSize:'20px',
          padding:'5px',
          borderRadius:'40px'
        }}
        onClick={()=>logOut()} 
      />
    </Tooltip>

    </Header>
    <div style={{maxHeight:'calc(100vh - 50px)', overflowY:'auto'}}>
        <Content
          style={{
            margin: '1px 16px 0',
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          UG Ing Telematica ©{new Date().getFullYear()} Creado por Allan Baque Jacome
        </Footer>
    </div>

      </Layout>
    </Layout>
  );
};
export default Contenedor;