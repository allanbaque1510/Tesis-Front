import React from 'react'
import {AppstoreOutlined ,BarChartOutlined,CloudOutlined,ShopOutlined,TeamOutlined,UploadOutlined,UserOutlined,VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu} from 'antd';

const Sidebar = () => {
    const items = [
        {icon:<BarChartOutlined/>,link:'/dashboard',label:'Dashboard',key:'1'},
        {icon:<UserOutlined/>,link:'/',label:'Usuario',key:'2'},
        {icon:<VideoCameraOutlined/>,link:'/dasboard',label:'xd',key:'3'},
        {icon:<UploadOutlined/>,link:'/subir_documento',label:'Subir documento',key:'4'},
        {icon:<CloudOutlined/>,link:'/dasboard',label:'xd',key:'5'},
        {icon:<AppstoreOutlined/>,link:'/dasboard',label:'xd',key:'6'},
        {icon:<TeamOutlined/>,link:'/dasboard',label:'xd',key:'7'},
        {icon:<ShopOutlined/>,link:'/dasboard',label:'xd',key:'8'},
      ];
      const itemsMenu =items.map((x,index)=>{
        return {
          key:`menu_${index}`,
          icon:x.icon,
          label:<a href={x.link}>{x.label}</a>
        }
      })
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={itemsMenu} />
  )
}

export default Sidebar