import React, { useEffect, useState } from 'react'
import { Button, Tag, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import universidad from '../resource/img/Universidad.jpg'
import logo from '../resource/img/LogosUG.png'
const Login = () => {
    const erroresLogin = useSelector(state => state.errorLogin);

    const [form] = Form.useForm();
    
    const [cargando, setCargando] = useState(false)
    
    const {signin}=useAuth();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if(erroresLogin.error!== null){
            setCargando(false)
        }
    }, [erroresLogin])

    const onFinish = () =>{
        setCargando(true)
        const values = form.getFieldsValue()
        signin(values);
    }
  return (
    <div style={{display:'flex',backgroundColor:'#083C6E', position:'fixed', top:0,left:0,justifyContent:'center',alignItems:'center', width:'100vw',height:'100vh'}}>
        <div 
            style={{
                width:'80%',
                display:'flex',
                padding:'20px',
                borderRadius:50,
                backgroundColor:'white',
                height:windowWidth <= 1001 &&'80%'
            }}
        >
             {windowWidth >= 1000 && (
                 <img src={universidad} style={{flex:3, width:'140px',opacity:0.9,padding:'10px', borderRadius:40}}  />
             )}
            <div style={{flex:2,padding:'10px', display:'flex', justifyContent:'center',alignItems:'center'}}>
                <Form
                    style={{width:windowWidth >= 1001?'70%':'100%',textAlign:'center'}}
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    >
                    <img src={logo} style={{width:windowWidth >= 700?'50%':'80%'}} />
                    {erroresLogin.error && !erroresLogin.error?.ok !== null &&(
                        <Tag style={{width:'100%',textAlign:'center',fontSize:'1rem',padding:'6px', marginBlock:'10px',whiteSpace:'pre-wrap'}} color="red">{erroresLogin?.error?.message}</Tag>
                    )}
                    <Form.Item name="name" rules={[{required: true, message:'El campo usuario no puede estar vacio'}]}>
                        <Input style={{color:'#727272'}} prefix={<UserOutlined style={{color:"#aaa"}} />} placeholder="Ingrese un usuario" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true, message:'El campo contraseña no puede estar vacio'}]}>
                        <Input style={{color:'#727272'}} prefix={<LockOutlined style={{color:"#aaa"}} />} type="password" placeholder="Ingrese una contraseña" />
                    </Form.Item>
                    <Button loading={cargando} type="primary" style={{width:'100%'}} htmlType="submit" >
                    Log in
                    </Button>
                </Form>
            </div>
        </div>

    </div>
  )
}

export default Login