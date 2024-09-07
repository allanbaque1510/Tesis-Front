import React, { useEffect, useState,useRef  } from 'react'
import { Select,Form,Col,Row,Alert,Card,Statistic,Empty, Button  } from 'antd'
import { useDispatch } from 'react-redux';
import { loadingOn,activarModalResult, loadingOff } from "../../redux/reducer";
import { Line,Bar,Pie,Area} from '@ant-design/plots';
import { Liquid } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined,FilePdfOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import UtilService from '../../api/Services/UtilService'

const VisualizarDatosTD = () => {
    const [comboPeriodo, setComboPeriodo] = useState([])
    const [comboCarreras, setComboCarreras] = useState([])
    const [existeConfigCarrera, setExisteConfigCarrera] = useState(true)
    const [totalEstudiantes,setTotalEstudiantes]= useState(0)
    const [dataTituloPresentar, setDataTituloPresentar] = useState({})
    const [dataEstudiantesPeriodo, setDataEstudiantesPeriodo] = useState([])
  
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const imageRefs = useRef([]);
  const addToRefs = (el) => {
    imageRefs.current.push(el);
  };
  const handlePrint =()=>{
      const pdf = new jsPDF();
      let promises = [];
      imageRefs.current.forEach((imgRef, index) => {
        promises.push(
          html2canvas(imgRef).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            if (index > 0) pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          })
        );
      });
      Promise.all(promises).then(() => {
        pdf.save('download.pdf');
      });
    };
    
  const obtenerPeriodos = (id_carrera)=>{
   UtilService.obtenerComboPeriodo({id_carrera})
   .then(response=>{
        if(response.data.ok){
            if(response.data.data.configuracion === null){
              setExisteConfigCarrera(false)
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
    UtilService.obtenerDataPeriodo(dataEnviar)
    .then(response=>{
        setTotalEstudiantes(response.data.total)
        const dataEstudiante = response.data.data.sort((a, b) => b.row - a.row);
        setDataEstudiantesPeriodo(dataEstudiante)
    }) 
    .catch(error=>{
        dispatch(activarModalResult({
          success:false,
          title:"Error al obtener datos",
          message:error.response.data.message,
        }))
      })
    .finally(()=>dispatch(loadingOff()))
  }
  useEffect(() => {
    getComboCarreras()
  }, [])
  const data = dataEstudiantesPeriodo.map((x)=>{
    return{
        codigo:x?.codigo,
        cantidad_estudiantes:x?.total_estudiantes,
    }
  })
  
  
  const tiposDeGraficos = [
    {
      id:1, 
      graphic:<Line 
              data={data}
              xField= 'codigo'
              yField= 'cantidad_estudiantes'
              // autoFit={true}
              width={450}
              height={350}
              point={{
                shapeField: 'square',
                sizeField: 4,}
              }
              interaction={{
                tooltip: {
                  marker: false,
                },}
              }
              style= {
              { lineWidth: 2}
              } 
            /> 
      },
      {
        id:2, 
        graphic:<Bar 
                data={data}
                xField= 'codigo'
                yField= 'cantidad_estudiantes'
                width={450}
                paddingRight= {80}
                style= {{
                  maxWidth: 25,
                }}
                markBackground= {{
                  label: {
                    text: ({ originData }) => {
                      return `${((originData?.cantidad_estudiantes/data[0]?.cantidad_estudiantes) * 100).toFixed(2)}% | ${originData?.cantidad_estudiantes}`;
                    },
                    position: 'right',
                    dx: 80,
                    
                  },
                }}
                scale= {{
                  y:{
                    domain: [0, data[0]?.cantidad_estudiantes],
                  },
                }}

                interaction={{
                  elementHighlightByColor: false,
                }}
              /> 
        },
        {
          id:3, 
          graphic:<Pie 
                  data={data}
                  colorField= 'codigo'
                  width={450}
                  height={350}
                  angleField= 'cantidad_estudiantes'
                  label= {{
                    text: 'codigo',
                    style: {
                      fontWeight: 'bold',
                    },
                  }}
                  legend= {{
                    color: {
                      title: false,
                      position: 'right',
                      rowPadding: 5,
                    },
                  }}
                /> 
          },
  ]

  return (
    <div>
        <h2>Indicador Tasa de Desercion</h2>
        <Row>
          <Card
            style={{width:'100%'}}
          >
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
            <Button disabled={!dataEstudiantesPeriodo.length > 0} icon={<FilePdfOutlined />} className='botonPdf' onClick={handlePrint} type='primary'>Descargar PDF</Button>
          </Row>
        }
        </Card>
        </Row>
    {dataEstudiantesPeriodo.length > 0 ?
      <Card  ref={addToRefs} title={<>{dataTituloPresentar.carrera.label} <span style={{marginInline:'15px'}}></span> {dataTituloPresentar.periodo.label}</>}>
        <Row  justify={'space-around'}  >
          {dataEstudiantesPeriodo.map((x,y)=>{
            return (
                  <Col  key={y} xs={12} sm={12} md={12} lg={10} xl={4} >
                    <Card  title={x.codigo}  style={{borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', margin:'10px', textAlign:'center' }} headStyle={{ fontSize: '1.3em',color:'#BBB', textAlign: 'center' }}>
                          <Liquid
                            height={150}
                            percent={parseFloat(((x.total_estudiantes)/totalEstudiantes ).toFixed(4)) }
                          />
                        <Statistic
                          title={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            "Matriculados" 
                            :
                            "Desertados"
                            :"-"
                          }
                          value={dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                              x.total_estudiantes - dataEstudiantesPeriodo[y-1].total_estudiantes
                              :
                              dataEstudiantesPeriodo[y-1].total_estudiantes - x.total_estudiantes 
                            :0}
                          valueStyle={{color:
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            '#3f8600'
                            :
                            '#cf1322'
                            :""
                          }}
                          prefix={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                            <ArrowUpOutlined />
                              :
                              <ArrowDownOutlined /> 
                            :""
                          }
                          suffix={
                            dataEstudiantesPeriodo[y-1]?
                            dataEstudiantesPeriodo[y-1].total_estudiantes < x.total_estudiantes ?   
                           "+"
                              :
                             "-" 
                            :""
                          }
                        />
                        <Statistic title="Tasa deserción" 
                        value={parseFloat(((totalEstudiantes - x.total_estudiantes)/totalEstudiantes * 100).toFixed(2))}  suffix="%"/>
                    </Card>
                  </Col>
              )})}
        </Row>

        <Row justify={'space-evenly'} >
            {tiposDeGraficos[2].graphic}
            {tiposDeGraficos[0].graphic}
        </Row>
      </Card>
      :
      <Card style={{justifyContent:'center', display:'flex',height:'60vh', alignItems:'center'}}>
        <Empty/>
      </Card>
    }
    </div>
  )
}

export default VisualizarDatosTD