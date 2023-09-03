import{_ as H,k as P,d as m,r as Q,o as r,c as d,h as u,a as o,w as y,v as w,n as k,F as B,l as V,f as F,t as C,p as W,j as X}from"./index-9b5845e6.js";const p=v=>(W("data-v-220a427e"),v=v(),X(),v),Y={class:"w-full h-full flex flex-col relative overflow-auto"},Z={key:0},ee={class:"w-[45.5vw] h-[50px] bg-[--theme-background-major-color] rounded-xl mt-[30px] mx-[10vw] flex items-center overflow-hidden min-w-[270px] max-w-[700px] select-none"},te={class:"h-[20px] flex items-center mx-[10px]",id:"phoneshow"},oe=p(()=>o("i",{class:"iconfont",style:{"font-size":"20px"}},"",-1)),le=p(()=>o("p",{class:"mx-[5px] w-[90px] font-black"},"浏览模式",-1)),se=[oe,le],ne=p(()=>o("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),ae=p(()=>o("p",{class:"mx-[5px] w-[70px] font-black"},"一键收起",-1)),ie=[ne,ae],ce={class:"h-[20px] flex items-center",style:{"border-left":"1px solid --theme-text-major-color-active"},id:"phonehidden"},re={class:"flex items-center ml-[20px]"},de={class:"flex"},pe=p(()=>o("i",{class:"iconfont activeSpecial",style:{"font-size":"22px"}},"",-1)),xe=[pe],me={class:"flex flex-wrap items-start h-[90vh] ml-[10vw] text-left"},ue={class:"h-full px-[5px] w-[45px] flex flex-col items-center justify-between relative"},he={class:"w-[20px] h-full overflow-hidden top-[10px]",style:{"word-break":"break-all"}},ve={class:"w-[20px] h-full my-[10px] text-[--theme-text-major-color] bg-[--theme-background-major-color] overflow-auto"},fe={class:"mb-[15px] mt-[20px] bottom-[10px] select-none"},_e=["onClick"],ge=p(()=>o("br",null,null,-1)),be=["onClick"],ye={key:0,class:"flex flex-col border-solid border-l-2 border-[--theme-class-major-color-hover] justify-start overflow-auto"},we={key:0,class:"flex w-full items-center justify-between relative select-none bg-[--theme-text-major-color-input]"},ke={class:"flex flex-col h-[35px] mr-[20px]"},je=["onUpdate:modelValue","onFocus","onBlur"],Se={for:"label",class:"h-0 invisible opacity-0 px-[20px]"},Ee={class:"w-[24px] mr-[18px] cursor-pointer text-[22px]"},Ce=["onClick"],Te={class:"w-full"},$e={class:"flex flex-col w-full h-[35px]"},Le=["disabled","onUpdate:modelValue","onFocus","onBlur"],De={for:"label",class:"h-0 invisible opacity-0 px-[20px]"},Me=["onClick"],ze=p(()=>o("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),Be=[ze],Ve={key:0,class:"flex items-center justify-between my-[5px] relative select-none bg-[--theme-text-major-color-input] mx-[5px] pr-[15px] rounded-2xl"},Fe=["onUpdate:modelValue","onKeyup"],Ie={class:"w-[22px] h-full"},Ue=["onClick"],Ne=p(()=>o("i",{class:"iconfont",style:{"font-size":"22px"}},"",-1)),Oe=[Ne],Je=p(()=>o("div",{class:"h-[200px] w-[200px] rounded-full border-dotted border-[--theme-class-major-color-hover] border-[3px] relative flex items-center"},[o("div",{class:"h-[120px] w-[30px] absolute left-[85px] top-[40px] bg-[--theme-class-major-color-hover] rounded-3xl"}),o("div",{class:"h-[30px] w-[120px] absolute left-[40px] top-[85px] bg-[--theme-class-major-color-hover] rounded-3xl"})],-1)),Ke=[Je],Ae={__name:"MainList",setup(v){let h=JSON.parse(localStorage.getItem("mainData")),t=h.MainList;P(()=>{f(),t[t.length-1].name||(t.splice(t.length-1,1),l.splice(t.length-1,1)),L()});const j=m(1),S=m(0),c=()=>{S.value==1&&(z(),S.value=0),j.value=0,setTimeout(()=>{j.value=1},0),h.MainList=t,localStorage.setItem("mainData",JSON.stringify(h)),console.log("datas have updated")},l=Q([]),f=()=>{for(let e=0;l.length<t.length;e++)l.push({titleEdit:0,editStyle:"color:var(--theme-text-major-color)",addText:""})};f();const I=e=>{l[e].titleEdit?(l[e].titleEdit=0,l[e].editStyle="color:var(--theme-text-major-color)"):(l[e].titleEdit=1,l[e].editStyle="color:var(--theme-main-color)")},U=(e,n)=>{n?(t[e].move=0,l[e].titleEdit=0,l[e].editStyle="color:var(--theme-text-major-color)"):t[e].move=1,_()},_=()=>{f(),(!t[t.length-1].name||t[t.length-1].sublist.length==0)&&(l[t.length-1].titleEdit=1,l[t.length-1].editStyle="color:var(--theme-main-color)");for(let e=0;e<t.length;e++)t[e].sublist.length==0&&(l[e].titleEdit=1,l[e].editStyle="color:var(--theme-main-color)")};_();const N=e=>e?"rotate: -180deg":"rotate: -90deg",O=e=>{t.splice(e,1),l.splice(e,1)},J=(e,n)=>{t[e].sublist.splice(n,1)},K=()=>{t.length==0?(l.push({titleEdit:1,editStyle:"color:var(--theme-main-color)",addText:""}),t.push({name:"",move:0,sublist:[]})):t.length!=0&&t[t.length-1].name&&(t.push({name:"",move:0,sublist:[]}),l.push({titleEdit:1,editStyle:"color:var(--theme-main-color)",addText:""}))},T=e=>{l[e].addText&&t[e].sublist.push({text:l[e].addText}),l[e].addText=""},x=m(""),$=(e,n,s,a)=>{!n&&x&&a==1?t[e].name=x.value:!n&&x&&a==2&&(t[e].sublist[s].text=x.value)},A=e=>{document.addEventListener("keyup",function(n){n.key=="Enter"&&T(e)})},G=()=>{t[t.length-1].name||(t.splice(t.length-1,1),l.splice(t.length-1,1));for(let e=0;e<l.length;e++)l[e].titleEdit=0,l[e].editStyle="color:var(--theme-text-major-color)";for(let e=0;e<t.length;e++)t[e].move=0;_()},L=()=>{t[t.length-1].name||(t.splice(t.length-1,1),l.splice(t.length-1,1));for(let e=0;e<t.length;e++)t[e].move=1},g=m(""),R=e=>{S.value=1;const n=RegExp(e);for(let s=0;s<t.length;s++)n.test(t[s].name)||(t.splice(s,1),l.splice(s,1),s--);g.value=""},D=m("font-size:22px;rotate: 0deg"),M=m(0),z=()=>{M.value++,D.value="font-size:22px;rotate:"+M.value*180+"deg",h=JSON.parse(localStorage.getItem("mainData")),t=h.MainList,_(),f()},q=e=>t[t.length-1].name?"animation-delay:"+e*.2+"s":"animation-delay:0s";return(e,n)=>(r(),d("div",Y,[j.value?(r(),d("div",Z)):u("",!0),o("div",ee,[o("div",te,[o("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",title:"点击清除已完成清单",onClick:n[0]||(n[0]=s=>(G(),c()))},se),o("div",{class:"mx-[10px] flex items-center cursor-pointer select-none text-[--theme-text-major-color] active:text-[--theme-text-major-color-active]",onClick:n[1]||(n[1]=s=>(L(),c())),title:"点击开启/关闭任务详细"},ie)]),o("div",ce,[o("div",re,[y(o("input",{type:"text",placeholder:"请输入关键字","onUpdate:modelValue":n[2]||(n[2]=s=>g.value=s),class:"my-[5px] text-[--theme-text-major-color] w-[300px] bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-class-major-color-hover] rounded-2xl ml-[5px]"},null,512),[[w,g.value]])]),o("div",de,[o("div",{class:"mx-[10px]",onClick:n[3]||(n[3]=s=>R(g.value))},xe),o("div",{class:"mx-[10px]",onClick:n[4]||(n[4]=s=>z())},[o("i",{class:"iconfont activeSpecial",style:k(D.value)},"",4)])])])]),o("div",me,[(r(!0),d(B,null,V(F(t),(s,a)=>(r(),d("div",{class:"mt-[30px] mr-[20px] flex transition-all",key:a},[o("div",{class:"h-[360px] bg-[--theme-background-major-color] overflow-hidden rounded-2xl flex transition-all",id:"transition",style:k(q(a))},[o("div",ue,[o("div",he,[o("p",ve,C(s.name),1)]),o("div",fe,[s.move?u("",!0):(r(),d("i",{key:0,class:"iconfont",onClick:i=>(I(a),c()),style:k(l[a].editStyle)},"",12,_e)),ge,o("i",{class:"iconfont",onClick:i=>(U(a,s.move),c()),style:k(N(s.move))},"",12,be)])]),s.move?u("",!0):(r(),d("div",ye,[l[a].titleEdit?(r(),d("div",we,[o("div",ke,[y(o("input",{name:"label",placeholder:"请输入项目名称",class:"text-[--theme-text-major-color] w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-class-major-color-hover] rounded-2xl ml-[5px]",type:"text","onUpdate:modelValue":i=>s.name=i,onFocus:i=>x.value=s.name,onBlur:i=>($(a,s.name,0,1),c())},null,40,je),[[w,s.name]]),o("label",Se,C(s.name),1)]),o("div",Ee,[o("i",{class:"iconfont hoverSpecial",style:{"font-size":"22px"},onClick:i=>(O(a),c())},"",8,Ce)])])):u("",!0),o("div",Te,[(r(!0),d(B,null,V(F(t)[a].sublist,(i,E)=>(r(),d("div",{class:"flex items-center my-[5px] relative justify-between select-none bg-[--theme-background-major-color] mr-[5px] pr-[15px] rounded-r-2xl",key:E},[o("div",$e,[y(o("input",{type:"text",name:"label",disabled:!l[a].titleEdit,"onUpdate:modelValue":b=>i.text=b,class:"text-[--theme-text-major-color] w-full bg-[--theme-background-major-color] h-[35px] focus:outline-0 rounded pl-[10px] pr-[50px] focus:bg-[--theme-text-major-color-input] rounded-2xl ml-[5px]",onFocus:b=>x.value=i.text,onBlur:b=>($(a,i.text,E,2),c())},null,40,Le),[[w,i.text]]),o("label",De,C(i.text),1)]),l[a].titleEdit?(r(),d("div",{key:0,class:"w-[24px] ml-[20px] cursor-pointer text-[22px]",onClick:b=>(J(a,E),c())},Be,8,Me)):u("",!0)]))),128)),l[a].titleEdit?(r(),d("div",Ve,[y(o("input",{type:"text","onUpdate:modelValue":i=>l[a].addText=i,placeholder:"添加新的文本",class:"text-[--theme-text-major-color] w-full bg-[--theme-text-major-color-input] h-[35px] focus:outline-0 rounded pl-[10px] mr-[15px] focus:bg-[--theme-class-major-color-hover] rounded-2xl",onKeyup:i=>(A(a),c())},null,40,Fe),[[w,l[a].addText]]),o("div",Ie,[o("div",{class:"w-[24px] cursor-pointer text-[22px]",onClick:i=>(T(a,e.i),c())},Oe,8,Ue)])])):u("",!0)])]))],4)]))),128)),o("div",{class:"h-[360px] w-[310px] mt-[30px] border-dotted border-[3px] border-[--theme-class-major-color-hover] overflow-hidden rounded-2xl flex items-center justify-center cursor-pointer select-none",onClick:n[5]||(n[5]=s=>(K(),c()))},Ke)])]))}},Re=H(Ae,[["__scopeId","data-v-220a427e"]]);export{Re as default};
