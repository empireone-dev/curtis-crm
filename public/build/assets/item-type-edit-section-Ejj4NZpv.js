import{r as o,j as e,s as j}from"./store-CorJ7S5Q.js";import{D as E}from"./drawer-FykPyzkH.js";import{u as N}from"./item-types-thunk-T6wituxr.js";import{P as S}from"./PencilSquareIcon-CfKxK5QP.js";import"./XMarkIcon-B6N7Icek.js";import"./transition-CHQexzJ9.js";import"./dialog-DvLi0VXB.js";function I({data:r}){o.useState("");const[n,c]=o.useState({}),[f,i]=o.useState(!1),[l,a]=o.useState(!1),[d,p]=o.useState({x:0,y:0});o.useEffect(()=>{c(r)},[r]),o.useEffect(()=>{if(l){const t=()=>{a(!1)};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}}},[l]);const b=t=>{const s=t.target.getBoundingClientRect(),h=window.pageYOffset||document.documentElement.scrollTop,m=110,w=25,y=s.left+window.pageXOffset+s.width+m<window.innerWidth?s.right+window.pageXOffset:s.left+window.pageXOffset-m,v=s.top+h-w;p({x:y,y:v}),a(!0)},x=()=>{a(!1)},u=()=>{i(!1)},g=async t=>{t.preventDefault(),j.dispatch(N(n)),u()};return e.jsxs("div",{children:[e.jsxs("button",{onClick:()=>i(!0),type:"button",className:" text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center",onMouseEnter:t=>b(t),onMouseLeave:()=>x(),children:[e.jsx(S,{className:"h-6 text-white"}),l&&e.jsx("span",{className:"tooltip bg-black text-white text-md rounded-xl p-3 absolute z-50",style:{top:d.y+window.pageYOffset,left:d.x},children:"Edit Item Type"})]}),e.jsx(E,{open:f,setOpen:i,title:"Edit Item Types",children:e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{htmlFor:"first_name",className:"block mb-1 text-sm font-medium text-gray-900",children:"Name"}),e.jsx("input",{type:"text",id:"first_name",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ",value:n.name??"",onChange:t=>c({...n,name:t.target.value})})]}),e.jsxs("div",{className:"mb-2 mt-5 flex items-center justify-end gap-x-6",children:[e.jsx("button",{type:"button",className:"text-sm font-semibold leading-6 text-gray-900 hover:text-slate-400",onClick:u,children:"Cancel"}),e.jsx("button",{type:"submit",className:"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Save"})]})]})})]})}export{I as default};