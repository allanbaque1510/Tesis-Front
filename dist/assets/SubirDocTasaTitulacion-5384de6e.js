import{r as i,s as y,b,j as a,T as E,c as l,d as s,e as d}from"./index-15240922.js";import{D as j}from"./DraggerComponent-c3e776bd.js";import{E as c}from"./ExcelService-2ca9fc3b.js";import{h as v,D as C}from"./moment-aa003103.js";import{C as S,T as P}from"./index-6ab464cc.js";import{T as _}from"./Table-b4bf00f1.js";import"./index-65b65a6c.js";import"./context-70b9985a.js";import"./useForceUpdate-d8c4c42e.js";import"./EyeOutlined-f74af4a3.js";import"./row-5d227883.js";import"./styleChecker-bc4901ce.js";import"./scrollTo-528c30a2.js";import"./BaseInput-d53a2d9c.js";import"./index-be7a82b5.js";import"./TextArea-a7b7f909.js";const N=()=>{const[m,p]=i.useState([]);y("#FE7072");const o=b(),[u,h]=i.useState(null),f=[{align:"right",key:"numero",dataIndex:"numero",title:"#"},{align:"center",key:"periodo",dataIndex:"periodo",title:"Periodo"},{align:"center",key:"carrera",dataIndex:"carrera",title:"Carrera"},{align:"center",key:"fecha_creacion",dataIndex:"fecha_creacion",title:"Fecha creacion"},{align:"center",key:"accion",dataIndex:"accion",title:"Acción"}],g=(e,r)=>{c.eliminarDatosTasaTitulacion({id:e,id_carrera:r}).then(n=>{t()}).catch(n=>{console.log(n)})},x=m.map((e,r)=>({key:r,numero:r+1,periodo:e.periodo,carrera:e.carrera,fecha_creacion:v(e.created_at).format("DD/MM/YYYY"),accion:a.jsx(E,{title:"Borrar todos los datos de este periodo",children:a.jsx(C,{onClick:()=>g(e.id,e.id_carrera),style:{fontSize:"25px",cursor:"pointer"}})})})),t=()=>{o(l()),c.obtenerHistorialPeriodoTasaTitulacion().then(e=>{e.data.ok&&p(e.data.periodos)}).catch(e=>{o(s({success:!1,title:"Error al cargar datos del excel",message:e.response.data.error}))}).finally(()=>o(d()))};i.useEffect(()=>{t()},[]);const T=e=>{h(e)},D=async()=>{o(l()),await c.registrarDatosExcelPeriodoTitulacion({file:u}).then(e=>{e.data.ok&&(o(s({success:!0,title:e.data.message,message:""})),t())}).catch(e=>{o(s({success:!1,title:"Error al cargar datos del excel",message:e.response.data.error}))}).finally(()=>{o(d())})},k=[{key:"1",label:"Subir Documento",children:a.jsx(j,{onArchivoChange:T,funcionEnviarDatos:D})},{key:"2",label:"Archivos subidos",children:a.jsx(_,{dataSource:x,columns:f})}];return a.jsxs("div",{children:[a.jsx("h2",{children:"Documentos del indicador tasa de titulación"}),a.jsx(S,{children:a.jsx(P,{items:k})})]})};export{N as default};