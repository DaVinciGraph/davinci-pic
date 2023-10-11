(()=>{"use strict";var t={d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{I:()=>kt});const e=async t=>{if(!0!==t.offlineMode){let e="network"===t.type?`${kt.apiUrl}/networks/${t.network}`:"app"===t.type?`${kt.apiUrl}/apps/${t.name}`:`${kt.apiUrl}/${"banner"===t.type||"profile"===t.type?"account":t.type}s/${t.network}/${t.address}`;try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.json()}catch(t){console.error(`DavinciPic Fetch Error: ${t.message}`)}}return{}},r=["token","profile","banner","node","network","app"],i=["none","app","network"],n=["topRight","topLeft","bottomRight","bottomLeft"],o=["circle","square","smoothSquare"],s=["safe","sensitive","inappropriate","copyright-violated"];function c(t){return t&&("TOKEN"===t?.type||"CURRENCY"===t?.type)}function l(t){return t&&"LP"===t?.type&&t?.token0&&t?.token1}function a(t){return t&&"WRAPPED"===t?.type&&t?.originalToken}function u(t){return t&&t?.address}function p(t){return t&&t?.address}function d(t){return t&&t?.address}function g(t){return t&&t?.id}function f(t){return t&&t?.name}const h=(t,e="",r)=>t||e||r,k=(t="",e)=>t||e,b=(t,e)=>t?t||"transparent":e,y=(t,e)=>t?"transparent":e,A=(t,e,r,i,n)=>p(e)?(e.title=e.title||r.title,e.banner=h(e.banner,t.dataPicUrl,n),e.supportingBackgroundColor=b(e.supportingBackgroundColor,i),e):(r.banner=k(t.dataPicUrl,n),r.supportingBackgroundColor=y(r.banner,i),r),x={token:{defaultBright:"https://arweave.net/ZAMK4tuU1MZ9TkNl2ARV2QDRumGT5Yxw13uCpW3kX6w",default:"https://arweave.net/wW4bp6129XobnasaZbDB4RxdnpipGR8XyK0tUXGiVL0",defaultDark:"https://arweave.net/j5B7_CYAOdrk6YJNVeJMeOHn4HbySsgkObUSfpvUuDA",questionMarkBright:"https://arweave.net/z-5G9bNj_gisiQhVECwaUdSzuXMxl9Gi9UxYqrwUrq4",questionMark:"https://arweave.net/u9t3--97iFNeFB4XaX7auIdcJWjNWF090BFcJdnBmiQ",questionMarkDark:"https://arweave.net/HDVERv0ghkA91qhI2ud7qVUU_FFtAIyYELHHxQ9t2BQ",exclamationMarkBight:"https://arweave.net/HS0RGj5YSKgcNch2US1E8saZKdM8RGlQWpxwhk5eKrk",exclamationMark:"https://arweave.net/KwbKX4FOOM59KmFrAvtRhr5U-8MqWsSzU0rSA3Z7Z4A",exclamationMarkDark:"https://arweave.net/A3Ja0tV3kU6EhVvN1EQejG-kmtY_yEcbgQ6pShYRXHo"},profile:{defaultBright:"https://arweave.net/WxLlax6NBCapLUuKcuy-wvLlKLBTqxTV40yJt7Yc26Q",default:"https://arweave.net/qsn_zIlG_7_Ob4_qS6Bpc8vLEc5bPScw6JMly_shxlk",defaultDark:"https://arweave.net/ZHWeQz5R6VHBHOg6eOGekMsudTyy7uNBdnrul5gIIu0"}},w=["#ef4444","#f97316","#f59e0b","#eab308","#84cc16","#22c55e","#10b981","#14b8a6","#06b6d4","#0ea5e9","#3b82f6","#6366f1","#8b5cf6","#a855f7","#d946ef","#ec4899","#f43f5e"];function m(t,e){const r=(e=e||"defaultBright").match(/url\(['"]?(.*?)['"]?\)/);if(r)return r[1];if("banner"===t)return"";const i=x["profile"===t?"profile":"token"][e];return i||x["profile"===t?"profile":"token"].defaultBright}const C=(t,e)=>void 0!==e&&void 0!==t&&(t=t?.toUpperCase(),e=e?.toUpperCase(),"SAFE"!==e&&(("SENSITIVE"!==e||"INAPPROPRIATE"!==t&&"COPYRIGHT-VIOLATED"!==t)&&("INAPPROPRIATE"!==e||"COPYRIGHT-VIOLATED"!==t)));function v(){const t=Math.floor(Math.random()*w.length);return w[t]}function T(t,e=100){return t||(t="circle"),String("circle"===t?e/2:"smoothSquare"===t?.15*e:0)}const S=(t,e)=>"app"===t.context&&e?.app?{type:"app",pic:e.app.pic||"",title:e.app.title?`Originated by ${e.app.title}`:"",supportingBackgroundColor:e.app.supportingBackgroundColor||"transparent"}:"network"===t.context&&e?.network?{type:"network",pic:e.network.pic||"",title:e.network.title?`Originated on ${e.network.title}`:"",supportingBackgroundColor:e.network.supportingBackgroundColor||"transparent"}:{type:"none",pic:"",title:"",supportingBackgroundColor:"transparent"},B=(t,e)=>{const r={color:"transparent",url:""};if("transparent"===t.FailureEffect)return r;if("randomColor"===t.placeholder)return e.color&&"randomColor"===t.loadingEffect?(r.color=e.color,r):(r.color=v(),r);let i=t.placeholder?.match(kt.colorRegex);return i?(r.color=i[0],r):(r.url=m(t.type,t.placeholder),r)},E=t=>{let e="",r="",i="",n="";if(t.dataPicUrl?.includes("|")){const i=t.dataPicUrl.split("|");e=i[0],r=i[1]}if(t.dataTitle?.includes("|")){const e=t.dataTitle.split("|");i=e[0],n=e[1]}return{token0Pic:e,token1Pic:r,token0Title:i,token1Title:n}},P=(t,e,r,i,n)=>{if(!r?.type){if(l(e))return((t,e,r,i)=>{const{token0Pic:n,token1Pic:o}=E(t);return e.token0.pic=k(n,i),e.token0.supportingBackgroundColor=y(e.token0.pic,r),e.token1.pic=k(o,i),e.token1.supportingBackgroundColor=y(e.token1.pic,r),e.app&&"app"===t.context&&(e.app.pic=t.dataContextPicUrl||"",e.app.supportingBackgroundColor=""),e.network.pic=t.dataContextPicUrl||"",e.network.supportingBackgroundColor="",e})(t,e,n,i);if(a(e))return((t,e,r,i)=>(e.originalToken.pic=k(t.dataPicUrl,i),e.originalToken.supportingBackgroundColor=e.originalToken.pic?"transparent":r,e.app&&"app"===t.context&&(e.app.pic=t.dataContextPicUrl||"",e.app.supportingBackgroundColor=""),e.network.pic=t.dataContextPicUrl||"",e.network.supportingBackgroundColor="",e))(t,e,n,i);if(c(e))return((t,e,r,i)=>(e.pic=k(t.dataPicUrl,i),e.supportingBackgroundColor=e.pic?"transparent":r,e.network.pic=t.dataContextPicUrl||"",e.network.supportingBackgroundColor="",e))(t,e,n,i)}if(l(r))return((t,e,r,i)=>{const{token0Title:n,token1Title:o,token0Pic:s,token1Pic:c}=E(t);return e.token0.title=e.token0.title||n,e.token0.pic=h(e.token0.pic,s,i),e.token0.supportingBackgroundColor=b(e.token0.supportingBackgroundColor,r),e.token1.title=e.token1.title||o,e.token1.pic=h(e.token1.pic,c,i),e.token1.supportingBackgroundColor=b(e.token1.supportingBackgroundColor,r),e.app&&(e.app.title=e.app?.title||t.dataContextTitle||"",e.app.pic=e.app?.pic||t.dataContextPicUrl||"",e.app.supportingBackgroundColor=e.app?.supportingBackgroundColor||""),e.network.title=e.network.title||t.dataContextTitle||"",e.network.pic=e.network.pic||t.dataContextPicUrl||i,e.network.supportingBackgroundColor=e.network.supportingBackgroundColor||"",e})(t,r,n,i);if(a(r))return((t,e,r,i)=>(e.originalToken.title=e.originalToken.title||t.dataTitle||"",e.originalToken.pic=h(e.originalToken.pic,t.dataContextPicUrl,i),e.originalToken.supportingBackgroundColor=b(e.originalToken.supportingBackgroundColor,r),e.app&&(e.app.title=e?.app?.title||t.dataContextTitle||"",e.app.pic=e?.app?.pic||t.dataContextPicUrl||"",e.app.supportingBackgroundColor=e?.app?.supportingBackgroundColor||"transparent"),e.network.title=e.network.title||t.dataContextTitle||"",e.network.pic=e.network.pic||t.dataContextTitle||i,e.network.supportingBackgroundColor=e.network?.supportingBackgroundColor||"transparent",e))(t,r,n,i);if(c(r))return((t,e,r,i)=>(e.title=e.title||t.dataTitle||"",e.pic=h(e.pic,t.dataPicUrl,i),e.supportingBackgroundColor=b(e.supportingBackgroundColor,r),e.network.title=e.network.title||t.dataContextTitle||"",e.network.pic=e.network.pic||i,e.network.supportingBackgroundColor=e.network.supportingBackgroundColor||r,e))(t,r,n,i);throw new Error("Data couldn't be finalized for the token, failed to combine data.")},$=(t,e,r,i,n)=>u(e)||g(e)||d(e)||f(e)?(e.title=e.title||r.title,e.pic=h(e.pic,t.dataPicUrl,n),e.supportingBackgroundColor=b(e.supportingBackgroundColor,i),e):(r.pic=k(t.dataPicUrl,n),r.supportingBackgroundColor=y(r.pic,i),r),q=(t,e,r,i)=>{const{color:n,url:o}=B(r,i);if("token"===r.type)return P(r,t,e,o,n);if("profile"===r.type&&u(t))return $(r,e,t,n,o);if("banner"===r.type&&p(t))return A(r,e,t,n,o);if("node"===r.type&&d(t))return $(r,e,t,n,o);if("network"===r.type&&g(t))return $(r,e,t,n,o);if("app"===r.type&&f(t))return $(r,e,t,n,o);throw new Error(`Data couldn't be finalized, missing type. ${r?.type}`)},U=t=>{if(t.offlineMode&&!t.dataPicUrl)throw new Error("Defining alternative picture url is necessary when using offline mode.");switch(t.type){case"token":return{type:"token",network:t.network,address:t.address,offlineMode:t.offlineMode,shape:t.shape,size:t.size,strokeWidth:t.strokeWidth,strokeColor:t.strokeColor,censor:t.censor,complexTokenType:t.complexTokenType,context:t.context,contextPosition:t.contextPosition,dataContextTitle:t.dataContextTitle,dataContextPicUrl:t.dataContextPicUrl,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime};case"profile":return{type:"profile",network:t.network,address:t.address,offlineMode:t.offlineMode,size:t.size,strokeWidth:t.strokeWidth,strokeColor:t.strokeColor,censor:t.censor,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime,shape:t.shape};case"banner":return{type:"banner",network:t.network,address:t.address,offlineMode:t.offlineMode,censor:t.censor,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime};case"node":return{type:"node",network:t.network,address:t.address,offlineMode:t.offlineMode,size:t.size,shape:t.shape,strokeWidth:t.strokeWidth,strokeColor:t.strokeColor,censor:t.censor,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime};case"network":return{type:"network",network:t.network,offlineMode:t.offlineMode,size:t.size,shape:t.shape,strokeWidth:t.strokeWidth,strokeColor:t.strokeColor,censor:t.censor,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime};case"app":return{type:"app",name:t.name,offlineMode:t.offlineMode,size:t.size,shape:t.shape,strokeWidth:t.strokeWidth,strokeColor:t.strokeColor,censor:t.censor,dataTitle:t.dataTitle,dataPicUrl:t.dataPicUrl,placeholder:t.placeholder,loadingEffect:t.loadingEffect,FailureEffect:t.FailureEffect,delayResponseTime:t.delayResponseTime}}},M=(t,e)=>{switch(t.type){case"token":{let r={type:"TOKEN",address:t.address,supportingBackgroundColor:N(e),network:{id:t.network,title:"network"===t.context&&t.dataContextTitle||"",pic:"",supportingBackgroundColor:e.color}};const i=t.dataPicUrl?.includes("|"),n=t.dataTitle?.includes("|");if("lp"===t.complexTokenType||i||n){let i=e.url,o=e.url,s="",c="";if(n&&t.dataTitle){const e=t.dataTitle.split("|");s=e[0],c=e[1]}return{...r,type:"LP",title:"",sensitivity:"safe",token0:{network:t.network,address:t.address,sensitivity:"safe",pic:i,supportingBackgroundColor:N(e),title:s},token1:{network:t.network,address:t.address,sensitivity:"safe",pic:o,supportingBackgroundColor:N(e),title:c},app:W(t,e)}}return"wrapped"===t.complexTokenType?{...r,type:"WRAPPED",title:"",sensitivity:"safe",originalToken:{network:t.network,address:t.address,sensitivity:"safe",pic:e.url,supportingBackgroundColor:N(e),title:t.dataTitle||""},app:W(t,e)}:{...r,title:t.dataTitle||"",pic:e.url,supportingBackgroundColor:N(e)}}case"profile":return{network:t.network,address:t.address,title:t.dataTitle||"",sensitivity:"safe",pic:e.url,supportingBackgroundColor:N(e)};case"banner":return{network:t.network,address:t.address,title:t.dataTitle||"",sensitivity:"safe",banner:e.url,supportingBackgroundColor:N(e)};case"node":return{network:t.network,address:t.address,title:t.dataTitle||"",supportingBackgroundColor:N(e),pic:e.url};case"network":return{id:t.network,title:t.dataTitle||"",pic:e.url,supportingBackgroundColor:N(e)};case"app":return{name:" ",title:t.dataTitle||"",pic:e.url,supportingBackgroundColor:N(e)}}},R=(t,e)=>{const r={color:"transparent",url:""};if("transparent"===t)return r;if(t.endsWith("randomColor")||t.endsWith("randomColor'"))return r.color=v(),r;let i=t.match(kt.colorRegex);return i?(r.color=i[0],r):(r.url=m(e,t),r)},W=(t,e)=>({title:t.dataContextTitle||"",pic:"",supportingBackgroundColor:e.color}),N=t=>t.url?"transparent":t.color,F=document.createElement("template");F.innerHTML='\n<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 100">\n\t<defs>\n\t\t<clipPath>\n\t\t\t<rect x="0" y="0" width="400" height="100" />\n\t\t</clipPath>\n\t\t<filter>\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<rect id="rect-bg" x="0" y="0" width="400" height="100" fill="transparent" ></rect>\n\t<image\n\t\tx="0"\n\t\ty="0"\n\t\twidth="400"\n\t\theight="100"\n\t\tfilter=""\n\t\tpreserveAspectRatio="xMidYMid slice"></image>\n\n\t<rect x="0" y="0" width="400" height="100" fill="transparent" ></rect>\n</svg>\n';const z=F,I=t=>{const e="banner-"+ ++kt.counter,r=document.importNode(z.content,!0),i=r.querySelector("svg");if(i){i.setAttribute("data-unique-id",e);const n=r.querySelector("clipPath");n&&(n.id=`shape-${e}`);const o=r.querySelector("#rect-bg");o&&o.setAttribute("fill",t.supportingBackgroundColor||"transparent");const s=r.querySelector("image");s&&(s.setAttribute("href",t.banner||""),s.setAttribute("clip-path",`url(#shape-${e})`))}return i},O=document.createElement("template");O.innerHTML='\n<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath>\n\t\t\t<rect></rect>\n\t\t</clipPath>\n\t\t<filter>\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<rect id="bg-color" fill="transparent"></rect>\n\t<image preserveAspectRatio="xMidYMid slice"></image>\n\t<rect fill="transparent" id="mask">\n\t\t<title></title>\n\t</rect>\n</svg>\n';const D=O,G=(t,e,r,i)=>{const n=t.querySelector("clipPath");if(n){n.id=`rect-${e}`;const t=n.firstElementChild;t&&(t.setAttribute("x",""+r/2),t.setAttribute("y",""+r/2),t.setAttribute("width",""+(100-r)),t.setAttribute("height",""+(100-r)),t.setAttribute("rx",T(i,100)),t.setAttribute("ry",T(i,100)))}},L=(t,e,r,i)=>{const n=t.querySelector("#bg-color");n&&(n.setAttribute("x",""+r/2),n.setAttribute("y",""+r/2),n.setAttribute("width",""+(100-r)),n.setAttribute("height",""+(100-r)),n.setAttribute("rx",T(i,100)),n.setAttribute("ry",T(i,100)),n.setAttribute("fill",e||"transparent"))},Y=(t,e,r,i)=>{const n=t.querySelector("image");n&&(n.setAttribute("x",""+i/2),n.setAttribute("y",""+i/2),n.setAttribute("width",""+(100-i)),n.setAttribute("height",""+(100-i)),n.setAttribute("href",e),n.setAttribute("clip-path",`url(#rect-${r})`))},H=(t,e,r,i,n=!1)=>{const o=t.querySelector("#mask");o&&(o.setAttribute("x",""+r/2),o.setAttribute("y",""+r/2),o.setAttribute("width",""+(100-r)),o.setAttribute("height",""+(100-r)),o.setAttribute("rx",T(i.shape,100)),o.setAttribute("ry",T(i.shape,100)),o.setAttribute("stroke",i.strokeColor||""),o.setAttribute("stroke-width",String(n?r:0)),o?.firstElementChild&&(o.firstElementChild.textContent=e||""))};function V(t,e,r){const i=t.querySelector("filter");i&&e?i.id=`blur-${r}`:i?.remove()}const K=(t,e,r,i)=>{const n=""+ ++kt.counter,o=i.strokeWidth||0,s=document.importNode(D.content,!0),c=s.querySelector("svg");return c&&(c.setAttribute("width",`${i.size}`),c.setAttribute("height",`${i.size}`),c.setAttribute("data-unique-id",n),c.setAttribute("data-template-type","base"),G(s,n,o,i.shape),L(s,r,o,i.shape),Y(s,e,n,o),H(s,t,o,i,!1)),c},X=document.createElement("template");X.innerHTML='\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath id="contextual-path">\n\t\t\t<circle cx="0" cy="0" r="0"></circle>\n\t\t</clipPath>\n\t\t<clipPath id="context-path">\n\t\t\t<circle cx="0" cy="0" r="0"></circle>\n\t\t</clipPath>\n\n\t\t<filter id="contextual-blur">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<circle id="contextual-bg-circle" fill="transparent"></circle>\n\t<image\n\t\tid="contextual-image"\n\t\tpreserveAspectRatio="xMidYMid slice">\n\t</image>\n\t<circle\n\t\tid="contextual-circle"\n\t\tfill="transparent">\n\t\t<title></title>\n\t</circle>\n\n\t<circle id="context-bg-circle" fill="transparent"></circle>\n\t<image\n\t\tid="context-image"\n\t\tpreserveAspectRatio="xMidYMid slice">\n\t</image>\n\t<circle\n\t\tid="context-circle"\n\t\tfill="transparent">\n\t\t<title></title>\n\t</circle>\n</svg>\n';const Q=X;function j(t,e,r,i){const n=t.querySelector("#contextual-path");if(n){n.id=`contextual-circle-${e}`;const t=n.firstElementChild;t&&(t.setAttribute("cx",`${r.cx}`),t.setAttribute("cy",`${r.cy}`),t.setAttribute("r",`${r.r}`))}const o=t.querySelector("#context-path");if(o){o.id=`context-circle-${e}`;const t=o.firstElementChild;t&&(t.setAttribute("cx",`${i.cx}`),t.setAttribute("cy",`${i.cy}`),t.setAttribute("r",`${i.r}`))}}function _(t,e,r,i=!1,n,o,s,c,l,a=!1){const u=t.querySelector("#contextual-bg-circle");u&&(u.setAttribute("cx",`${r.cx}`),u.setAttribute("cy",`${r.cy}`),u.setAttribute("r",`${r.r}`),u.setAttribute("fill",s||"transparent"));const p=t.querySelector("#contextual-image");p&&(p.setAttribute("x",""+(r.cx-r.r)),p.setAttribute("y",""+(r.cy-r.r)),p.setAttribute("width",""+2*r.r),p.setAttribute("height",""+2*r.r),p.setAttribute("href",n),p.setAttribute("clip-path",`url(#contextual-circle-${e})`),i&&p.setAttribute("filter",`url(#contextual-blur-${e})`));const d=t.querySelector("#contextual-circle");if(d){d.setAttribute("cx",`${r.cx}`),d.setAttribute("cy",`${r.cy}`),d.setAttribute("r",`${r.r}`),d.setAttribute("stroke",l),d.setAttribute("stroke-width",String(a?c:0));const t=d.firstElementChild;t&&(t.textContent=o||"")}}function J(t,e,r,i,n,o,s,c,l=!1){const a=t.querySelector("#context-image"),u=t.querySelector("#context-circle");if(a&&u){const p=t.querySelector("#context-bg-circle");p&&(p.setAttribute("cx",String(r.cx)),p.setAttribute("cy",String(r.cy)),p.setAttribute("r",String(r.r)),p.setAttribute("fill",o||"transparent")),a.setAttribute("href",i||""),a.setAttribute("x",String(r.cx-r.r)),a.setAttribute("y",String(r.cy-r.r)),a.setAttribute("width",String(2*r.r)),a.setAttribute("height",String(2*r.r)),a.setAttribute("clip-path",`url(#context-circle-${e})`),u.setAttribute("cx",String(r.cx)),u.setAttribute("cy",String(r.cy)),u.setAttribute("r",String(r.r)),u.setAttribute("stroke",c),u.setAttribute("stroke-width",String(l?s:0)),u.setAttribute("fill","transparent");const d=u.firstElementChild;d&&n&&(d.textContent=n)}}function Z(t,e,r){const i=t.querySelector("#contextual-blur");i&&r?i.id=`contextual-blur-${e}`:i?.remove()}function tt(t,e,r){return{cx:"bottomRight"===t.contextPosition||"topRight"===t.contextPosition?e.cx+e.r-10-r/2:e.cx-e.r+10+r/2,cy:"bottomRight"===t.contextPosition||"bottomLeft"===t.contextPosition?e.cy+e.r-10-r/2:e.cy-e.r+10+r/2,r:20}}const et=(t,e,r,i,n,o,s)=>{const c=s.strokeWidth||0,l=""+ ++kt.counter,a={cx:50,cy:50,r:40},u=tt(s,a,c),p=document.importNode(Q.content,!0),d=p.querySelector("svg");return d&&(d.setAttribute("width",`${s.size}`),d.setAttribute("height",`${s.size}`),d.setAttribute("data-unique-id",l),d.setAttribute("data-template-type","contextual"),j(p,l,a,u),_(p,l,a,!1,e,t,n,c,s.strokeColor||"",!1),s.context&&"none"!==s.context&&J(p,l,u,i,r,o,c,s.strokeColor||"",!1)),d},rt=document.createElement("template");rt.innerHTML='\n<svg\n\txmlns="http://www.w3.org/2000/svg"\n\txmlnsXlink="http://www.w3.org/1999/xlink"\n\tversion="1.1"\n\tviewBox="0 0 100 100">\n\t<defs>\n\t\t<clipPath id="token0-path">\n\t\t\t<circle></circle>\n\t\t</clipPath>\n\t\t<clipPath id="token1-path">\n\t\t\t<circle></circle>\n\t\t</clipPath>\n\t\t<clipPath id="context-path">\n\t\t\t<circle></circle>\n\t\t</clipPath>\n\n\t\t<filter id="blur0">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t\t<filter id="blur1">\n\t\t\t<feGaussianBlur in="SourceGraphic" stdDeviation="7" />\n\t\t</filter>\n\t</defs>\n\n\t<circle id="token0-bg-circle"></circle>\n\t<image preserveAspectRatio="xMidYMid slice" id="token0-image"></image>\n\t<circle fill="transparent" id="token0-circle"> <title></title></circle>\n\n\t<circle id="token1-bg-circle"></circle>\n\t<image preserveAspectRatio="xMidYMid slice" id="token1-image"></image>\n\t<circle fill="transparent" id="token1-circle">\n\t\t<title></title>\n\t</circle>\n\n\t<circle id="context-bg-circle"></circle>\n\t<image preserveAspectRatio="xMidYMid slice" id="context-image"></image>\n\t<circle fill="transparent" id="context-circle">\n\t\t<title></title>\n\t</circle>\n</svg>\n';const it=rt;function nt(t,e,r,i,n){const o=t.querySelector("#token0-path");if(o){o.id=`token0-circle-${e}`;const t=o.firstElementChild;t&&(t.setAttribute("cx",`${r.cx}`),t.setAttribute("cy",`${r.cy}`),t.setAttribute("r",`${r.r}`))}const s=t.querySelector("#token1-path");if(s){s.id=`token1-circle-${e}`;const t=s.firstElementChild;t&&(t.setAttribute("cx",`${i.cx}`),t.setAttribute("cy",`${i.cy}`),t.setAttribute("r",`${i.r}`))}const c=t.querySelector("#context-path");if(c){c.id=`context-circle-${e}`;const t=c.firstElementChild;t&&(t.setAttribute("cx",`${n.cx}`),t.setAttribute("cy",`${n.cy}`),t.setAttribute("r",`${n.r}`))}}function ot(t,e,r,i){const n=t.querySelector("#blur0");n&&r?n.id=`blur0-${e}`:n?.remove();const o=t.querySelector("#blur1");o&&i?o.id=`blur1-${e}`:o?.remove()}function st(t,e,r,i,n=!1,o=!1,s,c,l,a){const u=t.querySelector("#token0-bg-circle");u&&(u.setAttribute("cx",`${r.cx}`),u.setAttribute("cy",`${r.cy}`),u.setAttribute("r",`${r.r}`),u.setAttribute("fill",s.token0.supportingBackgroundColor||"transparent"));const p=t.querySelector("#token0-image");p&&(p.setAttribute("x",""+(r.cx-r.r)),p.setAttribute("y",""+(r.cy-r.r)),p.setAttribute("width",""+2*r.r),p.setAttribute("height",""+2*r.r),p.setAttribute("href",s.token0.pic),p.setAttribute("clip-path",`url(#token0-circle-${e})`),n&&p.setAttribute("filter",`url(#blur0-${e})`));const d=t.querySelector("#token0-circle");if(d){d.setAttribute("cx",`${r.cx}`),d.setAttribute("cy",`${r.cy}`),d.setAttribute("r",`${r.r}`),d.setAttribute("stroke",c),d.setAttribute("stroke-width",String(a?l:0));const t=d?.firstElementChild;t&&(t.textContent=s.token0.title||s.token0.address)}const g=t.querySelector("#token1-bg-circle");g&&(g.setAttribute("cx",`${i.cx}`),g.setAttribute("cy",`${i.cy}`),g.setAttribute("r",`${i.r}`),g.setAttribute("fill",s.token1.supportingBackgroundColor||"transparent"));const f=t.querySelector("#token1-image");f&&(f.setAttribute("x",""+(i.cx-i.r)),f.setAttribute("y",""+(i.cy-i.r)),f.setAttribute("width",""+2*i.r),f.setAttribute("height",""+2*i.r),f.setAttribute("href",s.token1.pic),f.setAttribute("clip-path",`url(#token1-circle-${e})`),o&&f.setAttribute("filter",`url(#blur1-${e})`));const h=t.querySelector("#token1-circle");if(h){h.setAttribute("cx",`${i.cx}`),h.setAttribute("cy",`${i.cy}`),h.setAttribute("r",`${i.r}`),h.setAttribute("stroke",c),h.setAttribute("stroke-width",String(a?l:0));const t=h?.firstElementChild;t&&(t.textContent=s.token1.title||s.token1.address)}}function ct(t,e,r,i,n,o,s){const c=t.querySelector("#context-image"),l=t.querySelector("#context-circle");if(c&&l){const a=t.querySelector("#context-bg-circle");a&&(a.setAttribute("cx",`${r.cx}`),a.setAttribute("cy",`${r.cy}`),a.setAttribute("r",`${r.r}`),a.setAttribute("fill",i?.supportingBackgroundColor||"transparent")),c.setAttribute("href",i?.pic||""),c.setAttribute("x",String(r.cx-r.r)),c.setAttribute("y",String(r.cy-r.r)),c.setAttribute("width",String(2*r.r)),c.setAttribute("height",String(2*r.r)),c.setAttribute("clip-path",`url(#context-circle-${e})`),l.setAttribute("cx",String(r.cx)),l.setAttribute("cy",String(r.cy)),l.setAttribute("r",String(r.r)),l.setAttribute("stroke",n||""),l.setAttribute("stroke-width",String(s?o:0)),l.setAttribute("fill","transparent");const u=l.firstElementChild;u&&i?.title&&(u.textContent=i.title)}}function lt(t,e,r,i){const n=12.5;return{r:n,cx:"bottomRight"===t.contextPosition||"topRight"===t.contextPosition?r.cx+r.r/2+6.25-i/2:e.cx-e.r/2-6.25+i/2,cy:"bottomRight"===t.contextPosition||"bottomLeft"===t.contextPosition?r.cy+r.r/2+6.25-i/2:e.cy-e.r/2-6.25+i/2}}const at=(t,e)=>{const r=e.strokeWidth||0,i="lp-"+ ++kt.counter,n={cx:32.5,cy:50,r:25},o={cx:67.5,cy:50,r:25},s=lt(e,n,o,r),c=S(e,t),l=document.importNode(it.content,!0),a=l.querySelector("svg");return a&&(a.setAttribute("width",`${e.size}`),a.setAttribute("height",`${e.size}`),a.setAttribute("data-unique-id",i),a.setAttribute("data-template-type","lp"),nt(l,i,n,o,s),st(l,i,n,o,!1,!1,t,e.strokeColor||"",r,!1),"none"!==c.type&&ct(l,i,s,c,e.strokeColor||"",r,!1)),a},ut=(t,e)=>{if("token"===e.type){if(l(t))return at(t,e);if(a(t)){const r=S(e,t);return et(t.title,t.originalToken.pic,r.title,r.pic,t.originalToken.supportingBackgroundColor,r.supportingBackgroundColor,e)}if(c(t))return"network"===e.context?et(t.title,t.pic,t.network.title,t.network.pic,t.supportingBackgroundColor,t.network.supportingBackgroundColor,e):K(t.title,t.pic,t.supportingBackgroundColor,e)}if("profile"===e.type&&u(t))return K(t.title,t.pic,t.supportingBackgroundColor,e);if("banner"===e.type&&p(t))return I(t);if("node"===e.type&&d(t))return K(t.title,t.pic,t.supportingBackgroundColor,e);if("network"===e.type&&g(t))return K(t.title,t.pic,t.supportingBackgroundColor,e);if("app"===e.type&&f(t))return K(t.title,t.pic,t.supportingBackgroundColor,e);throw new Error("svg couldn't be generated.")},pt=(t,e,r)=>{const i=C(r.censor,e?.sensitivity);if(t){const r=t.getAttribute("data-unique-id"),n=t.querySelector("filter");n&&i?n.id=`blur-${r}`:n?.remove();const o=t.querySelector("#rect-bg");o&&o.setAttribute("fill",e.supportingBackgroundColor||"transparent");const s=t.querySelector("image");s&&(s.setAttribute("href",e.banner||""),i&&s.setAttribute("filter",`url(#blur-${r})`))}},dt=(t,e,r,i,n,o,s)=>{const c=t.getAttribute("data-unique-id"),l=o.strokeWidth||0,a=C(o.censor,n);if("base"===t?.getAttribute("data-template-type")){if(t){V(t,a,c);const n=t.querySelector("#bg-color");n&&n.setAttribute("fill",i||"transparent");const o=t.querySelector("image");o&&(o.setAttribute("href",r),a&&o.setAttribute("filter",`url(#blur-${c})`));const u=o?.nextElementSibling;if(u&&("success"===s&&u.setAttribute("stroke-width",String(l)),!a)){const t=u.firstElementChild;t&&(t.textContent=e)}}}else{const n=document.importNode(D.content,!0).querySelector("svg");n&&(t.replaceWith(n),G(n,c,l,o.shape),V(n,a,c),L(n,i,l,o.shape),Y(n,r,c,l),H(n,e,l,o,!0))}},gt=(t,e,r,i,n,o,s,c,l,a)=>{const u=t.getAttribute("data-unique-id"),p=l.strokeWidth||0,d=C(l.censor,o);if(t&&"contextual"===t?.getAttribute("data-template-type")){Z(t,u,d);const o=t.querySelector("#contextual-bg-circle");o?.setAttribute("fill",s||"transparent");const g=t.querySelector("#contextual-image");g&&(g.setAttribute("href",r),d&&g.setAttribute("filter",`url(#contextual-blur-${u})`));const f=t.querySelector("#contextual-circle");if(f&&("success"===a&&f.setAttribute("stroke-width",`${p}`),!d)){const t=f.firstElementChild;t&&(t.textContent=e||"")}const h=t.querySelector("#context-image"),k=t.querySelector("#context-circle");if(h&&k&&"none"!==l.context){const e=t.querySelector("#context-bg-circle");e?.setAttribute("fill",c||"transparent"),h.setAttribute("href",n||""),n&&"success"===a&&k.setAttribute("stroke-width",`${p}`),k.setAttribute("fill","transparent");const r=k.firstElementChild;r&&(r.textContent=i||"")}return}const g={cx:50,cy:50,r:40},f=tt(l,g,p),h=document.importNode(Q.content,!0).querySelector("svg");t&&h&&(t.replaceWith(h),j(h,u,g,f),Z(h,u,d),_(h,u,g,d,r,e,s,p,l.strokeColor||"",!0),l.context&&"none"!==l.context&&J(h,u,f,n,i,c,p,l.strokeColor||"",!0))},ft=(t,e,r,i)=>{const n=t.getAttribute("data-unique-id"),o=r.strokeWidth||0,s=C(r.censor,e.token0.sensitivity),c=C(r.censor,e.token1.sensitivity),l=S(r,e);if(t&&"lp"===t?.getAttribute("data-template-type")){ot(t,n,s,c);const r=t.querySelector("#token0-bg-circle");r&&r.setAttribute("fill",e.token0.supportingBackgroundColor||"transparent");const a=t.querySelector("#token0-image");a&&(a.setAttribute("href",e.token0.pic),s&&a.setAttribute("filter",`url(#blur0-${n})`));const u=t.querySelector("#token0-circle");if(u&&("success"===i&&u.setAttribute("stroke-width",`${o}`),!s)){const t=u?.firstElementChild;t&&(t.textContent=e.token0.title||e.token0.address)}const p=t.querySelector("#token1-bg-circle");p&&p.setAttribute("fill",e.token1.supportingBackgroundColor||"transparent");const d=t.querySelector("#token1-image");d&&(d.setAttribute("href",e.token1.pic),c&&d.setAttribute("filter",`url(#blur1-${n})`));const g=t.querySelector("#token1-circle");if(g&&("success"===i&&g.setAttribute("stroke-width",`${o}`),!c)){const t=g?.firstElementChild;t&&(t.textContent=e.token1.title||e.token1.address)}const f=t.querySelector("#context-image"),h=t.querySelector("#context-circle");if(f&&h&&"none"!==l.type){const e=t.querySelector("#context-bg-circle");e&&e.setAttribute("fill",l.supportingBackgroundColor||"transparent"),f.setAttribute("href",l.pic||""),"success"===i&&l.pic&&h.setAttribute("stroke-width",`${o}`);const r=h.firstElementChild;r&&(r.textContent=l.title)}return}const a={cx:32.5,cy:50,r:25},u={cx:67.5,cy:50,r:25},p=lt(r,a,u,o),d=document.importNode(it.content,!0).querySelector("svg");t&&d&&(t.replaceWith(d),nt(d,n,a,u,p),ot(d,n,s,c),st(d,n,a,u,s,c,e,r.strokeColor||"",o,!0),"none"!==l.type&&ct(d,n,p,l,r.strokeColor||"",o,!0))},ht=(t,e,r,i)=>{if(t.style.display="inline","token"===r.type){if(l(e))return ft(t,e,r,i);if(a(e)){const n=S(r,e);return gt(t,e.title,e.originalToken.pic,n.title,n.pic,e.originalToken.sensitivity,e.originalToken.supportingBackgroundColor,n.supportingBackgroundColor,r,i)}if(c(e))return"network"===r.context?gt(t,e.title,e.pic,e.network.title,e.network.pic,e.sensitivity,e.supportingBackgroundColor,e.network.supportingBackgroundColor,r,i):dt(t,e.title,e.pic,e.supportingBackgroundColor,e.sensitivity,r,i)}if("profile"===r.type&&u(e))return dt(t,e.title,e.pic,e.supportingBackgroundColor,e.sensitivity,r,i);if("banner"===r.type&&p(e))return pt(t,e,r);if("node"===r.type&&d(e))return dt(t,e.title,e.pic,e.supportingBackgroundColor,"safe",r,i);if("network"===r.type&&g(e))return dt(t,e.title,e.pic,e.supportingBackgroundColor,"safe",r,i);if("app"===r.type&&f(e))return dt(t,e.title,e.pic,e.supportingBackgroundColor,"safe",r,i);throw new Error("svg couldn't be generated.")};let kt={apiUrl:"https://davincigraph.art/api/v1",counter:0,colorRegex:/#(?:[0-9A-Fa-f]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|transparent/};class bt extends HTMLElement{set type(t){this.setAttribute("type",t)}get type(){const t=this.getAttribute("type");if(t&&function(t){return null!==t&&r.includes(t)}(t))return t;throw new Error("Type is mandatory.")}set network(t){this.setAttribute("network",t)}get network(){const t=this.getAttribute("network");if("app"!==this.type&&!t)throw new Error("Network is not defined on the element.");return t||""}set address(t){this.setAttribute("address",t)}get address(){const t=this.getAttribute("address");if("app"!==this.type&&"network"!==this.type&&!t)throw new Error("Network is not defined on the element.");return t||""}set name(t){this.setAttribute("name",t)}get name(){const t=this.getAttribute("name");if("app"===this.type&&t)return t;throw new Error("Name is necessary for an app.")}set offlineMode(t){t?this.setAttribute("offline-mode",""):this.removeAttribute("offline-mode")}get offlineMode(){return this.hasAttribute("offline-mode")}set complexTokenType(t){if("token"===this.type)throw new Error("Complex token type is specifically for token type.");if("lp"!==t&&"wrapped"!==t)throw new Error("The value given for complex token type is invalid.");this.setAttribute("complex-token-type",t)}get complexTokenType(){const t=this.getAttribute("complex-token-type");if("lp"===t||"wrapped"===t)return t}set size(t){this.setAttribute("size",t.toString())}get size(){const t=this.getAttribute("size");return t?parseFloat(t):100}set shape(t){this.setAttribute("shape",t)}get shape(){const t=this.getAttribute("shape");return function(t){return null!==t&&o.includes(t)}(t)?t:"circle"}set context(t){this.setAttribute("context",t)}get context(){const t=this.getAttribute("context");return function(t){return null!==t&&i.includes(t)}(t)?t:"app"}set contextPosition(t){this.setAttribute("context-position",t)}get contextPosition(){const t=this.getAttribute("context-position");return function(t){return null!==t&&n.includes(t)}(t)?t:"bottomRight"}set strokeWidth(t){this.setAttribute("stroke-width",t.toString())}get strokeWidth(){const t=this.getAttribute("stroke-width");return t&&!isNaN(Number(t))?parseFloat(t):0}set strokeColor(t){this.setAttribute("stroke-color",t)}get strokeColor(){return this.getAttribute("stroke-color")||"gray"}set censor(t){this.setAttribute("censor",t)}get censor(){const t=this.getAttribute("censor");return function(t){return null!==t&&s.includes(t)}(t)?t:"copyright-violated"}set dataTitle(t){this.setAttribute("data-type",t)}get dataTitle(){return this.getAttribute("data-title")||""}set dataPicUrl(t){this.setAttribute("data-pic-url",t)}get dataPicUrl(){return this.getAttribute("data-pic-url")||""}set dataContextTitle(t){this.setAttribute("data-context-title",t)}get dataContextTitle(){return this.getAttribute("data-context-title")||""}set dataContextPicUrl(t){this.setAttribute("data-context-pic-url",t)}get dataContextPicUrl(){return this.getAttribute("data-context-pic-url")||""}set placeholder(t){this.setAttribute("placeholder",t)}get placeholder(){return this.getAttribute("placeholder")||"default"}set loadingEffect(t){this.setAttribute("loading-effect",t)}get loadingEffect(){return this.getAttribute("loading-effect")||"transparent"}set FailureEffect(t){this.setAttribute("failure-effect",t)}get FailureEffect(){return this.getAttribute("failure-effect")||"placeholder"}set delayResponseTime(t){this.setAttribute("delay-response-time",t.toString())}get delayResponseTime(){const t=this.getAttribute("delay-response-time");return t&&!isNaN(Number(t))?parseFloat(t):0}observer;interval;constructor(){super(),this.observer=new IntersectionObserver(this.handleIntersection.bind(this),{root:null,rootMargin:"200px 0px",threshold:0})}connectedCallback(){this.style.display="inline-block",this.style.verticalAlign="top",this.style.transition="opacity 1s",this.style.opacity="1",this.observer.observe(this)}disconnectedCallback(){this.observer.unobserve(this),this.clearInterval()}async handleIntersection(t,r){for(const n of t)if(n.isIntersecting){r.unobserve(n.target);try{const t=U(this),r=R((!t.loadingEffect||t.loadingEffect.endsWith("placeholder")?t.placeholder:t.loadingEffect)||"transparent",t.type),n=M(t,r);let o=ut(n,t);o&&(o.style.display="hide"===t.loadingEffect?"none":"inline",this.appendChild(o),"banner"===t.type?this.style.width="100%":(this.style.width=`${this.size}px`,this.style.height=`${this.size}px`),(t.loadingEffect?.startsWith("pulse")||t.loadingEffect?.startsWith("'pulse"))&&(this.interval=setInterval((()=>{this.style.opacity="1"===this.style.opacity?"0.5":"1"}),1e3))),await this.delay();const s=!0===t.offlineMode?{}:await e(t),c=q(n,s,t,r);this.clearInterval();const l=(i=s)&&0!==Object.keys(i).length||t.dataPicUrl?"success":"failed";"failed"===l&&"hide"===t.FailureEffect?this.remove():ht(o,c,t,l)}catch(t){console.error(`DavinciPics: ${t.message}`)}}var i}delay=()=>new Promise((t=>{setTimeout((()=>{t(!0)}),this.delayResponseTime)}));clearInterval=()=>{clearInterval(this.interval),this.style.opacity="1"}}customElements.define("davinci-pic",bt)})();