(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},,,,,,function(e,t,n){e.exports=n(19)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(3),c=n.n(o),i=(n(16),n(4)),l=n.n(i),s=(n(17),n(5)),u=n(6),m=n(8),h=n(7),d=n(1),p=n(9),g=(n(18),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={button:"View Source"},n.handleViewSource=n.handleViewSource.bind(Object(d.a)(n)),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"change",value:function(e,t){for(var n,a=window.location.origin;null!==(n=t.exec(e));){var r=n[0],o=n[1]+n[2];r=r.replace(o,a+o),console.log("replacing:",n[0],"to",r),e=e.replace(n[0],r)}return e}},{key:"updateLinks",value:function(e){var t=/href="(\/)(.+)"/;return e=this.change(e,t),t=/src="(\/)(.+)"/,e=this.change(e,t),t=/f.p="(\/)(.+)\/"/,e=this.change(e,t)}},{key:"handleViewSource",value:function(e){if("Hide Source"===this.state.button)return document.getElementsByClassName("ViewSource")[0].remove(),void this.setState({button:"View Source"});var t=e.target,n=t.parentElement,a=document.createElement("textarea"),r="<!DOCTYPE html><html>";a.className="ViewSource",a.rows=16,r+=document.getElementsByTagName("html")[0].innerHTML,r+="</html>",r=(r=this.updateLinks(r)).replace(/</g,"&lt;").replace(/>/g,"&gt;"),a.innerHTML=r,n.insertBefore(a,t),this.setState({button:"Hide Source"})}},{key:"render",value:function(){return r.a.createElement("button",{onClick:this.handleViewSource},this.state.button)}}]),t}(r.a.Component));var w=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:l.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.js")," and save to reload."),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React"),r.a.createElement(g,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.2b824ffb.chunk.js.map