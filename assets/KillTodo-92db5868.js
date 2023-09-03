import{_ as ve,k as xe,d as b,r as q,e as G,o as p,c as f,h as y,a as t,t as k,F as H,l as P,f as c,w as $,v as L,n as _,i as Q,m as W,q as pe,p as fe,j as me}from"./index-9b5845e6.js";const u=z=>(fe("data-v-25733c96"),z=z(),me(),z),be={class:"flex flex-col h-auto bg-[--theme-color]"},he={key:0},ye={class:"w-[55vw] h-[50px] bg-[--theme-background-major-color] rounded-xl mt-[30px] mx-[10vw] flex items-center overflow-hidden min-w-[310px]"},ge={class:"h-[20px] flex items-center mx-[10px]",style:{"border-right":"1px solid var(--theme-text-major-color-active)"},id:"phonehidden"},ke=u(()=>t("i",{class:"iconfont",style:{"font-size":"24px"}},"",-1)),_e=u(()=>t("p",{class:"mx-[5px] w-[90px] font-black"},"清除已完成",-1)),we=[ke,_e],De=u(()=>t("i",{class:"iconfont"},"",-1)),je=u(()=>t("p",{class:"mx-[5px] w-[70px] font-black"},"任务详细",-1)),Ce=[De,je],Se={class:"h-[20px] flex items-center",style:{"border-right":"1px solid var(--theme-text-major-color-active)"},id:"phonehidden"},$e=u(()=>t("i",{class:"iconfont",style:{"font-size":"24px"}},"",-1)),Le=u(()=>t("p",{class:"mx-[5px] w-[40px] font-black"},"工作",-1)),ze=[$e,Le],Te=u(()=>t("i",{class:"iconfont"},"",-1)),Me=u(()=>t("p",{class:"mx-[5px] w-[40px] font-black"},"生活",-1)),Re=[Te,Me],Ve=u(()=>t("i",{class:"iconfont"},"",-1)),Ie=u(()=>t("p",{class:"mx-[5px] w-[40px] font-black"},"全部",-1)),Be=[Ve,Ie],Ne={class:"h-[20px] flex items-center",id:"phoneshow"},Oe=u(()=>t("i",{class:"iconfont",style:{"font-size":"18px"}},"",-1)),Ue=u(()=>t("p",{class:"mx-[5px] w-[90px] font-black"},"优先级排序",-1)),Fe=[Oe,Ue],Ke=u(()=>t("i",{class:"iconfont",style:{"font-size":"18px"}},"",-1)),Ee=u(()=>t("p",{class:"mx-[5px] w-[90px] font-black"},"完成度排序",-1)),Ae=[Ke,Ee],Je={class:"flex w-auto ml-[10vw] flex-wrap mt-[30px]"},Ye={id:"list",class:"my-[30px] overflow-auto"},qe={key:0,class:"mx-[30px] my-[25px] flex flex-col text-[--theme-text-major-color]"},Ge={class:"flex items-center h-full text-[12px]"},He={class:"flex mb-[10px] text-[18px] select-none"},Pe=u(()=>t("p",{class:"text-left mx-[10px] text-[--theme-text-major-color-tip]"},"注意任务清单中的修改不会影响每日任务哦",-1)),Qe={class:"w-full"},We={key:0},Xe={class:"flex w-full items-center"},Ze={class:"w-[24px] h-full"},et=["onClick"],tt=["onClick"],ot={key:0,class:"text-left flex items-center"},lt=u(()=>t("i",{class:"iconfont",style:{"font-size":"12px"}},"",-1)),st={class:"flex items-center text-[12px] mx-[6px]"},it=["onClick"],at={key:0,class:"flex flex-col mx-[30px] text-[12px] text-[--theme-text-major-color-tip]"},nt={class:"text-left"},ct={class:"flex items-center my-[15px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl"},rt={class:"w-[24px] h-full"},ut=u(()=>t("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),dt=[ut],vt={key:0,id:"listdesc",class:"my-[30px] overflow-auto"},xt={key:0,class:"mx-[30px] flex flex-col"},pt={class:"flex justify-between items-center my-[25px]"},ft={class:"text-[--theme-text-major-color] text-[24px] font-black"},mt=u(()=>t("i",{class:"iconfont",style:{"font-size":"24px"}},"",-1)),bt=[mt],ht={class:"flex text-[14px] font-black overflow-hidden cursor-pointer select-none"},yt={key:0,class:"w-full h-full flex justify-center items-center transition-all duration-1000 absolute pointer-events-none"},gt={class:"flex my-[25px] flex-col text-[--theme-text-major-color] select-none"},kt=u(()=>t("p",{class:"flex mb-[10px] text-[14px] select-none"},"备注",-1)),_t={class:"flex flex-col text-[--theme-text-major-color]"},wt=u(()=>t("p",{class:"flex mb-[10px] text-[14px] select-none"},"子任务",-1)),Dt={class:"w-full"},jt={class:"w-[24px] h-full"},Ct=["onClick"],St=["disabled","onUpdate:modelValue"],$t=["onClick"],Lt={class:"flex items-center my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl"},zt={class:"w-[24px] h-full"},Tt=u(()=>t("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),Mt=[Tt],Rt={class:"flex my-[25px] flex-col text-[--theme-text-major-color] select-none"},Vt=u(()=>t("p",{class:"flex mb-[10px] text-[14px] select-none"},"附件",-1)),It={class:"border-dotted border-2 border-[--theme-text-major-color] rounded"},Bt=u(()=>t("p",{class:"text-[--theme-text-major-color]"},"点击此处上传文件",-1)),Nt={__name:"KillTodo",setup(z){xe(()=>{I(),B(),U(),de()});let s=JSON.parse(localStorage.getItem("mainData")),a=s.tableData[0],N=b(0);const g=b(1),X=b(1),M=b(1),r=()=>{M.value=0,setTimeout(()=>{M.value=1},0),s.tableData[N]=a,localStorage.setItem("mainData",JSON.stringify(s)),console.log("datas have updated")},R=b(""),Z=()=>{a.class=="生活"?a.class="工作":a.class="生活"},V=()=>{a!=null&&(a.class=="生活"?R.value="🎉":R.value="👔")};V();const v=b(0),m=b(""),ee=b(1),te=()=>{m.value="visibility: hidden;"},I=()=>{if(a!=null)switch(a.index){case 0:m.value="visibility: visible;background-color:#252525";break;case 1:m.value="visibility: visible;background-color:#00ff3c";break;case 2:m.value="visibility: visible;background-color:#39ff00";break;case 3:m.value="visibility: visible;background-color:#bbff00";break;case 4:m.value="visibility: visible;background-color:#ffed00";break;case 5:m.value="visibility: visible;background-color:#ffc700";break;case 6:m.value="visibility: visible;background-color:#ffb900";break;case 7:m.value="visibility: visible;background-color:#ff9200";break;case 8:m.value="visibility: visible;background-color:#ff5c00";break;case 9:m.value="visibility: visible;background-color:#ff2500";break;case 10:m.value="visibility: visible;background-color:#ff003d";break;default:m.value="visibility: visible;background-color:#252525";break}};let x=q([]);const B=()=>{if(a!=null)for(let l=0;x.length<a.subaim.length;l++)a.subaim[l].remove?x.push({pointerStyle:"font-size:24px;opacity: 1;",deleteLine:"text-decoration:line-through",deleteRound:"margin-left:0;opacity: 1"}):x.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left:40px;opacity: 0"})};B();const oe=(l,e)=>{e?(x[l].pointerStyle="font-size:24px;opacity: 1;",setTimeout(()=>{x[l].deleteLine="text-decoration:line-through",x[l].deleteRound="margin-left:0;opacity: 1"})):(x[l].pointerStyle="font-size:0px;opacity: 0;",x[l].deleteLine="text-decoration:none",x[l].deleteRound="margin-left:40px;opacity: 0")},le=l=>{x.splice(l,1),a.subaim.splice(l,1)},j=b(""),O=()=>{j.value&&(x.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left:100px;opacity: 0"}),a.subaim.push({text:j.value,remove:0})),j.value=""},d=q([]),U=()=>{for(let l=0;d.length<s.tableData.length;l++)s.tableData[l].remove?d.push({pointerStyle:"font-size:24px;opacity: 1;",deleteLine:"text-decoration:line-through",deleteRound:"margin-left:0;opacity: 1"}):d.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left: 40px;opacity: 0"})};U();const C=(l,e)=>{if(e){if(s.time.bindMainSub)for(let n=0;n<s.tableData[l].subaim.length;n++)s.tableData[l].subaim[n].remove=1,g.value=0;d[l].pointerStyle="font-size:24px;opacity: 1;",d[l].deleteLine="text-decoration:line-through",setTimeout(()=>{d[l].deleteRound="margin-left:0;opacity: 1"},100)}else{if(s.time.bindMainSub)for(let n=0;n<s.tableData[l].subaim.length;n++)s.tableData[l].subaim[n].remove=0,g.value=0;d[l].pointerStyle="font-size:0px;opacity: 0;",d[l].deleteLine="text-decoration:none",d[l].deleteRound="margin-left: 40px;opacity: 0"}},se=l=>{d.splice(l,1),s.tableData.splice(l,1),g.value=0,a=void 0},S=b(""),F=()=>{S.value&&(d.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left: 40px;opacity: 0"}),s.tableData.push({taskclass:"tableData",name:S.value,class:"生活",index:5,note:"",subaim:[],document:{},remove:0})),S.value=""},K=()=>{document.addEventListener("keyup",function(l){l.key=="Enter"&&(F(),O(),r())})},ie=l=>{a=s.tableData[l],N.value=l,I(),V(),x=[],B(),g.value=0,setTimeout(()=>{g.value=1})},ae=l=>{switch(s.tableData[l].index){case 0:return"visibility: visible;background-color:#252525";case 1:return"visibility: visible;background-color:#00ff3c";case 2:return"visibility: visible;background-color:#39ff00";case 3:return"visibility: visible;background-color:#bbff00";case 4:return"visibility: visible;background-color:#ffed00";case 5:return"visibility: visible;background-color:#ffc700";case 6:return"visibility: visible;background-color:#ffb900";case 7:return"visibility: visible;background-color:#ff9200";case 8:return"visibility: visible;background-color:#ff5c00";case 9:return"visibility: visible;background-color:#ff2500";case 10:return"visibility: visible;background-color:#ff003d";default:return"visibility: visible;background-color:#252525"}},E=l=>{let e=0;for(let n=0;n<s.tableData[l].subaim.length;n++)e+=s.tableData[l].subaim[n].remove;return s.time.bindMainSub&&(e==s.tableData[l].subaim.length?(s.tableData[l].remove=1,d[l].pointerStyle="font-size:24px;opacity: 1;",d[l].deleteLine="text-decoration:line-through",setTimeout(()=>{d[l].deleteRound="margin-left:0;opacity: 1"},100)):e<s.tableData[l].subaim.length&&(s.tableData[l].remove=0,d[l].pointerStyle="font-size:0px;opacity: 0;",d[l].deleteLine="text-decoration:none",d[l].deleteRound="margin-left: 40px;opacity: 0")),e},A=()=>{for(let l=0;l<s.tableData.length;l++)s.tableData[l].remove&&(d.splice(l,1),s.tableData.splice(l,1),A());g.value=0,a=void 0},D=b("all"),T=b("任务列表"),ne=l=>{if(D.value=="all")return T.value="任务列表",1;if(D.value=="life")return T.value="生活",l=="生活";if(D.value=="work")return T.value="工作",l=="工作"},J=b(0),ce=l=>{if(l%2==1){s.tableData.sort((e,n)=>e.index-n.index);for(let e=0;e<s.tableData.length;e++)C(e,s.tableData[e].remove)}else if(l%2==0){s.tableData.sort((e,n)=>n.index-e.index);for(let e=0;e<s.tableData.length;e++)C(e,s.tableData[e].remove)}},Y=b(0),re=l=>{let e=0,n=[];for(let o=0;o<s.tableData.length;o++){for(let i=0;i<s.tableData[o].subaim.length;i++)e+=s.tableData[o].subaim[i].remove;e=e/s.tableData[o].subaim.length,n.push(e),e=0}let h=0;if(l%2==1){for(let o=0;o<n.length;o++)for(let i=0;i<o+1;i++)n[i]>n[o]&&(h=n[i],n[i]=n[o],n[o]=h,h=s.tableData[i],s.tableData[i]=s.tableData[o],s.tableData[o]=h);for(let o=0;o<s.tableData.length;o++)C(o,s.tableData[o].remove)}else{for(let o=0;o<n.length;o++)for(let i=0;i<o+1;i++)n[i]<n[o]&&(h=n[i],n[i]=n[o],n[o]=h,h=s.tableData[i],s.tableData[i]=s.tableData[o],s.tableData[o]=h);for(let o=0;o<s.tableData.length;o++)C(o,s.tableData[o].remove)}},ue=()=>{for(let l=0;l<s.DataTask.length;l++)s.tableData.map(function(e){return e.name}).indexOf(s.DataTask[l].name)!=-1?s.tableData[s.tableData.map(function(e){return e.name}).indexOf(s.DataTask[l].name)]=s.DataTask[l]:s.tableData.map(function(e){return e.name}).indexOf(s.DataTask[l].name)==-1&&s.tableData.push(s.DataTask[l])},de=()=>{(s.time.day!=new Date().getDate()||s.time.year!=new Date().getFullYear())&&(ue(),s.time.day=new Date().getDate(),s.time.year=new Date().getFullYear(),r())};return(l,e)=>{const n=G("el-button"),h=G("el-upload");return p(),f("div",be,[M.value?(p(),f("div",he)):y("",!0),t("div",ye,[t("div",ge,[t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",title:"点击清除已完成清单",onClick:e[0]||(e[0]=o=>(A(),r()))},we),t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[1]||(e[1]=o=>(g.value++,r())),title:"点击开启/关闭任务详细"},Ce)]),t("div",Se,[t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[2]||(e[2]=o=>(D.value="work",r()))},ze),t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[3]||(e[3]=o=>(D.value="life",r()))},Re),t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[4]||(e[4]=o=>(D.value="all",r()))},Be)]),t("div",Ne,[t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[5]||(e[5]=o=>(J.value++,ce(J.value),r()))},Fe),t("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:e[6]||(e[6]=o=>(Y.value++,re(Y.value),r()))},Ae)])]),t("div",Je,[t("div",Ye,[X.value%2==1?(p(),f("div",qe,[t("div",Ge,[t("p",He,k(T.value),1),Pe]),t("div",Qe,[(p(!0),f(H,null,P(c(s).tableData,(o,i)=>(p(),f("div",{class:"flex w-full flex-col my-[5px] relative select-none transition-all",key:i},[ne(o.class)?(p(),f("div",We,[t("div",Xe,[t("div",Ze,[t("div",{class:"outline outline-2 w-[16px] h-[16px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:w=>(o.remove=(o.remove+1)%2,C(i,o.remove),r())},[t("i",{class:"iconfont",style:_(d[i].pointerStyle)},"",4)],8,et)]),t("div",{class:"w-full bg-[--theme-background-major-color] flex items-center h-[35px] focus:outline-0 rounded px-[10px] cursor-pointer",onClick:w=>(ie(i),r())},[t("div",{class:"h-full flex items-center",style:_(d[i].deleteLine)},k(o.name),5),t("div",{class:"w-[10px] h-[10px] mx-[10px] rounded-3xl",style:_(ae(i))},null,4),o.subaim.length?(p(),f("div",ot,[lt,t("div",st,[t("p",null,k(E(i)),1),pe("/"),t("p",null,k(o.subaim.length),1)])])):y("",!0)],8,tt),o.remove?(p(),f("div",{key:0,class:"w-[24px] cursor-pointer text-[22px]",onClick:w=>(se(i),r())},[t("i",{class:"iconfont",style:_(d[i].deleteRound)},"",4)],8,it)):y("",!0)]),o.remove?y("",!0):(p(),f("div",at,[t("p",nt,k(o.note),1)]))])):y("",!0)]))),128)),t("div",ct,[t("div",rt,[t("div",{class:"outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:e[7]||(e[7]=o=>(F(),r()))},dt)]),$(t("input",{type:"text","onUpdate:modelValue":e[8]||(e[8]=o=>S.value=o),placeholder:"添加新的任务",class:"w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px]",onKeyup:e[9]||(e[9]=o=>(K(),r()))},null,544),[[L,S.value]])])])])):y("",!0)]),g.value%2==1?(p(),f("div",vt,[c(a)!=null?(p(),f("div",xt,[t("div",pt,[t("p",ft,[$(t("input",{type:"text","onUpdate:modelValue":e[10]||(e[10]=o=>c(a).name=o),class:"bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]",onBlur:e[11]||(e[11]=o=>r())},null,544),[[L,c(a).name]])]),t("div",{class:"text-[--theme-text-major-color] font-black mx-[10px] flex items-center select-none hover:text-[#e42a28]",onClick:e[12]||(e[12]=o=>g.value=0)},bt)]),t("div",ht,[t("div",{class:"w-[100px] h-[40px] bg-[--theme-text-major-color-input] mr-[10px] flex justify-center items-center rounded-3xl text-[--theme-text-major-color] hover:bg-[--theme-class-major-color-hover] active:text-[--theme-text-major-color-active]",onClick:e[13]||(e[13]=o=>(Z(),V(),r()))},[t("p",null,k(R.value),1),t("p",null,k(c(a).class),1)]),t("div",{class:"w-[40px] h-[40px] bg-[--theme-text-major-color-input] flex justify-center items-center rounded-3xl text-[#000000] hover:w-[300px] transition-all duration-700 relative overflow-hidden",onMouseover:e[25]||(e[25]=o=>te()),onMouseleave:e[26]||(e[26]=o=>I())},[t("div",{class:"w-full h-full z-10 rounded-3xl absolute opacity-100 hover:opacity-0 transition-all duration-700",style:_(m.value)},null,4),t("div",{class:"w-full h-full flex justify-start",onClick:e[24]||(e[24]=o=>r())},[t("div",{class:"h-full w-[10%] bg-[#00ff3c] active:bg-[#00cc2f]",style:{"border-radius":"50% 0 0 50%"},onClick:e[14]||(e[14]=o=>(v.value=1,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#39ff00] active:bg-[#2dcc00]",onClick:e[15]||(e[15]=o=>(v.value=2,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#bbff00] active:bg-[#95cc00]",onClick:e[16]||(e[16]=o=>(v.value=3,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ffed00] active:bg-[#ccbd00]",onClick:e[17]||(e[17]=o=>(v.value=4,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ffc700] active:bg-[#cc9f00]",onClick:e[18]||(e[18]=o=>(v.value=5,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ffb900] active:bg-[#cc9300]",onClick:e[19]||(e[19]=o=>(v.value=6,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ff9200] active:bg-[#cc7400]",onClick:e[20]||(e[20]=o=>(v.value=7,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ff5c00] active:bg-[#cc4900]",onClick:e[21]||(e[21]=o=>(v.value=8,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ff2500] active:bg-[#cc1d00]",onClick:e[22]||(e[22]=o=>(v.value=9,c(a).index=v.value))}),t("div",{class:"h-full w-[10%] bg-[#ff003d] active:bg-[#cc0030]",style:{"border-radius":"0 50% 50% 0"},onClick:e[23]||(e[23]=o=>(v.value=10,c(a).index=v.value))})]),ee.value?(p(),f("p",yt,"优先级："+k(c(a).index),1)):y("",!0)],32)]),t("div",gt,[kt,$(t("input",{type:"text",placeholder:"➕在这里输入备注","onUpdate:modelValue":e[27]||(e[27]=o=>c(a).note=o),class:"bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]",onBlur:e[28]||(e[28]=o=>r())},null,544),[[L,c(a).note]])]),t("div",_t,[wt,t("div",Dt,[(p(!0),f(H,null,P(c(a).subaim,(o,i)=>(p(),f("div",{class:"flex w-full items-center my-[5px] relative select-none",key:i},[t("div",jt,[t("div",{class:"outline outline-2 w-[16px] h-[16px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:w=>(c(a).subaim[i].remove=(c(a).subaim[i].remove+1)%2,oe(i,c(a).subaim[i].remove),E(i),r())},[t("i",{class:"iconfont",style:_(c(x)[i].pointerStyle)},"",4)],8,Ct)]),$(t("input",{type:"text",disabled:o.remove%2==1,"onUpdate:modelValue":w=>o.text=w,class:"w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded px-[10px]",style:_(c(x)[i].deleteLine),onBlur:e[29]||(e[29]=w=>r())},null,44,St),[[L,o.text]]),c(a).subaim[i].remove?(p(),f("div",{key:0,class:"w-[24px] cursor-pointer text-[22px]",onClick:w=>(le(i),r())},[t("i",{class:"iconfont",style:_(c(x)[i].deleteRound)},"",4)],8,$t)):y("",!0)]))),128)),t("div",Lt,[t("div",zt,[t("div",{class:"outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:e[30]||(e[30]=o=>(O(),r()))},Mt)]),$(t("input",{type:"text","onUpdate:modelValue":e[31]||(e[31]=o=>j.value=o),placeholder:"添加新的子任务",class:"w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px]",onKeyup:e[32]||(e[32]=o=>(K(),r()))},null,544),[[L,j.value]])])])]),t("div",Rt,[Vt,Q(h,{class:"w-[29vw] min-w-[330px]",action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",multiple:""},{default:W(()=>[t("div",It,[Q(n,{color:"var(--theme-background-major-color)",class:"w-[29vw] min-w-[330px]",type:"primary"},{default:W(()=>[Bt]),_:1})])]),_:1})])])):y("",!0)])):y("",!0)])])}}},Ut=ve(Nt,[["__scopeId","data-v-25733c96"]]);export{Ut as default};
