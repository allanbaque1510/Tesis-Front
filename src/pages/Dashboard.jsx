import React, { useEffect,useState,useRef } from 'react'
import UtilService from '../api/Services/UtilService'
import { useDispatch,useSelector } from 'react-redux';
import { FilePdfOutlined } from '@ant-design/icons';
import {Row, Select, Col, Form, Alert,Card,Empty,Statistic ,Typography , Table,Button} from 'antd'
import { loadingOn,activarModalResult, loadingOff } from "../redux/reducer";
import {Bar,Line} from '@ant-design/plots';
import Medidor from '../components/Medidor';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboard, setDashboard] = useState({})
  const [comboPeriodo, setComboPeriodo] = useState([])
  const [comboCarreras, setComboCarreras] = useState([])
  const [labelDashboard, setLabelDashboard] = useState({carrera:'',periodo:''})
  const [existePeriodo, setExistePeriodo] = useState(true)
  const [dataTituloPresentar, setDataTituloPresentar] = useState({})
  
  const [form] = Form.useForm();

  const divRef = useRef([]);

  const handlePrint =()=>{
    const element = divRef.current;
    const opt = {
      filename: 'Dashboard '+dataTituloPresentar.carrera.label +' _ '+dataTituloPresentar.periodo.label+'.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, // Aumenta la escala para mejorar la calidad
        logging: true, // Activar registro para depuración
        dpi: 192, // Resolución del canvas
        letterRendering: true // Renderizar letras
      },
      jsPDF: {
        unit: 'in',
        format: [14, 13], // Tamaño de la página A4 en pulgadas, horizontal
        orientation: 'portrait' // Orientación horizontal
      }
    };
    html2pdf().from(element).set(opt).save();
  };



  const obtenerPeriodos = (id_carrera, label)=>{
    setLabelDashboard({...labelDashboard,carrera:label.label})
    UtilService.obtenerComboPeriodo({id_carrera})
    .then(response=>{
         if(response.data.ok){
          if(response.data.data.configuracion === null){
            setExistePeriodo(false)
          }else{
            const periodos =response?.data?.data?.periodo.map((x,y)=>{
              return{
                value:x.value,
                label:x.label,
                disabled:(response?.data?.data?.periodo.length - response.data.data.configuracion.periodos_desercion ) < y ,
              }
            }) 
            setComboPeriodo(periodos)
          }
         }
    })
   }
   const dataTable = dashboard?.reprobados?.map((x,y)=>{
    return{
      numero:dashboard?.reprobados.length - y,
      materia:x.materia,
      cantidad:x.cantidad,
      cantidadAsistencia:x.cantidadAsistencia,
      cantidadNota:x.cantidadNota,
    }
   }) 
   const dataGrafico = dataTable?.map((x)=>{
      return [
        {materia:x.materia, name:"Reprobados por nota",value:x.cantidadNota},
        {materia:x.materia, name:"Reprobados por asistencia",value:x.cantidadAsistencia},
      ]
   }).flat()
   const dataColumns = [
    {align:'right',key: 'numero',dataIndex:'numero',title: 'Top'},
    {align:'right',key: 'materia',dataIndex: 'materia',title: 'Materia',width:240},
    {align:'right',key: 'cantidadAsistencia',dataIndex: 'cantidadAsistencia',title: 'Por asistencia'},
    {align:'right',key: 'cantidadNota',dataIndex: 'cantidadNota',title: 'Por promedio'},
    {align:'right',key: 'cantidad',dataIndex: 'cantidad',title: 'Total'},
   ]

   
  
   

   const getComboCarreras = () =>{
     UtilService.getComboCarreras()
     .then(response=>{
         if(response.data.ok){
             setComboCarreras(response.data.data)
         }
     })
   }

   
  const obtenerDashboard = (value,label) =>{
    form.resetFields(['nivel'])
    setLabelDashboard({...labelDashboard,periodo:label.label})
    const datos = form.getFieldsValue()

        
    const carrera = comboCarreras.filter(x=>x.value === datos.carrera)[0]
    const periodo = comboPeriodo.filter(x=>x.value === datos.periodo)[0]
    
    setDataTituloPresentar({carrera,periodo})

    dispatch(loadingOn());
     UtilService.obtenerDashboard(datos)
      .then(response=>{
        if(response.data.ok){
          setDashboard(response.data.data)
        }
      })
      .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos del dashboard",
          message:error.response.data.error,
        }))
      })
      .finally(()=>dispatch(loadingOff()))
  }
  useEffect(() => {
    getComboCarreras()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      if("nivel" in dashboard){ 
        form.setFieldsValue({nivel:dashboard.nivel})
        
        const { nivel: removed, ...newObject } = dashboard;
        setDashboard(newObject);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dashboard])
  

  const changeNivel = (data) =>{
    dispatch(loadingOn());
    let datos = form.getFieldsValue()
    datos.nivel = data

    UtilService.obtenerDashboardLogros(datos)
    .then(response=>{
      if(response.data.ok){
        setDashboard({...dashboard, logros:response.data.data.data})
      }
    })
    .catch(error=>{
      dispatch(activarModalResult({
        success:false,
        title:"Error al obtener datos del dashboard",
        message:error.response.data.error,
      }))
    })
    .finally(()=>dispatch(loadingOff()))

  }


  const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  return (
    <div>
      <h1>Dashboard</h1>
        
      <Form
      form={form}
      >
        {!existePeriodo && <Alert message="No existen datos de configuracion" description="Asigne los datos de configuracion para esta carrera antes de continuar" type="warning" showIcon/>}
       <Row style={{marginTop:'20px'}}>
        <Col>
              <Form.Item
                  label="Carrera"
                  name="carrera"
                  >
                  <Select
                      placeholder="Seleccione una carrera"
                      options={comboCarreras}
                      onChange={obtenerPeriodos}
                        />
            </Form.Item>
        </Col>
                  
        <Col>
          <Form.Item
            label="Periodo"
            name="periodo"
            >
            <Select
                placeholder="Seleccione un periodo"
                options={comboPeriodo}
                onChange={obtenerDashboard}
                  />
          </Form.Item>
        </Col>
        </Row>
      <Card ref={divRef} title={<Row justify={'space-between'}>
            <Col>{dataTituloPresentar?.carrera?.label} <span style={{marginInline:'15px'}}></span> {dataTituloPresentar?.periodo?.label}</Col>
            <Col>
              {Object.keys(dashboard).length > 0 &&
                <Button  icon={<FilePdfOutlined />} type='primary' onClick={handlePrint} className='botonPdf' >Descargar PDF</Button>
              }
            </Col>
        </Row>} >
      <Card >
        <Card.Grid style={gridStyle} >
          {dashboard?.desercion?
          <> 
            <Card title="Tasa de deserción">
              <Card.Grid style={gridStyle}>
                <Statistic title="Estudiantes Base" value={dashboard.desercion.nivelacion} />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Statistic title="Estudiantes actuales" value={dashboard.desercion.actual} />
              </Card.Grid>
            </Card>

            <Medidor
                  target={dashboard?.desercion?.nivelacion - dashboard?.desercion?.actual}
                  total={dashboard?.desercion?.nivelacion}
                />
            </>
          :
          <Card title="Tasa de deserción">
              <Empty style={{width:'100%', padding:'30px'}}/>
          </Card>
          }
        </Card.Grid>

        <Card.Grid style={gridStyle}>
          {dashboard?.titulacion?
          <>
          
            <Card title={"Tasa de titulación"}>
              <Card.Grid style={gridStyle}>
                <Statistic title="Estudiantes Base" value={dashboard.titulacion.nivelacion} />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Statistic title="Estudiantes Titulados" value={dashboard.titulacion.titulados} />
              </Card.Grid>
            </Card>
            <Medidor
                  target={ dashboard?.titulacion?.titulados}
                  total={dashboard?.titulacion?.nivelacion}
                />
            </>:
            <Card title="Tasa de titulación" >
              <Empty style={{width:'100%', padding:'30px'}}/>
            </Card>
          }
        </Card.Grid>
      </Card>

      <Card style={{textAlign:'center', marginTop:'20px'}} title={"Top materias con mayor cantidad de reprobados"}>
            {dashboard?.reprobados && dashboard?.reprobados.length > 0 ?
          <Row justify={'space-evenly'}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>

              <Table
                bordered={false}
                dataSource={dataTable}
                pagination={false}
                columns={dataColumns}
                scroll={{
                  x: 600,
                  y: 400,
                }}
                />   
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>

            <Bar
              data={dataGrafico}
              isGroup={true}
              xField={'materia'}
              yField={'value'}
              seriesField={"name"}
              colorField={"name"}
              />
 
              
            </Col>
          </Row>
            :
            <Row justify={'space-evenly'}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Empty/>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Empty/>
              </Col>
          </Row>
        }

      </Card>

      <Card style={{textAlign:'center',marginTop:'20px'}} 
      title={<>Logros de aprendizaje por materia 
      <Row justify={'end'}>
        <Form.Item 
          name="nivel" 
          style={{width:'100px'}}>
            <Select 
              options={dashboard?.niveles } 
              onChange={changeNivel}/> 
        </Form.Item>
      </Row></>}>
      
      {dashboard?.logros && dashboard?.logros.length > 0 ?
        
         dashboard?.logros.map((x,y)=>(
          <Card.Grid style={{width:'50%'}}>
            
          <Line
          style={{width:'100%'}}
            data={x.data}
            xField={'logro'}
            yField={'promedio'}
            seriesField={'docente'}
            title={x.materia}
            colorField={'docente'}
            />
            </Card.Grid>
        ))
      :
      <Empty/>
      }
      </Card>
      </Card>
      </Form>
      
   
    </div>
  )
}

export default Dashboard