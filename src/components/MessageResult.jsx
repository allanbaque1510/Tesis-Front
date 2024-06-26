import React from 'react'
import { Result,Modal,Button } from "antd";
import { useDispatch,useSelector } from 'react-redux';
import { ocultarModalResult } from "../redux/reducer";
const MessageResult = () => {
    const modalResult = useSelector(state => state.modalResult);
    const dispatch = useDispatch();
    const ocultarModal =()=>{
        dispatch(ocultarModalResult());
    }
  return (
    <Modal open={modalResult.active} footer={null}>
        <Result
        status= {modalResult.success? "success":"warning"}
        title={modalResult.title}
        subTitle={modalResult.message}
        extra={
            <Button type='primary' onClick={ocultarModal}>Aceptar</Button>
        }
        />
    </Modal>
  )
}

export default MessageResult