import{b2 as te,b3 as ne,b as ce,b4 as me,b5 as Fe,b6 as Ue,b7 as Ae,b8 as ze,b9 as ve,m as ae,aa as le,n as H,G as U,p as $,aK as q,w as Y,t as fe,P as be,ai as pe,o as C,l as F,ab as Ge,ag as se,q as D,Q as he,u as Z,A as _,W as E,V as b,a1 as B,D as N,E as d,a7 as A,B as S,aZ as z,ba as G,C as Q,O as X,Z as y,$ as w,a0 as L,X as _e,_ as J,Y as Oe,j as Pe,k as Re,v as Ke,y as Me,a3 as He,a4 as ge,N as p,bb as P,bc as R,aW as V,av as ke,ax as xe,aY as qe,aV as We}from"./index-e27b3049.js";import{k as ye,l as Ye,m as Ze,U as K,e as Qe,a as j,i as Xe,u as oe,d as we,B as Je,n as je,o as O,p as et,q as W,E as Ce,g as ee,r as ie,s as ue,v as tt,f as Se,h as nt}from"./el-notification-ffd3ea26.js";function at(e){return e}function lt(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}var st=800,ot=16,it=Date.now;function ut(e){var t=0,a=0;return function(){var n=it(),s=ot-(n-a);if(a=n,s>0){if(++t>=st)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}function rt(e){return function(){return e}}var dt=te?function(e,t){return te(e,"toString",{configurable:!0,enumerable:!1,value:rt(t),writable:!0})}:at;const ct=dt;var mt=ut(ct);const vt=mt;var re=Math.max;function ft(e,t,a){return t=re(t===void 0?e.length-1:t,0),function(){for(var n=arguments,s=-1,i=re(n.length-t,0),u=Array(i);++s<i;)u[s]=n[t+s];s=-1;for(var o=Array(t+1);++s<t;)o[s]=n[s];return o[t]=a(u),lt(e,this,o)}}var de=ne?ne.isConcatSpreadable:void 0;function bt(e){return ce(e)||ye(e)||!!(de&&e&&e[de])}function $e(e,t,a,n,s){var i=-1,u=e.length;for(a||(a=bt),s||(s=[]);++i<u;){var o=e[i];t>0&&a(o)?t>1?$e(o,t-1,a,n,s):Ye(s,o):n||(s[s.length]=o)}return s}function pt(e){var t=e==null?0:e.length;return t?$e(e,1):[]}function ht(e){return vt(ft(e,void 0,pt),e+"")}function _t(e,t){return e!=null&&t in Object(e)}function gt(e,t,a){t=me(t,e);for(var n=-1,s=t.length,i=!1;++n<s;){var u=Fe(t[n]);if(!(i=e!=null&&a(e,u)))break;e=e[u]}return i||++n!=s?i:(s=e==null?0:e.length,!!s&&Ze(s)&&Ue(u,s)&&(ce(e)||ye(e)))}function kt(e,t){return e!=null&&gt(e,t,_t)}function xt(e,t,a){for(var n=-1,s=t.length,i={};++n<s;){var u=t[n],o=Ae(e,u);a(o,u)&&ze(i,me(u,e),o)}return i}function yt(e,t){return xt(e,t,function(a,n){return kt(e,n)})}var wt=ht(function(e,t){return e==null?{}:yt(e,t)});const Ct=wt,Ve={modelValue:{type:[Number,String,Boolean],default:void 0},label:{type:[String,Boolean,Number,Object]},indeterminate:Boolean,disabled:Boolean,checked:Boolean,name:{type:String,default:void 0},trueLabel:{type:[String,Number],default:void 0},falseLabel:{type:[String,Number],default:void 0},id:{type:String,default:void 0},controls:{type:String,default:void 0},border:Boolean,size:ve,tabindex:[String,Number],validateEvent:{type:Boolean,default:!0}},Ee={[K]:e=>ae(e)||le(e)||H(e),change:e=>ae(e)||le(e)||H(e)},T=Symbol("checkboxGroupContextKey"),St=({model:e,isChecked:t})=>{const a=U(T,void 0),n=$(()=>{var i,u;const o=(i=a?.max)==null?void 0:i.value,r=(u=a?.min)==null?void 0:u.value;return!q(o)&&e.value.length>=o&&!t.value||!q(r)&&e.value.length<=r&&t.value});return{isDisabled:Qe($(()=>a?.disabled.value||n.value)),isLimitDisabled:n}},$t=(e,{model:t,isLimitExceeded:a,hasOwnLabel:n,isDisabled:s,isLabeledByFormItem:i})=>{const u=U(T,void 0),{formItem:o}=j(),{emit:r}=pe();function l(v){var f,h;return v===e.trueLabel||v===!0?(f=e.trueLabel)!=null?f:!0:(h=e.falseLabel)!=null?h:!1}function c(v,f){r("change",l(v),f)}function g(v){if(a.value)return;const f=v.target;r("change",l(f.checked),v)}async function x(v){a.value||!n.value&&!s.value&&i.value&&(v.composedPath().some(k=>k.tagName==="LABEL")||(t.value=l([!1,e.falseLabel].includes(t.value)),await be(),c(t.value,v)))}const m=$(()=>u?.validateEvent||e.validateEvent);return Y(()=>e.modelValue,()=>{m.value&&o?.validate("change").catch(v=>fe())}),{handleChange:g,onClickRoot:x}},Vt=e=>{const t=C(!1),{emit:a}=pe(),n=U(T,void 0),s=$(()=>q(n)===!1),i=C(!1);return{model:$({get(){var o,r;return s.value?(o=n?.modelValue)==null?void 0:o.value:(r=e.modelValue)!=null?r:t.value},set(o){var r,l;s.value&&F(o)?(i.value=((r=n?.max)==null?void 0:r.value)!==void 0&&o.length>n?.max.value,i.value===!1&&((l=n?.changeEvent)==null||l.call(n,o))):(a(K,o),t.value=o)}}),isGroup:s,isLimitExceeded:i}},Et=(e,t,{model:a})=>{const n=U(T,void 0),s=C(!1),i=$(()=>{const l=a.value;return H(l)?l:F(l)?Ge(e.label)?l.map(se).some(c=>Xe(c,e.label)):l.map(se).includes(e.label):l!=null?l===e.trueLabel:!!l}),u=oe($(()=>{var l;return(l=n?.size)==null?void 0:l.value}),{prop:!0}),o=oe($(()=>{var l;return(l=n?.size)==null?void 0:l.value})),r=$(()=>!!(t.default||e.label));return{checkboxButtonSize:u,isChecked:i,isFocused:s,checkboxSize:o,hasOwnLabel:r}},Lt=(e,{model:t})=>{function a(){F(t.value)&&!t.value.includes(e.label)?t.value.push(e.label):t.value=e.trueLabel||!0}e.checked&&a()},Le=(e,t)=>{const{formItem:a}=j(),{model:n,isGroup:s,isLimitExceeded:i}=Vt(e),{isFocused:u,isChecked:o,checkboxButtonSize:r,checkboxSize:l,hasOwnLabel:c}=Et(e,t,{model:n}),{isDisabled:g}=St({model:n,isChecked:o}),{inputId:x,isLabeledByFormItem:m}=we(e,{formItemContext:a,disableIdGeneration:c,disableIdManagement:s}),{handleChange:v,onClickRoot:f}=$t(e,{model:n,isLimitExceeded:i,hasOwnLabel:c,isDisabled:g,isLabeledByFormItem:m});return Lt(e,{model:n}),{inputId:x,isLabeledByFormItem:m,isChecked:o,isDisabled:g,isFocused:u,checkboxButtonSize:r,checkboxSize:l,hasOwnLabel:c,model:n,handleChange:v,onClickRoot:f}},Bt=["tabindex","role","aria-checked"],It=["id","aria-hidden","name","tabindex","disabled","true-value","false-value"],Nt=["id","aria-hidden","disabled","value","name","tabindex"],Dt=D({name:"ElCheckbox"}),Tt=D({...Dt,props:Ve,emits:Ee,setup(e){const t=e,a=he(),{inputId:n,isLabeledByFormItem:s,isChecked:i,isDisabled:u,isFocused:o,checkboxSize:r,hasOwnLabel:l,model:c,handleChange:g,onClickRoot:x}=Le(t,a),m=Z("checkbox"),v=$(()=>[m.b(),m.m(r.value),m.is("disabled",u.value),m.is("bordered",t.border),m.is("checked",i.value)]),f=$(()=>[m.e("input"),m.is("disabled",u.value),m.is("checked",i.value),m.is("indeterminate",t.indeterminate),m.is("focus",o.value)]);return(h,k)=>(_(),E(_e(!d(l)&&d(s)?"span":"label"),{class:N(d(v)),"aria-controls":h.indeterminate?h.controls:null,onClick:d(x)},{default:b(()=>[B("span",{class:N(d(f)),tabindex:h.indeterminate?0:void 0,role:h.indeterminate?"checkbox":void 0,"aria-checked":h.indeterminate?"mixed":void 0},[h.trueLabel||h.falseLabel?A((_(),S("input",{key:0,id:d(n),"onUpdate:modelValue":k[0]||(k[0]=I=>z(c)?c.value=I:null),class:N(d(m).e("original")),type:"checkbox","aria-hidden":h.indeterminate?"true":"false",name:h.name,tabindex:h.tabindex,disabled:d(u),"true-value":h.trueLabel,"false-value":h.falseLabel,onChange:k[1]||(k[1]=(...I)=>d(g)&&d(g)(...I)),onFocus:k[2]||(k[2]=I=>o.value=!0),onBlur:k[3]||(k[3]=I=>o.value=!1)},null,42,It)),[[G,d(c)]]):A((_(),S("input",{key:1,id:d(n),"onUpdate:modelValue":k[4]||(k[4]=I=>z(c)?c.value=I:null),class:N(d(m).e("original")),type:"checkbox","aria-hidden":h.indeterminate?"true":"false",disabled:d(u),value:h.label,name:h.name,tabindex:h.tabindex,onChange:k[5]||(k[5]=(...I)=>d(g)&&d(g)(...I)),onFocus:k[6]||(k[6]=I=>o.value=!0),onBlur:k[7]||(k[7]=I=>o.value=!1)},null,42,Nt)),[[G,d(c)]]),B("span",{class:N(d(m).e("inner"))},null,2)],10,Bt),d(l)?(_(),S("span",{key:0,class:N(d(m).e("label"))},[Q(h.$slots,"default"),h.$slots.default?L("v-if",!0):(_(),S(X,{key:0},[y(w(h.label),1)],64))],2)):L("v-if",!0)]),_:3},8,["class","aria-controls","onClick"]))}});var Ft=J(Tt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);const Ut=["name","tabindex","disabled","true-value","false-value"],At=["name","tabindex","disabled","value"],zt=D({name:"ElCheckboxButton"}),Gt=D({...zt,props:Ve,emits:Ee,setup(e){const t=e,a=he(),{isFocused:n,isChecked:s,isDisabled:i,checkboxButtonSize:u,model:o,handleChange:r}=Le(t,a),l=U(T,void 0),c=Z("checkbox"),g=$(()=>{var m,v,f,h;const k=(v=(m=l?.fill)==null?void 0:m.value)!=null?v:"";return{backgroundColor:k,borderColor:k,color:(h=(f=l?.textColor)==null?void 0:f.value)!=null?h:"",boxShadow:k?`-1px 0 0 0 ${k}`:void 0}}),x=$(()=>[c.b("button"),c.bm("button",u.value),c.is("disabled",i.value),c.is("checked",s.value),c.is("focus",n.value)]);return(m,v)=>(_(),S("label",{class:N(d(x))},[m.trueLabel||m.falseLabel?A((_(),S("input",{key:0,"onUpdate:modelValue":v[0]||(v[0]=f=>z(o)?o.value=f:null),class:N(d(c).be("button","original")),type:"checkbox",name:m.name,tabindex:m.tabindex,disabled:d(i),"true-value":m.trueLabel,"false-value":m.falseLabel,onChange:v[1]||(v[1]=(...f)=>d(r)&&d(r)(...f)),onFocus:v[2]||(v[2]=f=>n.value=!0),onBlur:v[3]||(v[3]=f=>n.value=!1)},null,42,Ut)),[[G,d(o)]]):A((_(),S("input",{key:1,"onUpdate:modelValue":v[4]||(v[4]=f=>z(o)?o.value=f:null),class:N(d(c).be("button","original")),type:"checkbox",name:m.name,tabindex:m.tabindex,disabled:d(i),value:m.label,onChange:v[5]||(v[5]=(...f)=>d(r)&&d(r)(...f)),onFocus:v[6]||(v[6]=f=>n.value=!0),onBlur:v[7]||(v[7]=f=>n.value=!1)},null,42,At)),[[G,d(o)]]),m.$slots.default||m.label?(_(),S("span",{key:2,class:N(d(c).be("button","inner")),style:Oe(d(s)?d(g):void 0)},[Q(m.$slots,"default",{},()=>[y(w(m.label),1)])],6)):L("v-if",!0)],2))}});var Be=J(Gt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);const Ot=Pe({modelValue:{type:Re(Array),default:()=>[]},disabled:Boolean,min:Number,max:Number,size:ve,label:String,fill:String,textColor:String,tag:{type:String,default:"div"},validateEvent:{type:Boolean,default:!0}}),Pt={[K]:e=>F(e),change:e=>F(e)},Rt=D({name:"ElCheckboxGroup"}),Kt=D({...Rt,props:Ot,emits:Pt,setup(e,{emit:t}){const a=e,n=Z("checkbox"),{formItem:s}=j(),{inputId:i,isLabeledByFormItem:u}=we(a,{formItemContext:s}),o=async l=>{t(K,l),await be(),t("change",l)},r=$({get(){return a.modelValue},set(l){o(l)}});return Ke(T,{...Ct(Me(a),["size","min","max","disabled","validateEvent","fill","textColor"]),modelValue:r,changeEvent:o}),Y(()=>a.modelValue,()=>{a.validateEvent&&s?.validate("change").catch(l=>fe())}),(l,c)=>{var g;return _(),E(_e(l.tag),{id:d(i),class:N(d(n).b("group")),role:"group","aria-label":d(u)?void 0:l.label||"checkbox-group","aria-labelledby":d(u)?(g=d(s))==null?void 0:g.labelId:void 0},{default:b(()=>[Q(l.$slots,"default")]),_:3},8,["id","class","aria-label","aria-labelledby"])}}});var Ie=J(Kt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);const Mt=He(Ft,{CheckboxButton:Be,CheckboxGroup:Ie});ge(Be);ge(Ie);function Ht(e){return new Jt(e).readValue()}const qt="0".charCodeAt(0),Wt="9".charCodeAt(0),Yt="i".charCodeAt(0),Zt="l".charCodeAt(0),Qt="d".charCodeAt(0),Xt=":".charCodeAt(0),M="e".charCodeAt(0);class Jt{a;idx=0;constructor(t){this.a=t}reset(){this.idx=0}read(){return this.a[this.idx++]}unread(){this.idx--}readValue(){const t=this.read();if(t>=qt&&t<=Wt)return this.unread(),this.readString();if(t===Yt)return new Je(this.readIntUitl(M));if(t===Zt)return this.readList();if(t===Qt)return this.readDict();throw new Error("invalid input")}readString(){const t=this.readIntUitl(Xt),a=[];for(let n=0;n<t;n++)a.push(this.read());return new je(new Uint8Array(a))}readIntUitl(t){const a=[];let n;for(;;){if(n=this.read(),n===void 0)throw new Error(`EOF reached when idx=${this.idx}`);if(n===t)break;a.push(n)}const s=O(new Uint8Array(a)),i=parseInt(s,10);if(isNaN(i))throw new Error(`NaN: ${s}`);return i}readList(){const t=[];for(;this.read()!==M;)this.unread(),t.push(this.readValue());return new et(t)}readDict(){const t={};for(;this.read()!==M;){this.unread();const n=this.readString(),s=this.readValue();t[O(n.value)]=s}return new W(t)}}const jt={class:"mt4 pl pt pb b b-dashed"},en={class:"cursor-pointer"},Ne=D({__name:"IntegerView",props:{data:null,name:null},emits:["update"],setup(e,{emit:t}){const a=e,n=C(a.data),s=C(!1),i=()=>{s.value&&t("update",n.value),s.value=!s.value};return(u,o)=>{const r=P,l=R,c=Ce,g=ee;return _(),S("details",jt,[B("summary",en,[p(l,{class:"inline-flex w95%"},{default:b(()=>[p(r,{span:12},{default:b(()=>[y(w(a.name),1)]),_:1}),p(r,{span:12},{default:b(()=>[y(w(u.__("Integer")),1)]),_:1})]),_:1})]),p(l,null,{default:b(()=>[p(r,{span:20},{default:b(()=>[p(c,{modelValue:n.value,"onUpdate:modelValue":o[0]||(o[0]=x=>n.value=x),type:"number",disabled:!s.value},null,8,["modelValue","disabled"])]),_:1}),p(r,{span:4,class:"flex justify-center"},{default:b(()=>[p(g,{onClick:i},{default:b(()=>[y(w(s.value?u.__("OK"):u.__("Edit")),1)]),_:1})]),_:1})]),_:1})])}}});const tn={class:"mt4 pl pt pb b b-dashed"},nn={class:"cursor-pointer"},De=D({__name:"StringView",props:{data:null,name:null},emits:["update"],setup(e,{emit:t}){const a=e,n=C(!1),s=C(!1),i=C(!1),u=C(O(a.data));Y(n,(r,l)=>{let c;l?c=ie(u.value):c=ue(u.value),r?u.value=tt(c):u.value=O(c)});const o=()=>{if(i.value)if(n.value){const r=ie(u.value);if(!r){Se.error({title:V("Error"),message:V("Invalid hex string")});return}t("update",r)}else t("update",ue(u.value));i.value=!i.value};return(r,l)=>{const c=P,g=R,x=Ce,m=Mt,v=ee;return _(),S("details",tn,[B("summary",nn,[p(g,{class:"inline-flex w95%"},{default:b(()=>[p(c,{span:12},{default:b(()=>[y(w(a.name),1)]),_:1}),p(c,{span:12},{default:b(()=>[y(w(d(V)("String")),1)]),_:1})]),_:1})]),p(g,null,{default:b(()=>[p(c,{span:12,xs:24},{default:b(()=>[p(x,{modelValue:u.value,"onUpdate:modelValue":l[0]||(l[0]=f=>u.value=f),type:s.value?"textarea":"text",disabled:!i.value},null,8,["modelValue","type","disabled"])]),_:1}),p(c,{span:4,xs:8,class:"flex justify-center"},{default:b(()=>[p(m,{modelValue:n.value,"onUpdate:modelValue":l[1]||(l[1]=f=>n.value=f)},{default:b(()=>[y(w(d(V)("Hex")),1)]),_:1},8,["modelValue"])]),_:1}),p(c,{span:4,xs:8,class:"flex justify-center"},{default:b(()=>[p(m,{modelValue:s.value,"onUpdate:modelValue":l[2]||(l[2]=f=>s.value=f)},{default:b(()=>[y(w(d(V)("Multi Line")),1)]),_:1},8,["modelValue"])]),_:1}),p(c,{span:4,xs:8,class:"flex justify-center"},{default:b(()=>[p(v,{onClick:o},{default:b(()=>[y(w(i.value?d(V)("OK"):d(V)("Edit")),1)]),_:1})]),_:1})]),_:1})])}}}),an={class:"mt4 pl pt pb b b-solid"},ln={class:"cursor-pointer"},sn={class:"pl0"},on={class:"list-none"},un=D({__name:"ListView",props:{data:null,name:null},setup(e){const t=e,a=C(t.data);return(n,s)=>{const i=P,u=R,o=De,r=ke("ListView",!0);return _(),S("details",an,[B("summary",ln,[p(u,{class:"inline-flex w95%"},{default:b(()=>[p(i,{span:12},{default:b(()=>[y(w(t.name),1)]),_:1}),p(i,{span:12},{default:b(()=>[y(w(n.__("List")),1)]),_:1})]),_:1})]),B("ul",sn,[(_(!0),S(X,null,xe(a.value.value,(l,c)=>(_(),S("li",on,[l.Type()==="string"?(_(),E(o,{key:0,data:l.value,name:`#${c}`},null,8,["data","name"])):L("",!0),l.Type()==="integer"?(_(),E(Ne,{key:1,data:l.value,name:`#${c}`},null,8,["data","name"])):L("",!0),l.Type()==="list"?(_(),E(r,{key:2,data:l,name:`#${c}`},null,8,["data","name"])):L("",!0),l.Type()==="dict"?(_(),E(Te,{key:3,data:l,name:`#${c}`},null,8,["data","name"])):L("",!0)]))),256))])])}}}),rn={class:"mt4 pl pt pb b b-solid"},dn={class:"cursor-pointer"},cn={class:"pl0"},mn={class:"list-none"},Te=D({__name:"DictView",props:{data:null,name:null},setup(e){const t=e,a=C(t.data);return(n,s)=>{const i=P,u=R,o=ke("DictView",!0);return _(),S("details",rn,[B("summary",dn,[p(u,{class:"inline-flex w95%"},{default:b(()=>[p(i,{span:12},{default:b(()=>[y(w(t.name),1)]),_:1}),p(i,{span:12},{default:b(()=>[y(w(n.__("Dict")),1)]),_:1})]),_:1})]),B("ul",cn,[(_(!0),S(X,null,xe(a.value.value,(r,l)=>(_(),S("li",mn,[r.Type()==="string"?(_(),E(De,{key:0,data:r.value,name:l},null,8,["data","name"])):L("",!0),r.Type()==="integer"?(_(),E(Ne,{key:1,data:r.value,name:l},null,8,["data","name"])):L("",!0),r.Type()==="list"?(_(),E(un,{key:2,data:r,name:l},null,8,["data","name"])):L("",!0),r.Type()==="dict"?(_(),E(o,{key:3,data:r,name:l},null,8,["data","name"])):L("",!0)]))),256))])])}}}),vn=B("i",{i:"ep-upload-filled",class:"el-icon--upload inline-flex"},null,-1),fn={class:"el-upload__text"},bn={class:"flex justify-between"},pn={hidden:""},gn=D({__name:"EditView",setup(e){const t=C(!1),a=C(),n=C([]),s=g=>{a.value.clearFiles();const x=g[0];a.value.handleStart(x),t.value=!1},i=()=>{a.value?.clearFiles(),l.value=new W({}),t.value=!1},u=$(()=>n.value.length===0),o=C(!1),r=async()=>{o.value=!0;try{console.log("ready to read");const g=await n.value[0].raw.slice().arrayBuffer();console.log("buffer:",g);const x=Ht(new Uint8Array(g));if(x.Type()!=="dict")throw new Error(V("not torrent file"));l.value=x,t.value=!0}catch(g){Se.error({title:V("Error"),message:We(V("Can not view this file: {0}"),g)})}o.value=!1},l=C(new W({})),c=()=>{console.log(l.value)};return(g,x)=>{const m=nt,v=ee,f=qe;return _(),E(f,{class:"is-vertical"},{default:b(()=>[p(m,{ref_key:"uploadRef",ref:a,drag:"","auto-upload":!1,"file-list":n.value,"onUpdate:fileList":x[0]||(x[0]=h=>n.value=h),limit:1,accept:".torrent,application/x-bittorrent","on-exceed":s},{default:b(()=>[vn,B("div",fn,w(d(V)("Drop file here or click to upload")),1)]),_:1},8,["file-list"]),B("div",bn,[p(v,{onClick:i},{default:b(()=>[y(w(d(V)("Reset")),1)]),_:1}),p(v,{type:"primary",disabled:d(u),onClick:r,loading:o.value},{default:b(()=>[y(w(d(V)("View")),1)]),_:1},8,["disabled","loading"])]),t.value?(_(),E(Te,{key:0,data:l.value,name:"root"},null,8,["data"])):L("",!0),B("div",pn,[p(v,{onClick:c},{default:b(()=>[y("log")]),_:1})])]),_:1})}}});export{gn as default};