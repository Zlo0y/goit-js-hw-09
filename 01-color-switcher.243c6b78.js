!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.addEventListener("click",(function(){document.body.style.backgroundColor=n();var o=setInterval((function(){document.body.style.backgroundColor=n()}),1e3);e.addEventListener("click",(function(){clearInterval(o),t.removeAttribute("disabled")})),t.setAttribute("disabled","true")}))}();
//# sourceMappingURL=01-color-switcher.243c6b78.js.map
