import{r as o,b as g,j as t,c as s,d as r,e as i}from"./index-5aad39ae.js";import{D as b}from"./DraggerComponent-b8c87a46.js";import{E as n}from"./ExcelService-d4776a72.js";import{C as E,T as D}from"./index-bd599e66.js";import{T as v}from"./Table-656d8358.js";import"./row-8e9f2db1.js";import"./context-2a7aaf03.js";import"./useForceUpdate-dbe6b583.js";import"./EyeOutlined-9eb866e7.js";import"./styleChecker-72068623.js";import"./scrollTo-283e055c.js";import"./BaseInput-7c54d9e8.js";import"./index-e6c350fb.js";import"./TextArea-9f6e28af.js";const H=()=>{const[c,l]=o.useState(null),[d,m]=o.useState([]),a=g(),p=e=>{l(e)},u=[{align:"center",key:"carrera",dataIndex:"carrera",title:"Carrera"},{align:"center",key:"periodo",dataIndex:"periodo",title:"Periodo"},{align:"center",key:"fecha",dataIndex:"fecha",title:"Fecha creacion"},{align:"center",key:"accion",dataIndex:"accion",title:"Acción"}],h=()=>{a(s()),n.historialReporteNominaCarreraDocenteMateria().then(e=>{e.data.ok&&m(e.data.data)}).catch(e=>{console.log(e.response.data),a(r({success:!1,title:"Error al obtener el historial",message:e.response.data.error}))}).finally(()=>{a(i())})};o.useEffect(()=>{h()},[]);const f=()=>{a(s()),n.registrarDatosExcelNominaEstudiantesPeriodo({file:c}).then(e=>{a(r({success:!0,title:"Registro subido exitosamente!"}))}).catch(e=>{console.log(e),a(r({success:!1,title:"Error al cargar datos del excel",message:e.response.data.error}))}).finally(()=>{a(i())})},x=[{key:"1",label:"Subir Documento",children:t.jsx(b,{onArchivoChange:p,funcionEnviarDatos:f})},{key:"2",label:"Archivos subidos",children:t.jsx(v,{dataSource:d,columns:u})}];return t.jsxs("div",{children:[t.jsx("h2",{children:"Documentos del reporte de nomina de estudiantes por periodo"}),t.jsx(E,{children:t.jsx(D,{items:x})})]})};export{H as default};