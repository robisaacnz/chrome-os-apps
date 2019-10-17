var opCollectFrame;!function(e){const t=["script","style"],i=["button","input","select"],n=["form"],o=["body","button","form","head","iframe","input","option","script","select","table","textarea"];e.handleUserInput=(e=>{e.isTrusted&&(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)&&(e.target.opUserEdited=!0)}),e.generateUuid=(()=>window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36)),e.collect=((e,t)=>{const o=e.defaultView?e.defaultView:window,r=C(e,n),d=C(e,i).filter(e=>"hidden"!==e.type),s=t.maxFields||200,u={max:t.maxTime||50,start:Date.now()},m=t.activeFieldOpid&&d[t.activeFieldOpid]?d[t.activeFieldOpid]:e.activeElement instanceof HTMLInputElement?e.activeElement:void 0,c=t.activeFormOnly&&m&&m instanceof HTMLInputElement&&m.form||void 0,p=l(r,c,t.activeFormOnly);return{fields:a(p,d,s,u,m,t.activeFormOnly),forms:p,title:e.title||void 0,url:o.location.href,uuid:uuid}});const l=(e,t,i)=>e.map((e,n)=>{return r(e,n,e===t,i)}),r=(e,t,i,n)=>{const o=t;if(e.opid=o,n&&!i)return{opid:o};let l,r;return L(e)||(l=p(e)||void 0,r=g(e)||void 0),{headerText:l,htmlAction:e.action||void 0,htmlId:e.id||void 0,htmlMethod:e.method||void 0,htmlName:e.getAttribute("name")||void 0,opid:o,textContent:r}},a=(e,t,i,n,o,l)=>{const r=[];let a=[],u=0;const c=Math.min(t.length,i);let p,v=0;for(v=0;v<c&&T(n);v++){if(p=t[v],l&&o&&p.form!==o.form)continue;const i=p===o,n=p.form&&p.form.opid?e[p.form.opid]:void 0;r.push(d(p,v,i,n)),a.push(p),i&&(u=v)}let h,f=r;for(u>0&&(a=m(a,u),f=m(r.slice(),u)),v=0,v=0;v<a.length&&T(n);v++)p=a[v],h=f[v],s(p,h);return r},d=(e,t,i,n)=>{const o=e instanceof HTMLInputElement,l=e instanceof HTMLSelectElement,r=t;e.opid=r;const a=o||l?e.autocomplete:void 0,d=o&&e.checked,s=o&&e.readOnly,u=(o||l)&&e.opUserEdited,m=o&&e.maxLength&&e.maxLength>0?Math.min(e.maxLength,999):void 0,c=o&&e.minLength&&e.minLength>0?e.minLength:void 0,p=o?e.placeholder:void 0,v=l?h(e,n):void 0,f=i||y(e);return{autocompleteType:a||void 0,dataStripe:e.getAttribute("data-stripe")||void 0,formOpid:e.form?e.form.opid:void 0,htmlId:e.id||void 0,htmlName:e.name||void 0,htmlClass:e.className||void 0,isActive:i||void 0,isAriaDisabled:"true"===e.getAttribute("aria-disabled")||void 0,isAriaHasPopup:"true"===e.getAttribute("aria-haspopup")||void 0,isAriaHidden:"true"===e.getAttribute("aria-hidden")||void 0,isChecked:d||void 0,isDisabled:e.disabled||void 0,isHidden:!f||void 0,isReadOnly:s||void 0,isUserEdited:u||void 0,maxLength:m,minLength:c,opid:r,placeholder:p||void 0,selectOptions:v,tabIndex:e.tabIndex||void 0,title:e.title||void 0,type:e.type,value:E(e)||void 0}},s=(e,t)=>{t.label=c(e)||void 0,t.labelAria=e.getAttribute("aria-label")||void 0,t.labelData=e.getAttribute("data-label")||void 0,t.labelLeft=p(e)||void 0,t.labelRight=v(e)||void 0},u=e=>e.replace(/[~`!@$%^&*()\-_+=:;'"\[\]|\\,<.>\/?]/gm," ").replace(/[\r\n\s]+/gm," ").trim().toLowerCase(),m=(e,t)=>{const i=[];let n=t>e.length-1?e.length-1:t<0?0:t,o=n-1;for(;o>=0||n<e.length;)n<e.length&&i.push(e[n]),o>=0&&i.push(e[o]),n++,o--;return i},c=e=>e.labels&&e.labels.length>0?[...e.labels].map(e=>g(e)).join(" "):"",p=e=>{const t=e;let i=t;for(;i&&i.previousSibling&&!((i=i.previousSibling)instanceof HTMLElement&&x(i,o)););const n=i?f(i,t):"";return 0===n.length&&i.parentElement?p(i.parentElement):n},v=e=>{if(!e.nextSibling)return"";const t=e.nextSibling;let i=t;for(;i&&i.nextSibling&&!((i=i.nextSibling)instanceof HTMLElement&&x(i,o)););return i?f(t,i,!0):""},h=(e,t)=>{const{options:i}=e,n=[];return i&&i.length>0&&[...i].forEach(e=>{n.push(u(e.text)),n.push(e.value)}),t&&t.textContent&&(t.textContent=u(t.textContent.replace(g(e),""))),n.length?n:void 0},f=(e,t,i=!1)=>{if(!e||!t||e===t)return"";const n=[];let o=!1;for(;e&&e.nodeType===Node.TEXT_NODE;)n.push(b(e)),e=e.nextSibling;const l=e=>{if(e&&e.firstChild&&e.nodeType===Node.ELEMENT_NODE)for(e=e.firstChild;e&&(e===t&&(o=!0,i&&n.push(b(e))),!o);e=e.nextSibling)l(e);else n.push(b(e))};return e&&l(e),u(n.join(" "))},g=e=>x(e,t)?"":e.innerText?u(e.innerText):e.textContent?u(e.textContent):"",b=e=>e&&e.parentElement&&!x(e.parentElement,t)?e.nodeValue&&e.nodeType===Node.TEXT_NODE?u(e.nodeValue.trim()):e instanceof HTMLElement?g(e):"":"",E=e=>{const{type:t,value:i}=e;switch(t){case"submit":case"button":case"reset":return""===i?g(e):i;default:return i}},x=(e,t)=>!!e&&(t.constructor===Array?-1!==t.indexOf(e.tagName.toLowerCase()):e.tagName.toLowerCase()===t),y=e=>{if(!e)return!1;const t=e.ownerDocument?e.ownerDocument.defaultView:void 0;let i,n=e;do{if(!(i=t?t.getComputedStyle(n):n.style))return!0;if("none"===i.display||"hidden"===i.visibility)return!1;n=n.parentElement}while(n);return!0},L=e=>!!e.parentElement&&x(e.parentElement,"body"),T=e=>Date.now()-e.start<e.max,C=(e,t)=>[...e.querySelectorAll(t.join())]}(opCollectFrame||(opCollectFrame={}));var uuid=opCollectFrame.generateUuid();document.addEventListener("input",opCollectFrame.handleUserInput,!0),opCollectFrame.collect(document,{});