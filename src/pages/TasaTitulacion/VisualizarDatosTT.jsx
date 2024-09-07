import React, { useEffect, useRef, useState } from 'react'
import { Select,Form,Col,Row,Alert,Card,Statistic,Typography, Table,Empty, Button  } from 'antd'
import { useDispatch } from 'react-redux';
import {TeamOutlined,FilePdfOutlined,FileExcelOutlined} from '@ant-design/icons';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Pie } from '@ant-design/plots';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

import UtilService from '../../api/Services/UtilService'
import ExcelService from '../../api/Services/ExcelService';
const VisualizarDatosTT = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [comboTipoGrafico, setComboTipoGrafico] = useState([])
    const [tipoGrafico, setTipoGrafico] = useState(0)
    const [existeConfigCarrera, setExisteConfigCarrera] = useState(true)
    const [dataReferencia, setDataReferencia] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [dataTituloPresentar, setDataTituloPresentar] = useState({})
    const [dataEstudiantesPeriodo, setDataEstudiantesPeriodo] = useState([])
    const [dataParaGrafico, setDataParaGrafico] = useState([])
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const divRef = useRef([]);

  const handlePrint =()=>{
    const element = divRef.current;
    const opt = {
      filename: 'Tasa_Titulacion '+dataTituloPresentar.carrera.label +' _ '+dataTituloPresentar.periodo.label+'.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // Aumenta la escala para mejorar la calidad
        logging: true, // Activar registro para depuración
        dpi: 192, // Resolución del canvas
        letterRendering: true // Renderizar letras
      },
      jsPDF: {
        unit: 'in',
        format: [13, 9], // Tamaño de la página A4 en pulgadas, horizontal
        orientation: 'landscape' // Orientación horizontal
      }
    };
    html2pdf().from(element).set(opt).save();
  };

  const descargarExcelTasaTitulacion=()=>{
    dispatch(loadingOn())
    const datos = form.getFieldsValue()
    ExcelService.descargarExcelTasaTitulacion(datos)
    .then(async(response)=>{
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `REPORTE_TASA_TITULACION_${dataTituloPresentar.carrera.label} _ ${dataTituloPresentar.periodo.label}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
  })
    .catch(error=>{
      dispatch(activarModalResult({
          success:false,
          title:"Error al descargar el reporte",
          message:error.response.data.error,
      }))
  })
  .finally(()=>dispatch(loadingOff()))
    
  }

  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodoTitulacion({id_carrera})
   .then(response=>{
        if(response.data.ok){
            if(response.data.data.configuracion === null){
              setExisteConfigCarrera(false)
            }else{
              setComboPeriodo(response.data.data.periodo)
              setComboTipoGrafico(response?.data?.data?.tipo_grafico)
            }
        }
   })
  }
  const registrarDatosExcel = async () =>{
  dispatch(loadingOn());
    await ExcelService.registrarDatosExcel({"file":archivo})
    .then((response)=>{
      if(response.data.ok){
        dispatch(activarModalResult({
          success:true,
          title:response.data.message,
          message:"",
        }))
        props.despuesCargar()
      }
    })
    .catch(error=>{
      dispatch(activarModalResult({
        success:false,
        title:"Error al cargar datos del excel",
        message:error.response.data.error,
      }))
    })
    .finally(()=>{dispatch(loadingOff());
    })
  }

  const getComboCarreras = () =>{
    UtilService.getComboCarreras()
    .then(response=>{
        if(response.data.ok){
            setComboCarreras(response.data.data)
        }
    })
  }

  const obtenerDataPeriod=(data)=>{
    dispatch(loadingOn());
    const dataEnviar = form.getFieldsValue()
    
    const carrera = comboCarreras.filter(x=>x.value === dataEnviar.carrera)[0]
    const periodo = comboPeriodo.filter(x=>x.value === dataEnviar.periodo)[0]
    
    setDataTituloPresentar({carrera,periodo})

    UtilService.obtenerDataPeriodoTitulacion(dataEnviar)
    .then(response=>{
      if(response.data.ok){
        setDataReferencia(response.data.data)
        setDataSource(response.data.data_table)
        const valorOtro =  response.data.data.total_titulados?.value - response.data.data.titulados_nivelacion.reduce((previo,current)=>({value:previo.value+current.value})).value 
        setDataParaGrafico([...response.data.data.titulados_nivelacion,{ value:valorOtro,label:"otros"}])
        setDataEstudiantesPeriodo(response.data.data.titulados_nivelacion)
      }
    }) 
    .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos",
          message:error.response.data.error,
        }))
      })
    .finally(()=>dispatch(loadingOff()))
  }
  useEffect(() => {
    getComboCarreras()
  }, [])
const columns =[
  {align:'left',key: 'estudiante',dataIndex: 'estudiante',title:'Estudiante'},
  {align:'right',key: 'periodo_titulacion',dataIndex: 'periodo_titulacion',title:'Periodo Titulación'},
  {align:'right',key: 'eperiodo_ingresostudiante',dataIndex: 'periodo_ingreso',title:'Periodo Ingreso'},
  {align:'center',key: 'prom_materia',dataIndex: 'prom_materia',title:'Prom. Materia'},
  {align:'center',key: 'prom_titulacion',dataIndex: 'prom_titulacion',title:'Prom. Titulación'},
  {align:'center',key: 'prom_general',dataIndex: 'prom_general',title:'Prom. General'},
]
  return (
    <div>
        <h2>Indicador Tasa de Titulación</h2>
        <Row>
        <Card style={{width:'100%'}}>
          <Form
              form={form}
              layout="vertical"
          >
        {!existeConfigCarrera && <Alert message="No existen datos de configuracion" description="Asigne los datos de configuracion para esta carrera antes de continuar" type="warning" showIcon/>}
            <Row justify={ 'space-around'}>
              <Col xs={24} sm={24} md={7} lg={7} xl={8}>
                <Form.Item
                    label="Carrera"
                    name="carrera"
                    >
                    <Select
                        placeholder="Seleccione una carrera"
                        options={comboCarreras}
                        onChange={(value)=>{
                          obtenerPeriodos(value)
                          }}
                          />
                </Form.Item>
              </Col>
                  
              <Col xs={24} sm={24} md={7} lg={7} xl={8}>
                <Form.Item
                    label="Periodo"
                    name="periodo"
                    >
                    <Select
                        placeholder="Seleccione un periodo"
                        options={comboPeriodo}
                        onChange={(value)=>{
                          obtenerDataPeriod(value)
                          }}
                          />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {dataEstudiantesPeriodo.length > 0 && 
              <Row justify={'end'}>
                  <Button disabled={!dataEstudiantesPeriodo.length > 0} icon={<FileExcelOutlined />} type='primary' onClick={descargarExcelTasaTitulacion} className='botonExcel' >Descargar reporte</Button>
                  <Button disabled={!dataEstudiantesPeriodo.length > 0} icon={<FilePdfOutlined />} type='primary' onClick={handlePrint} className='botonPdf' >Descargar PDF</Button>
              </Row>
          }
        </Card>
      </Row>
      {dataEstudiantesPeriodo.length > 0 ? 
      <Card title="Tasa de titulación">
      <Card  ref={divRef} title={<>{dataTituloPresentar.carrera.label} <span style={{marginInline:'15px'}}></span> {dataTituloPresentar.periodo.label}</>}>
        <Row  justify={'space-between'}>
              <Col xs={24} sm={24} md={11} lg={11} xl={11} >
              <Card >
                  <Card.Grid
                    style={{ 
                      width:'100%', 
                      backgroundColor:'#0161DA',
                    }}
                    >
                  <Typography.Title style={{color:'white'}}  level={3}>Total de estudiantes titulados</Typography.Title>
                    <Row justify={'space-between'}>
                      <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}>{dataReferencia.total_titulados.value} </Typography.Text>
                      <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined /></Typography.Text>
                    </Row>
                  </Card.Grid>
                {dataEstudiantesPeriodo.map((x,y)=>(
                  <Card.Grid
                    style={{ 
                      width:'50%', 
                      backgroundColor:'white',
                      textAlign:'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    >
                      <Typography.Link >{x.label}</Typography.Link>
                      <Statistic title={"Cantidad de estudiantes"} value={x.value}/>
                      <Statistic title={"Porcentaje de titulacion"} value={parseFloat(x.value/dataReferencia.total_titulados.value * 100).toFixed(2)+"%"}/>
                    
                  </Card.Grid>
              ))}
              </Card>
              </Col>
              <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                <Pie
                  data={dataParaGrafico}
                  angleField={"value"}
                  colorField={"label"}
                />
              </Col>  

        </Row>
    </Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            style={{width:'100%',marginTop:'30px'}}
          />
    </Card>
  :
    <Card>
      <Row>
      <Col xs={24} sm={24} md={11} lg={11} xl={11} >
        <Empty/>
      </Col>
      <Col xs={24} sm={24} md={11} lg={11} xl={11} >
        <Empty/>
      </Col>
      </Row>
      <Table columns={columns} style={{width:'100%',marginTop:'30px'}}/>
    </Card>
    }
    </div>
  )
}

export default VisualizarDatosTT