import{r as s,b as y,s as b,j as a,T as E,c as l,d as i,e as d}from"./index-aff8c025.js";import{D as j}from"./DraggerComponent-435d9f45.js";import{E as c}from"./ExcelService-e5139f15.js";import{h as v,D as C}from"./moment-a52dbd2d.js";import{C as S,T as A}from"./index-54e651da.js";import{T as I}from"./Table-29551d85.js";import"./index-7ff15e56.js";import"./context-5f51aab9.js";import"./useForceUpdate-a70ac771.js";import"./EyeOutlined-9f393984.js";import"./row-0e000846.js";import"./styleChecker-5146645c.js";import"./scrollTo-e0f35868.js";import"./BaseInput-08586a27.js";import"./index-3468cdee.js";import"./TextArea-97b9cd34.js";const N=()=>{const[m,p]=s.useState([]),r=y(),[h,u]=s.useState(null);b("#FE7072");const f=[{align:"right",key:"numero",dataIndex:"numero",title:"#"},{align:"center",key:"periodo",dataIndex:"periodo",title:"Periodo"},{align:"center",key:"carrera",dataIndex:"carrera",title:"Carrera"},{align:"center",key:"fecha_creacion",dataIndex:"fecha_creacion",title:"Fecha creacion"},{align:"center",key:"accion",dataIndex:"accion",title:"Acción"}],g=(e,o)=>{c.eliminarDatosTasaDesercion({id:e,id_carrera:o}).then(n=>{t()}).catch(n=>{console.log(n)})},D=m.map((e,o)=>({key:o,numero:o+1,periodo:e.codigo,carrera:e.carrera,fecha_creacion:v(e.created_at).format("DD/MM/YYYY"),accion:a.jsx(E,{title:"Borrar todos los datos de este periodo",children:a.jsx(C,{onClick:()=>g(e.id,e.id_carrera),style:{fontSize:"25px",cursor:"pointer"}})})})),t=()=>{r(l()),c.obtenerHistorialPeriodoTasaDesercion().then(e=>{e.data.ok&&p(e.data.periodos)}).catch(e=>{r(i({success:!1,title:"Error al cargar datos del excel",message:e.response.data.error}))}).finally(()=>r(d()))};s.useEffect(()=>{t()},[]);const x=e=>{u(e)},T=async()=>{r(l()),await c.registrarDatosExcel({file:h}).then(e=>{e.data.ok&&(r(i({success:!0,title:e.data.message,message:""})),t())}).catch(e=>{r(i({success:!1,title:"Error al cargar datos del excel",message:e.response.data.error}))}).finally(()=>{r(d())})},k=[{key:"1",label:"Subir Documento",children:a.jsx(j,{onArchivoChange:x,funcionEnviarDatos:T})},{key:"2",label:"Archivos subidos",children:a.jsx(I,{dataSource:D,columns:f})}];return a.jsxs("div",{children:[a.jsx("h2",{children:"Documentos del indicador tasa de deserción"}),a.jsx(S,{children:a.jsx(A,{items:k})})]})};export{N as default};