import{_ as se,d as u,k as ie,r as N,e as E,o as v,c as f,h as C,a as e,t as m,n as _,F as J,l as K,f as a,w,v as D,i as Y,m as A,p as ne,j as ae}from"./index-9b5845e6.js";const x=j=>(ne("data-v-7a6d289b"),j=j(),ae(),j),ce={class:"flex flex-col h-auto bg-[--theme-color]"},re={key:0},ue={class:"flex w-[80%] justify-center ml-[10vw] mt-[30px]"},de={id:"list",class:"my-[30px] overflow-auto"},ve={class:"mx-[30px] my-[25px] flex flex-col text-[--theme-text-major-color]"},fe={class:"flex items-center justify-between"},xe={class:"flex items-center"},pe={class:"flex mb-[10px] text-[18px] font-black select-none transition-all"},be=x(()=>e("div",{class:"flex items-center h-full mx-[10px] text-[12px] text-[--theme-text-major-color-tip]"},[e("p",{class:"text-left"},"保存的每日任务点击按钮更新到任务清单中哦")],-1)),me={class:"w-full"},ye={class:"flex items-center"},ke=["onClick"],ge={class:"flex items-center h-full mx-[20px] text-[12px] text-[--theme-text-major-color-tip]"},he={class:"text-left"},_e=["onClick"],we=x(()=>e("i",{class:"iconfont"},"",-1)),De=[we],je={class:"flex items-center my-[15px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl"},Ce={class:"w-[24px] h-full"},Te=x(()=>e("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),$e=[Te],Se={key:0,id:"listdesc",class:"my-[30px] overflow-auto"},Le={key:0,class:"mx-[30px] flex flex-col"},ze={class:"flex justify-between items-center my-[25px]"},Me={class:"text-[--theme-text-major-color] text-[24px] font-black"},Ie=x(()=>e("i",{class:"iconfont",style:{"font-size":"24px"}},"",-1)),Ve=[Ie],Be={class:"flex text-[14px] font-black overflow-hidden cursor-pointer select-none"},Re={key:0,class:"w-full h-full flex justify-center items-center transition-all duration-1000 absolute pointer-events-none"},Oe={class:"flex my-[25px] flex-col text-[--theme-text-major-color] select-none"},Ue=x(()=>e("p",{class:"flex mb-[10px] text-[14px] select-none"},"备注",-1)),Fe={class:"flex flex-col text-[--theme-text-major-color]"},Ne=x(()=>e("p",{class:"flex mb-[10px] text-[14px] select-none"},"子任务",-1)),Ee={class:"w-full"},Je=["onUpdate:modelValue"],Ke=["onClick"],Ye={class:"flex items-center my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[-15px] px-[15px] rounded-2xl"},Ae={class:"w-[22px] h-full"},Ge=x(()=>e("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),qe=[Ge],He={class:"flex my-[25px] flex-col text-[--theme-text-major-color] select-none"},Pe=x(()=>e("p",{class:"flex mb-[10px] text-[14px] select-none"},"附件",-1)),Qe={class:"border-dotted border-2 border-[--theme-text-major-color] rounded"},We=x(()=>e("p",{class:"text-[--theme-text-major-color]"},"点击此处上传文件",-1)),Xe={__name:"DayTodo",setup(j){let s=JSON.parse(localStorage.getItem("mainData")),l=s.DataTask[0],M=u(0);const y=u(1),T=u(0);ie(()=>{L(),z(),V(),te()});const c=()=>{y.value=0,setTimeout(()=>{y.value=1},0),s.DataTask[M]=l,localStorage.setItem("mainData",JSON.stringify(s)),console.log("datas have updated")},G=()=>{for(let i=0;i<s.DataTask.length;i++)s.tableData.map(function(t){return t.name}).indexOf(s.DataTask[i].name)!=-1?s.tableData[s.tableData.map(function(t){return t.name}).indexOf(s.DataTask[i].name)]=s.DataTask[i]:s.tableData.map(function(t){return t.name}).indexOf(s.DataTask[i].name)==-1&&s.tableData.push(s.DataTask[i])},q=u("每日任务"),$=u(""),H=()=>{l.class=="生活"?l.class="工作":l.class="生活"},S=()=>{l!=null&&(l.class=="生活"?$.value="🎉":$.value="👔")};S();const n=u(0),r=u(""),P=u(1),Q=()=>{r.value="visibility: hidden;"},L=()=>{if(l!=null)switch(l.index){case 0:r.value="visibility: visible;background-color:#252525";break;case 1:r.value="visibility: visible;background-color:#00ff3c";break;case 2:r.value="visibility: visible;background-color:#39ff00";break;case 3:r.value="visibility: visible;background-color:#bbff00";break;case 4:r.value="visibility: visible;background-color:#ffed00";break;case 5:r.value="visibility: visible;background-color:#ffc700";break;case 6:r.value="visibility: visible;background-color:#ffb900";break;case 7:r.value="visibility: visible;background-color:#ff9200";break;case 8:r.value="visibility: visible;background-color:#ff5c00";break;case 9:r.value="visibility: visible;background-color:#ff2500";break;case 10:r.value="visibility: visible;background-color:#ff003d";break;default:r.value="visibility: visible;background-color:#252525";break}},W=i=>{switch(s.DataTask[i].index){case 0:return"visibility: visible;background-color:#252525";case 1:return"visibility: visible;background-color:#00ff3c";case 2:return"visibility: visible;background-color:#39ff00";case 3:return"visibility: visible;background-color:#bbff00";case 4:return"visibility: visible;background-color:#ffed00";case 5:return"visibility: visible;background-color:#ffc700";case 6:return"visibility: visible;background-color:#ffb900";case 7:return"visibility: visible;background-color:#ff9200";case 8:return"visibility: visible;background-color:#ff5c00";case 9:return"visibility: visible;background-color:#ff2500";case 10:return"visibility: visible;background-color:#ff003d";default:return"visibility: visible;background-color:#252525"}};let p=N([]);const z=()=>{if(l!=null)for(let i=0;p.length<l.subaim.length;i++)p.push({pointerStyle:"font-size:24px;opacity: 1;",deleteRound:"margin-left:0;opacity: 1"})};z();const X=i=>{p.splice(i,1),l.subaim.splice(i,1)},k=u(""),I=()=>{k.value&&(p.push({pointerStyle:"font-size:24px;opacity: 1;",deleteRound:"margin-left:0;opacity: 1"}),l.subaim.push({text:k.value,remove:0})),k.value=""},b=N([]),V=()=>{for(let i=0;b.length<s.DataTask.length;i++)s.DataTask[i].remove?b.push({pointerStyle:"font-size:24px;opacity: 1;",deleteLine:"text-decoration:line-through",deleteRound:"margin-left:0;opacity: 1"}):b.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left: 40px;opacity: 0"})};V();const Z=i=>{b.splice(i,1),s.DataTask.splice(i,1),l=void 0},g=u(""),B=()=>{g.value&&(b.push({pointerStyle:"font-size:0px;opacity: 0;",deleteLine:"text-decoration:none",deleteRound:"margin-left: 40px;opacity: 0"}),s.DataTask.push({taskclass:"DataTask",name:g.value,class:"生活",index:5,note:"",subaim:[],document:{},remove:0})),g.value=""},ee=i=>{T.value=1,l=s.DataTask[i],M.value=i,L(),S(),p=[],z(),y.value=0,setTimeout(()=>{y.value=1})},R=()=>{document.addEventListener("keyup",function(i){i.key=="Enter"&&(B(),I())})},O=u("font-size:22px;rotate: 0deg"),U=u(0),F=()=>{U.value++,O.value="font-size:22px;rotate:"+U.value*180+"deg",G()},te=()=>{(s.time.day!=new Date().getDate()||s.time.year!=new Date().getFullYear())&&(F(),s.time.day=new Date().getDate(),s.time.month=new Date().getMonth()+1,s.time.year=new Date().getFullYear(),c())};return(i,t)=>{const oe=E("el-button"),le=E("el-upload");return v(),f("div",ce,[y.value?(v(),f("div",re)):C("",!0),e("div",ue,[e("div",de,[e("div",ve,[e("div",fe,[e("div",xe,[e("p",pe,m(q.value),1),be]),e("div",{class:"mx-[2px] cursor-pointer",onClick:t[0]||(t[0]=o=>(F(),c()))},[e("i",{class:"iconfont activeSpecial",style:_(O.value)},"",4)])]),e("div",me,[(v(!0),f(J,null,K(a(s).DataTask,(o,d)=>(v(),f("div",{class:"flex justify-between w-full my-[5px] relative select-none transition-all",key:d},[e("div",ye,[e("div",{class:"bg-[--theme-background-major-color] flex items-center h-[35px] focus:outline-0 rounded cursor-pointer",onClick:h=>(ee(d),c())},[e("div",{class:"w-[15px] h-[15px] ml-[2px] mr-[16px] rounded-3xl",style:_(W(d))},null,4),e("div",{class:"h-full flex items-center",style:_(b[d].deleteLine)},m(o.name),5),e("div",ge,[e("p",he,m(o.note),1)])],8,ke)]),e("div",{class:"w-[24px] cursor-pointer text-[22px]",onClick:h=>(Z(d),c())},De,8,_e)]))),128)),e("div",je,[e("div",Ce,[e("div",{class:"outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:t[1]||(t[1]=o=>(B(),c()))},$e)]),w(e("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=o=>g.value=o),placeholder:"添加新的任务",class:"w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px]",onKeyup:t[3]||(t[3]=o=>(R(),c()))},null,544),[[D,g.value]])])])])]),T.value%2==1?(v(),f("div",Se,[a(l)!=null?(v(),f("div",Le,[e("div",ze,[e("p",Me,[w(e("input",{type:"text","onUpdate:modelValue":t[4]||(t[4]=o=>a(l).name=o),class:"bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]",onBlur:t[5]||(t[5]=o=>c())},null,544),[[D,a(l).name]])]),e("div",{class:"text-[--theme-text-major-color] font-black mx-[10px] flex items-center select-none hover:text-[#e42a28]",onClick:t[6]||(t[6]=o=>T.value=0)},Ve)]),e("div",Be,[e("div",{class:"w-[100px] h-[40px] bg-[--theme-text-major-color-input] mr-[10px] flex justify-center items-center rounded-3xl text-[--theme-text-major-color] hover:bg-[--theme-class-major-color-hover] active:text-[--theme-text-major-color-active]",onClick:t[7]||(t[7]=o=>(H(),S(),c()))},[e("p",null,m($.value),1),e("p",null,m(a(l).class),1)]),e("div",{class:"w-[40px] h-[40px] bg-[--theme-text-major-color-input] flex justify-center items-center rounded-3xl text-[--theme-color] hover:w-[300px] transition-all duration-700 relative overflow-hidden",onMouseover:t[19]||(t[19]=o=>Q()),onMouseleave:t[20]||(t[20]=o=>L())},[e("div",{class:"w-full h-full z-10 rounded-3xl absolute opacity-100 hover:opacity-0 transition-all duration-700",style:_(r.value)},null,4),e("div",{class:"w-full h-full flex justify-start",onClick:t[18]||(t[18]=o=>c())},[e("div",{class:"h-full w-[10%] bg-[#00ff3c] active:bg-[#00cc2f]",style:{"border-radius":"50% 0 0 50%"},onClick:t[8]||(t[8]=o=>(n.value=1,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#39ff00] active:bg-[#2dcc00]",onClick:t[9]||(t[9]=o=>(n.value=2,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#bbff00] active:bg-[#95cc00]",onClick:t[10]||(t[10]=o=>(n.value=3,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ffed00] active:bg-[#ccbd00]",onClick:t[11]||(t[11]=o=>(n.value=4,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ffc700] active:bg-[#cc9f00]",onClick:t[12]||(t[12]=o=>(n.value=5,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ffb900] active:bg-[#cc9300]",onClick:t[13]||(t[13]=o=>(n.value=6,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ff9200] active:bg-[#cc7400]",onClick:t[14]||(t[14]=o=>(n.value=7,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ff5c00] active:bg-[#cc4900]",onClick:t[15]||(t[15]=o=>(n.value=8,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ff2500] active:bg-[#cc1d00]",onClick:t[16]||(t[16]=o=>(n.value=9,a(l).index=n.value))}),e("div",{class:"h-full w-[10%] bg-[#ff003d] active:bg-[#cc0030]",style:{"border-radius":"0 50% 50% 0"},onClick:t[17]||(t[17]=o=>(n.value=10,a(l).index=n.value))})]),P.value?(v(),f("p",Re,"优先级："+m(a(l).index),1)):C("",!0)],32)]),e("div",Oe,[Ue,w(e("input",{type:"text",placeholder:"➕在这里输入备注","onUpdate:modelValue":t[21]||(t[21]=o=>a(l).note=o),class:"bg-[--theme-background-major-color] focus:bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[10px] mx-[-10px]",onBlur:t[22]||(t[22]=o=>c())},null,544),[[D,a(l).note]])]),e("div",Fe,[Ne,e("div",Ee,[(v(!0),f(J,null,K(a(l).subaim,(o,d)=>(v(),f("div",{class:"flex w-full items-center my-[5px] relative select-none",key:d},[w(e("input",{type:"text","onUpdate:modelValue":h=>o.text=h,class:"w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded",onBlur:t[23]||(t[23]=h=>c())},null,40,Je),[[D,o.text]]),e("div",{class:"w-[24px] cursor-pointer text-[22px]",onClick:h=>(X(d),c())},[e("i",{class:"iconfont",style:_(a(p)[d].deleteRound)},"",4)],8,Ke)]))),128)),e("div",Ye,[w(e("input",{type:"text","onUpdate:modelValue":t[24]||(t[24]=o=>k.value=o),placeholder:"添加新的子任务",class:"w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded px-[2px]",onKeyup:t[25]||(t[25]=o=>(R(),c()))},null,544),[[D,k.value]]),e("div",Ae,[e("div",{class:"outline outline-2 w-[18px] h-[18px] z-10 select-none cursor-pointer rounded-3xl flex items-center justify-center",onClick:t[26]||(t[26]=o=>(I(),c()))},qe)])])])]),e("div",He,[Pe,Y(le,{class:"w-[29vw] min-w-[330px]",action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",multiple:""},{default:A(()=>[e("div",Qe,[Y(oe,{color:"var(--theme-background-major-color)",class:"w-[29vw] min-w-[330px]",type:"primary"},{default:A(()=>[We]),_:1})])]),_:1})])])):C("",!0)])):C("",!0)])])}}},et=se(Xe,[["__scopeId","data-v-7a6d289b"]]);export{et as default};
