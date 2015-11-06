!function(t,e){var a=e(t,t.document);t.lazySizes=a,"object"==typeof module&&module.exports?module.exports=a:"function"==typeof define&&define.amd&&define(a)}(window,function(t,e){"use strict";if(e.getElementsByClassName){var a,i=e.documentElement,n="addEventListener",r=t[n],s=t.setTimeout,o=t.requestAnimationFrame||s,l=t.setImmediate||s,u=/^picture$/i,c=["load","error","lazyincluded","_lazyloaded"],d={},f=function(t,e){return d[e]||(d[e]=new RegExp("(\\s|^)"+e+"(\\s|$)")),d[e].test(t.className)&&d[e]},m=function(t,e){f(t,e)||(t.className=t.className.trim()+" "+e)},g=function(t,e){var a;(a=f(t,e))&&(t.className=t.className.replace(a," "))},z=function(t,e,a){var i=a?n:"removeEventListener";a&&z(t,e),c.forEach(function(a){t[i](a,e)})},v=function(t,a,i,n,r){var s=e.createEvent("CustomEvent");return s.initCustomEvent(a,!n,!r,i||{}),t.dispatchEvent(s),s},y=function(e,i){var n;(n=t.picturefill||t.respimage||a.pf)?n({reevaluate:!0,elements:[e]}):i&&i.src&&(e.src=i.src)},p=function(t,e){return(getComputedStyle(t,null)||{})[e]},A=function(t,e,i){for(i=i||t.offsetWidth;i<a.minSize&&e&&!t._lazysizesWidth;)i=e.offsetWidth,e=e.parentNode;return i},C=function(e){var a,i=0,n=t.Date,r=function(){a=!1,i=n.now(),e()},u=function(){l(r)},c=function(){o(u)};return function(){if(!a){var t=125-(n.now()-i);a=!0,6>t&&(t=6),s(c,t)}}},b=function(){var l,c,d,A,b,E,N,M,w,_,x,W,B,S,R,D,L=/^img$/i,O=/^iframe$/i,T="onscroll"in t&&!/glebot/.test(navigator.userAgent),$=0,k=0,F=0,P=0,I=function(t){F--,t&&t.target&&z(t.target,I),(!t||0>F||!t.target)&&(F=0)},j=function(t,e){var a,i=t,n="hidden"!=p(t,"visibility");for(w-=e,W+=e,_-=e,x+=e;n&&(i=i.offsetParent);)n=(p(i,"opacity")||1)>0,n&&"visible"!=p(i,"overflow")&&(a=i.getBoundingClientRect(),n=x>a.left&&_<a.right&&W>a.top-1&&w<a.bottom+1);return n},q=function(){var t,e,i,n,r,s,o,u,f;if((b=a.loadMode)&&8>F&&(t=l.length)){for(e=0,P++,D>k&&1>F&&P>3&&b>2?(k=D,P=0):k=b>1&&P>2&&6>F?R:$;t>e;e++)l[e]&&!l[e]._lazyRace&&(T?((u=l[e].getAttribute("data-expand"))&&(s=1*u)||(s=k),f!==s&&(N=innerWidth+s,M=innerHeight+s,o=-1*s,f=s),i=l[e].getBoundingClientRect(),(W=i.bottom)>=o&&(w=i.top)<=M&&(x=i.right)>=o&&(_=i.left)<=N&&(W||x||_||w)&&(d&&3>F&&!u&&(3>b||4>P)||j(l[e],s))?(Q(l[e]),r=!0,F>6&&(k=$)):!r&&d&&!n&&3>F&&4>P&&b>2&&(c[0]||a.preloadAfterLoad)&&(c[0]||!u&&(W||x||_||w||"auto"!=l[e].getAttribute(a.sizesAttr)))&&(n=c[0]||l[e])):Q(l[e]));n&&!r&&Q(n)}},H=C(q),G=function(t){m(t.target,a.loadedClass),g(t.target,a.loadingClass),z(t.target,G)},J=function(t,e){try{t.contentWindow.location.replace(e)}catch(a){t.setAttribute("src",e)}},K=function(){var t,e=[],a=function(){for(;e.length;)e.shift()();t=!1};return function(i){e.push(i),t||(t=!0,o(a))}}(),Q=function(t){var e,i,n,r,o,l,c,p,C,b,E,N,M=L.test(t.nodeName),w=M&&(t.getAttribute(a.sizesAttr)||t.getAttribute("sizes")),_="auto"==w;(!_&&d||!M||!t.src&&!t.srcset||t.complete||f(t,a.errorClass))&&(_&&(N=t.offsetWidth),t._lazyRace=!0,F++,K(function(){if(t._lazyRace&&delete t._lazyRace,g(t,a.lazyClass),!(C=v(t,"lazybeforeunveil")).defaultPrevented){if(w&&(_?(m(t,a.autosizesClass),h.updateElem(t,!0,N)):t.setAttribute("sizes",w)),l=t.getAttribute(a.srcsetAttr),o=t.getAttribute(a.srcAttr),M&&(c=t.parentNode,p=c&&u.test(c.nodeName||"")),b=C.detail.firesLoad||"src"in t&&(l||o||p),C={target:t},b&&(z(t,I,!0),clearTimeout(A),A=s(I,2500),m(t,a.loadingClass),z(t,G,!0)),p)for(e=c.getElementsByTagName("source"),i=0,n=e.length;n>i;i++)(E=a.customMedia[e[i].getAttribute("data-media")||e[i].getAttribute("media")])&&e[i].setAttribute("media",E),r=e[i].getAttribute(a.srcsetAttr),r&&e[i].setAttribute("srcset",r);l?t.setAttribute("srcset",l):o&&(O.test(t.nodeName)?J(t,o):t.setAttribute("src",o)),(l||p)&&y(t,{src:o})}(!b||t.complete)&&(b?I(C):F--,G(C))}))},U=function(){if(!d){if(Date.now()-E<999)return void s(U,999);var t,e=function(){a.loadMode=3,R=B,H()};d=!0,a.loadMode=3,F||H(),r("scroll",function(){3==a.loadMode&&(R=S,a.loadMode=2),clearTimeout(t),t=s(e,99)},!0)}};return{_:function(){E=Date.now(),l=e.getElementsByClassName(a.lazyClass),c=e.getElementsByClassName(a.lazyClass+" "+a.preloadClass),R=a.expand,B=R,S=R*((a.expFactor+1)/2),D=R*a.expFactor,r("scroll",H,!0),r("resize",H,!0),t.MutationObserver?new MutationObserver(H).observe(i,{childList:!0,subtree:!0,attributes:!0}):(i[n]("DOMNodeInserted",H,!0),i[n]("DOMAttrModified",H,!0),setInterval(H,999)),r("hashchange",H,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(t){e[n](t,H,!0)}),/d$|^c/.test(e.readyState)?U():(r("load",U),e[n]("DOMContentLoaded",H),s(U,2e4)),H()},checkElems:H,unveil:Q}}(),h=function(){var t,i=function(t,e,a){var i,n,r,s,o=t.parentNode;if(o&&(a=A(t,o,a),s=v(t,"lazybeforesizes",{width:a,dataAttr:!!e}),!s.defaultPrevented&&(a=s.detail.width,a&&a!==t._lazysizesWidth))){if(t._lazysizesWidth=a,a+="px",t.setAttribute("sizes",a),u.test(o.nodeName||""))for(i=o.getElementsByTagName("source"),n=0,r=i.length;r>n;n++)i[n].setAttribute("sizes",a);s.detail.dataAttr||y(t,s.detail)}},n=function(){var e,a=t.length;if(a)for(e=0;a>e;e++)i(t[e])},s=C(n);return{_:function(){t=e.getElementsByClassName(a.autosizesClass),r("resize",s)},checkElems:s,updateElem:i}}(),E=function(){E.i||(E.i=!0,h._(),b._())};return function(){var e,i={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:2,expand:359,loadMode:2};a=t.lazySizesConfig||t.lazysizesConfig||{};for(e in i)e in a||(a[e]=i[e]);t.lazySizesConfig=a,s(function(){a.init&&E()})}(),{cfg:a,autoSizer:h,loader:b,init:E,uP:y,aC:m,rC:g,hC:f,fire:v,gW:A}}});