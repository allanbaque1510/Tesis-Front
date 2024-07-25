import React from 'react'
import { Result,Modal,Button,Row,Col } from "antd";
import {CloseOutlined ,CheckOutlined} from '@ant-design/icons';
const MessageAlert = (props) => { 
  return (
    <Modal open={props.status} onCancel={props.cerrar} footer={null}>
        <Result
        status= {"warning"}
        title={props.title}
        subTitle={props.message}
        extra={
          <Row justify={'center'}>
            <Col style={{marginInline:'10px'}}>
              <Button type='primary' onClick={props.funcion}><CheckOutlined />Aceptar</Button>
            </Col>
            <Col style={{marginInline:'10px'}}>
              <Button  onClick={props.cerrar}><CloseOutlined />Cancelar</Button>
            </Col>
          </Row>
        }
        />
    </Modal>
  )
}

export default MessageAlert