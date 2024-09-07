import React, { useEffect, useState,useRef } from 'react'
import { Select,Form,Col,Row,Button,Card,Statistic,Typography, Table,Empty  } from 'antd'
import { useDispatch } from 'react-redux';
import {TeamOutlined,FileExcelOutlined,FilePdfOutlined} from '@ant-design/icons';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Column } from '@ant-design/plots';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import UtilService from '../../api/Services/UtilService'
import ExcelService from '../../api/Services/ExcelService';
const VisualizarDatosTR = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [dataMateria, setDataMateria] = useState({})
    const [comboMaterias, setComboMaterias] = useState([])
    const [dataTituloPresentar, setDataTituloPresentar] = useState({})

    const divRef = useRef();

    const handleDownloadPDF = () => {
      const element = divRef.current;
      const opt = {
        filename: 'Tasa_Reprobados '+dataTituloPresentar.carrera.label +' _ '+dataTituloPresentar.periodo.label+'.pdf',
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

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodoReprobados({id_carrera})
   .then(response=>{
        if(response.data.ok){
              setComboPeriodo(response.data.data)
        }
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
    UtilService.obtenerReprobadosMateriaPorcentaje(dataEnviar)
    .then(response=>{
      if(response.data.ok){
        setDataSource(response.data.data.sort((a, b) => b.porcentaje - a.porcentaje))
        setDataMateria(response.data.mas_reprobado)
        setComboMaterias(response.data.materias)
        form.setFieldsValue({materia:response.data.mas_reprobado.materia.id_materia})
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


  const changeMateria = () =>{
    dispatch(loadingOn());
    const data = form.getFieldsValue();

    UtilService.obtenerReprobadoMateriaDetallePorcentaje(data)
    .then(response=>{
      if(response.data.ok){
        setDataMateria(response.data.data)
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
  const descargarExcelTasaReprobados=()=>{
    dispatch(loadingOn())
    const datos = form.getFieldsValue()
    ExcelService.descargarExcelTasaReprobados(datos)
    .then(async(response)=>{
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `REPORTE_TASA_REPROBADOS_${dataTituloPresentar.carrera.label} _ ${dataTituloPresentar.periodo.label}.xlsx`;
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

const columns =[
  {align:'left',key: 'materia',dataIndex: 'materia',title:'Materia'},
  {align:'center',key: 'totalEstudiantes',dataIndex: 'totalEstudiantes',title:'Cantidad Estudiantes'},
  {align:'right',key: 'cantidad',dataIndex: 'cantidad',title:'Total Reprobados'},
  {align:'right',key: 'cantidadAsistencia',dataIndex: 'cantidadAsistencia',title:'Reprobados por asistencia'},
  {align:'center',key: 'cantidadNota',dataIndex: 'cantidadNota',title:'Reprobados por promedio'},
  {align:'center',key: 'porcentaje',dataIndex: 'porcentaje',title:'Porcentaje', render: (text) => `${text}%`,},
  
]
const dataGrafico = dataMateria?.data?.map((x)=>{
  return [
    {grupo:x?.grupo, name:"Reprobados por nota",value:x.cantidadNota},
    {grupo:x?.grupo, name:"Reprobados por asistencia",value:x.cantidadAsistencia},
  ]
}).flat()

  return (
    <div>
        <h2>Indicador Tasa de Reprobados (Porcentajes)</h2>
          <Form
              form={form}
              layout="vertical"
          >
        <Row>
        <Card style={{width:'100%'}}>
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
            {Object.keys(dataMateria).length > 0 &&
            <Row justify={'end'}>
                  <Button icon={<FileExcelOutlined />} type='primary' onClick={descargarExcelTasaReprobados} className='botonExcel' >Descargar reporte</Button>
                  <Button icon={<FilePdfOutlined />} type='primary' onClick={handleDownloadPDF} className='botonPdf' >Descargar PDF</Button>
              </Row>
          }
        </Card>
      </Row>
    <Card  title="Reprobados">
      {Object.keys(dataMateria).length > 0 &&
        <Form.Item
          name="materia"
          label="Materia"
        >
          <Select
            style={{width:'300px'}}
            placeholder={"Seleccione una materia"}
            options={comboMaterias}
            onChange={changeMateria}
          />
        </Form.Item>
      }
    <Card ref={divRef}  bordered={false} title={<>{dataTituloPresentar.carrera?.label} <span style={{marginInline:'15px'}}></span> {dataTituloPresentar.periodo?.label}  <span style={{marginInline:'15px'}}></span> {dataMateria?.materia?.materia}</>}>
    <Row justify={'space-between'}>
        <Col xs={24} sm={24} md={24} lg={11} xl={11} >
          {Object.keys(dataMateria).length > 0 ?
            <Card>
            <Card.Grid style={{
              width:'100%', 
              backgroundColor:'#0161DA',
              }}>
                <Row justify={'space-between'}>
                  <Col>
                    <Typography.Title style={{color:'white'}}  level={3}>Total de estudiantes </Typography.Title>
                      <Row justify={'space-between'}>
                        <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}>{dataMateria?.materia?.totalEstudiantes} </Typography.Text>
                        <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined /></Typography.Text>
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Title style={{color:'white'}}  level={3}>Estudiantes reprobados</Typography.Title>
                      <Row justify={'space-between'}>
                        <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}>{dataMateria?.materia?.cantidad} </Typography.Text>
                        <Typography.Text style={{color:'white', fontSize: '3em', fontWeight: 'bold' }}><TeamOutlined /></Typography.Text>
                    </Row>
                  </Col>
                </Row>

            </Card.Grid>
            {dataMateria?.data?.map((x,y)=>(
                <Card.Grid style={{    width:'50%', 
                  backgroundColor:'white',
                  textAlign:'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'}}>
                    <Typography.Link >{x.grupo}</Typography.Link>
                    <Statistic title={"Cantidad de estudiantes"} value={x?.cantidadTotal }/>
                    <Statistic title={"Reprobados por asistencia"} value={parseFloat(x?.cantidadAsistencia / x?.cantidadTotal * 100).toFixed(2)+"%"}/>
                    <Statistic title={"Reprobados por nota"} value={parseFloat(x?.cantidadNota / x?.cantidadTotal * 100).toFixed(2)+"%"}/>
                    <Typography.Link >{x?.docente}</Typography.Link>
                </Card.Grid>
            ))}

          </Card>
          :
          <Empty/>
          }

        </Col>
        {Object.keys(dataMateria).length > 0 ?
        
        <Col xs={24} sm={24} md={24} lg={11} xl={11} >
            <Column
            data={dataGrafico}
            isGroup={true}
            xField={'grupo'}
            yField={'value'}
            seriesField={"name"}
            colorField={"name"}
            />

        </Col>
        :
        <Empty/>
        }
        </Row>
      </Card>
      <Table columns={columns} dataSource={dataSource} style={{width:'100%'}}/>
   
    </Card>
    </Form>

    </div>
  )
}

export default VisualizarDatosTR