(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Resume = factory());
}(this, (function () { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function Loader(data) {
    var json = '{}';
    if (!data)
        return json;
    if (typeof data === 'object')
        return data;
    data.charAt(0) === '{' && data.charAt(data.length - 1) === '}' ? json = data : (function () {
        if (data.replace(/(\s*)/g, '').length === 0)
            return json;
        var xhttp = window['XMLHttpRequest'] ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhttp.onreadystatechange = function (e) {
            if (e.currentTarget['readyState'] === 4)
                json = e.currentTarget['status'] === 200 ? e.currentTarget['response'] : '{}';
        };
        xhttp.open('GET', data);
        xhttp.send();
    })();
    return JSON.parse(json);
}

// IE not Support
// export default function loadScript(src){
//     return new Promise(function(resolve, reject) {
//         const script = document.createElement('script');
//         script.async = false;
//         script.src = src;
//         script.onload = resolve;
//         script.onerror = reject;
//         document.head.appendChild(script);
//     });
// }
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    }
    else
        script.onload = function () { return callback(); };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

var Renderer = (function () {
    function Renderer(parent) {
        if (!parent)
            throw 'invalid parent';
        this.parent = parent;
    }
    Renderer.prototype.render = function (data) {
        var _this = this;
        this.data = Loader(data);
        this.shadowDOM ? this._render() : (function () {
            var attach = function () { _this.shadowDOM = _this.parent.attachShadow({ mode: 'open' }); _this._render(); };
            !!HTMLElement.prototype.attachShadow ? attach() : loadScript('https://cdn.rawgit.com/webcomponents/shadydom/master/shadydom.min.js', function () { return loadScript('https://cdn.rawgit.com/webcomponents/shadycss/master/scoping-shim.min.js', function () { return attach(); }); });
        })();
    };
    Renderer.prototype._render = function () {
        '_render override';
    };
    return Renderer;
}());

function Style() {
    return "\n    <style>\n        @media(min-width: 600px){\n        .top-bar h2{ float:left;margin:0 }\n        .top-bar ul{ border-top: none !important; text-align: right !important; }\n        .top-content{ font-size:1.125rem }\n        }\n        *{ box-sizing: border-box; }\n        \n        :host{\n        display: block;\n        color: #333;\n        line-height: 1.5;\n        margin:0;\n        font-family : Arial, Helvetica, sans-serif;        \n        }\n\n        .wrapper {\n        max-width: 728px;\n        padding: 0 24px;\n        margin: 0 auto;\n        }\n\n        /* @ \uC0C1\uB2E8 \uD5E4\uB354\uB2E8\n        */\n        .top-header{\n        padding: 1.5rem 0; \n        }     \n    \n        .top-header h1{\n        text-align: center;\n        font-size: 2.4rem;\n        font-weight: 900;        \n        }\n        \n        .top-avatar {\n            width: 95px;\n            max-width: 100%;\n            overflow: hidden;\n            border-radius : 100px;\n            margin: 0 auto;\n            display: block;\n        }\n\n        .top-bar{\n        border-top: 4px solid #c7c7c7;\n        border-bottom: 2px solid #c7c7c7;\n        }\n\n        .top-bar h2{\n        font-weight: 300;\n        font-size: 1.75rem;\n        line-height: 2rem;\n        text-align: center;\n        margin: 0 0 .5rem;        \n        }\n\n        .top-bar ul{\n        margin: 0;\n        padding: 0;\n        position: relative;\n        top: 4px;\n        text-align: center;\n        border-top: 2px solid #c7c7c7;\n        padding-top: .4rem;\n        }\n\n        .top-bar li{\n        display: inline-block;\n        margin-left: 5px;\n        }\n        \n        .top-button{\n        border-radius : 3px;\n        background-color: #efefef;\n        text-decoration: none;\n        text-align: center;\n        display: block;\n        margin: 1.2rem auto;\n        width: 220px;\n        font-size: 1.375rem;\n        color: #333;\n        line-height: 55px;        \n        -webkit-transition:all 0.2s ease;\n        -moz-transition:all 0.2s ease;\n        transition:all 0.2s ease;\n        }\n        \n        .top-button:hover{\n        background-color:#333;\n        color:#fff;\n        }\n\n\n        /* @ \uC139\uD130\uB2E8\n        */\n        section{\n        margin: 0 0 3rem;\n        }\n\n        section header{\n        border-top: 4px solid #c7c7c7;\n        border-bottom: 2px solid #c7c7c7;\n        padding: .2rem 0 .4rem;\n        margin-bottom: 1.5rem;\n        }\n\n        section header h2{\n        font-weight: 900;\n        font-size: 1.75rem;\n        margin: 0;\n        }\n\n        section div{\n        margin-bottom: 2rem;\n        }\n\n        section h4{\n        font-size: 1.025rem;\n        margin: 0 0 .75rem;\n        line-height: 1;\n        }\n\n        section h3{\n        font-weight: 700;\n        margin: 0 0 .75rem;\n        font-size: 1.25rem;\n        line-height: 1;\n        }\n\n        section p{\n        margin: .75rem 0 0;\n        }\n    \n        .skills-wrapper{\n        max-width:500px;\n        }\n\n        /* @ \uD478\uD130\uB2E8\n        */\n        footer{\n        border-top: 4px solid #c7c7c7;\n        padding-top: 1.5rem;\n        text-align: center;\n        margin-bottom: 3rem;\n        }\n\n        footer p{\n        margin: 0;\n        font-size: .875rem;\n        color: #999;\n        }\n\n        footer a{\n        font-weight: 700;\n        color: #333;\n        }\n\n        /* @ SVG \uC544\uC774\uCF58\n        */\n        a:hover svg path{\n        fill:#333;\n        -webkit-transition:all 0.2s ease;\n        -moz-transition:all 0.2s ease;\n        transition:all 0.2s ease;\n        }\n        \n        /* @ font Family\n        */\n        .top-header h1,\n        section h2{ \n        font-family : \"Arial Black\", Gadget, sans-serif;\n        }\n    \n        section h4{ \n        font-family : \"Courier New\", Courier, monospace;\t\n        }\n    \n        a{ \n        color: #333;\n        text-decoration:none;\n        }\n        \n    </style>\n    ";
}

var iconPath = {
    "github": "M14.01,0C6.27,0-0.01,6.28-0.01,14.02 c0,6.19,4.02,11.45,9.59,13.3c0.7,0.13,0.96-0.3,0.96-0.68c0-0.33-0.01-1.21-0.02-2.38c-3.9,0.85-4.72-1.88-4.72-1.88 c-0.64-1.62-1.56-2.05-1.56-2.05c-1.27-0.87,0.1-0.85,0.1-0.85c1.41,0.1,2.15,1.44,2.15,1.44c1.25,2.14,3.28,1.52,4.08,1.16 c0.13-0.91,0.49-1.52,0.89-1.87c-3.11-0.35-6.38-1.56-6.38-6.93c0-1.53,0.55-2.78,1.44-3.76C6.37,9.17,5.89,7.74,6.65,5.81 c0,0,1.18-0.38,3.85,1.44c1.12-0.31,2.32-0.47,3.51-0.47c1.19,0.01,2.39,0.16,3.51,0.47c2.68-1.81,3.85-1.44,3.85-1.44 c0.76,1.93,0.28,3.35,0.14,3.71c0.9,0.98,1.44,2.23,1.44,3.76c0,5.38-3.28,6.57-6.4,6.92c0.5,0.43,0.95,1.29,0.95,2.6 c0,1.87-0.02,3.39-0.02,3.84c0,0.37,0.25,0.81,0.96,0.67c5.56-1.86,9.58-7.11,9.58-13.3C28.03,6.28,21.75,0,14.01,0z",
    "linkdin": "M18.82,15.09v3.61h-2.09v-3.37c0-0.85-0.3-1.42-1.06-1.42c-0.58,0-0.92,0.39-1.07,0.77 c-0.06,0.13-0.07,0.32-0.07,0.51v3.52h-2.09c0,0,0.03-5.71,0-6.3h2.09v0.89c0,0.01-0.01,0.01-0.01,0.02h0.01V13.3 c0.28-0.43,0.77-1.04,1.89-1.04C17.79,12.25,18.82,13.16,18.82,15.09z M9.18,18.7h2.09v-6.3H9.18V18.7z M10.24,9.36 c-0.72,0-1.19,0.47-1.19,1.09c0,0.61,0.45,1.09,1.16,1.09h0.01c0.73,0,1.18-0.48,1.18-1.09C11.39,9.84,10.95,9.36,10.24,9.36z M28,14c0,7.73-6.27,14-14,14S0,21.73,0,14S6.27,0,14,0S28,6.27,28,14z M20.93,8.02c0-0.55-0.46-1-1.02-1H8.09 c-0.57,0-1.02,0.45-1.02,1v11.96c0,0.55,0.46,1,1.02,1h11.82c0.57,0,1.02-0.45,1.02-1V8.02z",
    "facebook": "M14,0C6.27,0,0,6.27,0,14s6.27,14,14,14s14-6.27,14-14S21.73,0,14,0z M20.99,20.22 c0,0.43-0.35,0.77-0.77,0.77h-3.56v-5.42h1.82l0.27-2.11h-2.09v-1.35c0-0.61,0.17-1.03,1.05-1.03l1.12,0V9.2 c-0.19-0.03-0.86-0.08-1.63-0.08c-1.61,0-2.71,0.98-2.71,2.79v1.56h-1.82v2.11h1.82v5.42h-6.7c-0.43,0-0.77-0.35-0.77-0.77V7.78 c0-0.43,0.35-0.77,0.77-0.77h12.44c0.43,0,0.77,0.35,0.77,0.77V20.22z",
    "instagram": "M9.89,7.35h0.49v3.05H9.89V7.35z M7.35,8.26v2.15h0.49V7.44C7.55,7.58,7.35,7.89,7.35,8.26z M18.22,10.3h1.36c0.51,0,0.92-0.41,0.92-0.92V8.38c0-0.51-0.41-0.92-0.92-0.92h-1.36c-0.51,0-0.92,0.41-0.92,0.92v0.99 C17.31,9.87,17.72,10.3,18.22,10.3z M8.2,7.35h0.49v3.05H8.2V7.35z M9.05, 7.35h0.49v3.05H9.05V7.35z M14-0.01 C6.26-0.01-0.01,6.27-0.01,14S6.26,28.01,14,28.01S28.01,21.73,28.01,14S21.74-0.01,14-0.01z M6.63,7.93c0-0.71,0.58-1.3,1.3-1.3 h12.14c0.71,0,1.3,0.59,1.3,1.3v3.05h-4.56c-0.64-0.85-1.66-1.39-2.81-1.39s-2.16,0.55-2.81,1.39H6.63V7.93z M17.09,13.1 c0,1.7-1.39,3.09-3.09,3.09s-3.09-1.39-3.09-3.09s1.39-3.09,3.09-3.09C15.7,10.01,17.09,11.39,17.09,13.1z M21.37,20.07 c0,0.71-0.59,1.3-1.3,1.3H7.93c-0.71,0-1.3-0.59-1.3-1.3V11.5h4.24c-0.25,0.48-0.39,1.02-0.39,1.6c0,1.94,1.58,3.52,3.52,3.52 s3.52-1.58,3.52-3.52c0-0.57-0.14-1.12-0.39-1.6h4.24L21.37,20.07L21.37,20.07z M14,10.58c1.39,0,2.52,1.13,2.52,2.52 s-1.13,2.52-2.52,2.52s-2.52-1.13-2.52-2.52S12.61,10.58,14,10.58z",
    "twitter": "M14,0C6.27,0,0,6.27,0,14s6.27,14,14,14s14-6.27,14-14S21.73,0,14,0z M20.69,10.57 c0.01,0.15,0.01,0.3,0.01,0.45c0,4.56-3.47,9.82-9.82,9.82c-1.95,0-3.76-0.57-5.29-1.55c0.27,0.03,0.54,0.05,0.82,0.05 c1.62,0,3.11-0.55,4.29-1.48c-1.51-0.03-2.79-1.03-3.23-2.4c0.21,0.04,0.43,0.06,0.65,0.06c0.31,0,0.62-0.04,0.91-0.12 c-1.58-0.32-2.77-1.71-2.77-3.39c0-0.01,0-0.03,0-0.04c0.47,0.26,1,0.41,1.56,0.43c-0.93-0.62-1.54-1.68-1.54-2.87 c0-0.63,0.17-1.23,0.47-1.74c1.7,2.09,4.25,3.46,7.12,3.61c-0.06-0.25-0.09-0.52-0.09-0.79c0-1.91,1.55-3.45,3.45-3.45 c0.99,0,1.89,0.42,2.52,1.09c0.79-0.15,1.53-0.44,2.19-0.84c-0.26,0.81-0.81,1.48-1.52,1.91c0.7-0.08,1.36-0.27,1.98-0.54 C21.95,9.47,21.37,10.08,20.69,10.57z",
    "website": "M14.83,7.6c0.03,0.08,0.03,0.14,0,0.19s-0.08,0.07-0.17,0.07c-0.12,0-0.26-0.01-0.4-0.04 s-0.2-0.06-0.18-0.1c0.15-0.15,0.16-0.26,0.03-0.33c-0.13-0.07-0.27-0.11-0.42-0.11s-0.25-0.04-0.3-0.09s-0.03-0.09,0.05-0.09 s0.22,0,0.4,0.01c0.19,0.01,0.31,0.04,0.37,0.08s0.17,0.1,0.33,0.19S14.8,7.52,14.83,7.6z M15.9,13.35c-0.11-0.03-0.2-0.03-0.26,0 s-0.13,0.05-0.2,0.05c-0.08-0.01-0.25-0.09-0.5-0.24s-0.5-0.22-0.77-0.22c-0.11,0.01-0.17,0.04-0.19,0.08s-0.01,0.07,0.01,0.08 c0.02,0.01,0.12,0.03,0.29,0.05s0.4,0.11,0.67,0.26c0.28,0.15,0.48,0.21,0.61,0.19s0.22-0.06,0.28-0.1 c0.07-0.01,0.12-0.03,0.16-0.06S16.01,13.38,15.9,13.35z M13.62,6.85c0.17-0.03,0.3-0.13,0.38-0.3c0.03-0.14-0.04-0.2-0.21-0.18 s-0.29,0.07-0.37,0.13c-0.01,0.03-0.02,0.06-0.03,0.09s-0.02,0.06-0.03,0.07l-0.08,0.1c-0.03,0.03-0.03,0.05-0.02,0.06 C13.32,6.88,13.44,6.89,13.62,6.85z M16.12,7.08c-0.02-0.16-0.11-0.3-0.26-0.41s-0.32-0.19-0.5-0.22c-0.18-0.03-0.38-0.07-0.61-0.12 s-0.4-0.04-0.53,0.04c-0.21,0.18-0.25,0.31-0.12,0.39c0.07,0.03,0.2,0.05,0.38,0.06s0.44,0.15,0.76,0.41 c0.11,0.08,0.29,0.21,0.55,0.37s0.44,0.23,0.55,0.19c0.06-0.06,0.04-0.15-0.05-0.28S16.14,7.24,16.12,7.08z M28,14 c0,7.73-6.27,14-14,14S0,21.73,0,14S6.27,0,14,0S28,6.27,28,14z M21.95,14c-0.06-2.25-0.83-4.12-2.33-5.62 c-1.5-1.5-3.37-2.27-5.62-2.33c-2.25,0.06-4.12,0.83-5.62,2.33c-1.5,1.5-2.27,3.37-2.33,5.62c0.06,2.25,0.83,4.12,2.33,5.62 c1.5,1.5,3.37,2.27,5.62,2.33c0.54,0,1.06-0.05,1.57-0.14c-0.11-0.07-0.17-0.24-0.18-0.51s0.04-0.52,0.16-0.76 c0.15-0.26,0.3-0.61,0.46-1.04c0.15-0.43,0.08-0.77-0.23-1c-0.32-0.18-0.51-0.34-0.57-0.49s-0.19-0.32-0.37-0.54 s-0.28-0.36-0.28-0.44v-0.21c-0.01-0.21,0.05-0.43,0.19-0.66l0.25-0.39c0.01-0.04,0.02-0.1,0.02-0.19v-0.19 c-0.01-0.04-0.07-0.09-0.17-0.16s-0.17-0.1-0.22-0.1s-0.09,0.01-0.11,0.05s-0.07,0.06-0.13,0.06s-0.17-0.04-0.33-0.13 c-0.16-0.09-0.27-0.16-0.32-0.21s-0.1-0.11-0.14-0.19s-0.09-0.15-0.16-0.22s-0.11-0.1-0.16-0.09s-0.12,0-0.23-0.03l-1.45-0.56 c-0.26-0.11-0.43-0.23-0.5-0.37c-0.07-0.14-0.1-0.26-0.1-0.37s-0.06-0.23-0.17-0.37l-0.29-0.37c-0.08-0.12-0.14-0.24-0.17-0.34 s-0.05-0.15-0.06-0.13c-0.01,0.07,0.02,0.23,0.1,0.48s0.12,0.39,0.1,0.43c-0.03,0.01-0.07-0.02-0.12-0.11s-0.12-0.19-0.19-0.3 c-0.06-0.07-0.07-0.15-0.04-0.25c0.03-0.1-0.07-0.38-0.29-0.85c-0.22-0.47-0.26-0.85-0.11-1.15s0.24-0.57,0.3-0.82 c0.03-0.21,0.09-0.25,0.19-0.13c0.1,0.12,0.1,0.11,0.02-0.01c-0.08-0.18-0.11-0.4-0.08-0.65c0.03-0.26,0.01-0.46-0.06-0.61 c-0.11-0.1-0.3-0.08-0.58,0.05S9.12,8.14,9.1,8.16c0.03-0.12,0.18-0.28,0.46-0.46l0.87-0.58c0.26-0.17,0.49-0.22,0.69-0.17 s0.41,0.12,0.62,0.21s0.34,0.12,0.37,0.1s0.01-0.06-0.06-0.13s-0.07-0.13,0.01-0.16S12.26,6.96,12.43,7 c0.17,0.03,0.31,0.11,0.42,0.24s0.3,0.18,0.54,0.17s0.32,0.01,0.25,0.06s-0.11,0.12-0.11,0.19c0.04,0.06,0.02,0.1-0.05,0.13 s-0.2,0.1-0.36,0.21s-0.18,0.19-0.05,0.26c0.13,0.07,0.36,0.21,0.67,0.41c0.28,0.19,0.41,0.19,0.41-0.01s-0.02-0.4-0.06-0.61 c-0.01-0.14,0.05-0.19,0.2-0.14s0.22,0.07,0.24,0.08c0.17,0.11,0.27,0.15,0.32,0.11s0.13-0.04,0.26-0.01 c0.17,0.07,0.37,0.19,0.6,0.37l0.41,0.33c-0.43,0.25-0.6,0.41-0.51,0.49s0.2,0.14,0.32,0.2c0.06,0.06,0.02,0.12-0.1,0.21 s-0.2,0.12-0.23,0.12c-0.08-0.08-0.15-0.1-0.2-0.05s-0.1,0.09-0.16,0.13c-0.06,0.04-0.07,0.09-0.05,0.14s0.04,0.09,0.05,0.1 c-0.3,0.07-0.47,0.22-0.49,0.44s-0.02,0.39-0.01,0.49c0,0.08-0.07,0.18-0.21,0.3s-0.24,0.23-0.31,0.34c-0.03,0.14,0,0.29,0.08,0.47 c0.08,0.17,0.08,0.27,0,0.3c-0.08-0.01-0.22-0.12-0.41-0.32c-0.19-0.2-0.55-0.24-1.08-0.13c-0.19,0.04-0.39,0.16-0.6,0.36 s-0.23,0.49-0.06,0.88c0.21,0.32,0.43,0.38,0.68,0.19c0.25-0.19,0.43-0.3,0.56-0.31c0.1,0.08,0.12,0.2,0.06,0.35 c-0.06,0.15-0.08,0.24-0.08,0.27c0.06-0.01,0.17,0.02,0.34,0.09s0.28,0.27,0.32,0.58c0.04,0.31,0.19,0.49,0.46,0.55 s0.45,0.08,0.57,0.07s0.28-0.09,0.48-0.24s0.32-0.24,0.37-0.27s0.17-0.06,0.35-0.1s0.47,0.03,0.84,0.23s0.67,0.31,0.88,0.35 s0.38,0.11,0.5,0.2s0.18,0.2,0.18,0.33s0.05,0.23,0.14,0.3c0.15,0.04,0.39,0.07,0.72,0.07s0.57,0.1,0.72,0.28 c0.07,0.28-0.08,0.73-0.46,1.38c-0.37,0.64-0.68,1.05-0.93,1.23c-0.18,0.12-0.34,0.29-0.48,0.49s-0.3,0.38-0.49,0.55 s-0.41,0.34-0.66,0.52s-0.51,0.34-0.78,0.5c-0.21,0.15-0.36,0.32-0.46,0.51s-0.19,0.32-0.27,0.4c1.81-0.43,3.28-1.34,4.43-2.75 C21.31,17.6,21.9,15.93,21.95,14z"
};

function Template$1(data) {
    function icon(item) {
        var result = '';
        Object.keys(item).map(function (entry) {
            var html = "<li>\n                <a href=\"" + item[entry] + "\" target=\"_blank\">\n            \n                <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                    viewBox=\"0 0 28 28\" enable-background=\"new 0 0 28 28\" xml:space=\"preserve\" width=\"28\">\n                \n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#D1CECC\" d=\"" + iconPath[entry] + "\"/>\n                \n                </svg>\n\n                </a>\n            </li>";
            result += html;
        });
        return result;
    }
    return " \n        <header class=\"top-header\">\n        \n        <img src=\"" + (data.avatar || '') + "\" class=\"top-avatar\">\n        \n        <h1>" + (data.name || '') + "</h1>\n        <div class=\"top-bar\">\n            <h2>" + (data.job || '') + "</h2>\n            <ul>\n                " + icon(data.icon || {}) + "\n            </ul>\n        </div>\n        <div class=\"top-content\"><p>" + (data.bio || '') + "</p></div>\n        \n        <a class=\"top-button \" href=\"mailto:" + (data.email || '') + "\" target=\"_blank\">Contact me</a>\n\n        </header>\n    ";
}

function Footer(data) {
    function isLive(bool) {
        return !bool ? '<p>Made by <a href="https://github.com/u4bi">@u4bi</a>. Fork me on <a href="https://github.com/u4bi-dev/resume">GitHub Repository</a>.</p>' : '';
    }
    return "\n        <footer>\n        " + isLive(data.live) + "\n        </footer>\n    ";
}

function ProjectSection(data) {
    function item() {
        var result = '';
        data.map(function (data) {
            var html = "\n                <div>\n                    <a  " + (data.link ? 'href="' + data.link : '') + " \" target=\"_blank\" ><h3>" + (data.name || '') + "</a></h3></a>\n                    <h4>" + (data.date = data.date || {}, data.date.start || '') + " &mdash; " + (data.date.end || '') + "</h4>\n                    <p>" + (data.bio || '') + "</p>\n                </div>\n            ";
            result += html;
        });
        return result;
    }
    return "\n        <section>\n        <header>\n            <h2>Projects</h2>\n        </header>\n        " + item() + "\n        </section>    \n    ";
}

function SkillSection(data) {
    function item() {
        var result = '';
        data.map(function (data) {
            var html = "\n                <div>\n                    <h4>" + (data.title || '') + "</h4>\n                    <p><span>" + (data.entry || '') + "</span></p>\n                </div>\n            ";
            result += html;
        });
        return result;
    }
    return " \n        <section>\n        <header>\n            <h2>Skills</h2>\n        </header>\n        <div class=\"skills-wrapper\">\n            " + item() + "\n        </div>         \n        </section>         \n    ";
}

function ExperienceSection(data) {
    function item() {
        var result = '';
        data.map(function (data) {
            var html = "\n                <div>\n                    <a  " + (data.link ? 'href="' + data.link : '') + " \" target=\"_blank\" ><h3>" + (data.name || '') + "</a></h3></a>\n                    <h4>" + (data.job || '') + " &bull; " + (data.date = data.date || {}, data.date.start || '') + " &mdash; " + (data.date.end || '') + " - " + (data.address || '') + "</h4>\n                    <ul>\n                        " + list(data.bios || []) + "\n                    </ul>\n                </div>\n            ";
            result += html;
        });
        return result;
    }
    function list(data) {
        var result = '';
        data.map(function (data) {
            var html = "\n                <li>\n                    " + data + "\n                </li>\n            ";
            result += html;
        });
        return result;
    }
    return "\n        <section>\n        <header>\n            <h2>Experience</h2>\n        </header>\n        " + item() + "\n        </section>            \n    ";
}

function EduAndCertSection(data) {
    function item() {
        var edu = '', cert = '';
        data.edu = data.edu || [];
        data.cert = data.cert || [];
        data.edu.map(function (data) {
            var html = "\n                 <a  " + (data.link ? 'href="' + data.link : '') + " \" target=\"_blank\" ><h3>" + (data.title || '') + "</a></h3></a>\n                 <h4>" + (data.name || '') + " &bull; " + (data.date = data.date || {}, data.date.start || '') + " - " + (data.date.end || '') + "</h4>\n             ";
            edu += html;
        });
        data.cert.map(function (data) {
            var html = "\n                <a  " + (data.link ? 'href="' + data.link : '') + " \" target=\"_blank\" ><h3>" + (data.title || '') + "</a></h3></a>\n                <h4>" + (data.name || '') + " &bull; " + (data.date || '') + "</h4>\n            ";
            cert += html;
        });
        return "\n            <div>\n                " + (edu || '') + "\n                " + (cert || '') + "\n            </div>         \n        ";
    }
    return "\n        <section>\n        <header>\n            <h2>Education</h2>\n        </header>\n        " + item() + "\n        </section>           \n    ";
}

function BuilderStyle() {
    return "\n    <style>\n        .builder-wrapper{\n            bottom:0;\n            right:0;\n            width: 50px;\n            height: 50px;\n            -webkit-transition:all .2s;\n                    transition:all .2s;\n        }\n\n        .builder-wrapper:hover{\n            background-color: rgba(0,0,0,0.6);\n            -webkit-box-shadow: 2px 2px 2px 2px #000;\n                    box-shadow: 2px 2px 2px 2px #000;\n            width: 220px;\n            height: 170px;\n        }\n\n        .builder-prompt{\n            display: none;\n            bottom:50%;\n            left:50%;\n            margin-bottom: -40px;\n            margin-left: -110px;\n            width: 220px;\n            height: 80px;\n            background-color: rgba(0,0,0,0.9);\n            -webkit-box-shadow: 2px 2px 2px 2px #000;\n                    box-shadow: 2px 2px 2px 2px #000;\n            border-radius : 3px;\n        }\n        \n        .builder-wrapper,\n        .builder-prompt{\n            position:fixed;\n            color: #fff;\n            text-align:center;\n        }\n\n        .builder-json{\n            font-weight: 550;\n            line-height: 55px;\n            -webkit-transition:all 0.2s ease;\n                    transition:all 0.2s ease;\n            width:90%;\n        }\n        .builder-json:hover{\n            background-color:rgba(0,0,0,0.7);\n            cursor: pointer;\n        }\n        \n        .builder-prompt p{\n            margin:0;\n            margin-top: 5px;\n        }\n\n        .builder-prompt p,\n        .builder-prompt input{\n            font-size: .9rem;\n        }\n        \n        .builder-prompt .success{\n            margin:auto;\n            margin-top: 5px;\n            width:fit-content;\n            cursor: pointer;\n        }\n\n        .builder-wrapper input,\n        .builder-prompt input{ \n            color:#fff;\n            border: 0;\n            outline:none;\n        }\n        \n        .builder-json,\n        .builder-wrapper input,\n        .builder-prompt input{\n            margin:auto;\n            margin-top:10px;\n            border-radius : 3px;\n            background-color: #333;\n            text-decoration: none;\n        }\n        \n    </style>\n    ";
}

function Builder(element, data) {
    // TODO : Custom EventListender
    setTimeout(function () {
        var get = element.querySelector('.builder-json.get'), copy = element.querySelector('.builder-wrapper input'), load = element.querySelector('.builder-json.load'), put = element.querySelector('.builder-prompt input'), success = element.querySelector('.builder-prompt .success');
        get.addEventListener('click', function () { return copy.value = JSON.stringify(data); });
        copy.addEventListener('click', function (e) { return e.target.setSelectionRange(0, e.target.value.length); });
        load.addEventListener('click', function () {
            success.parentElement.style.display = 'inline';
            put.focus();
        });
        success.addEventListener('click', function () { return bind(); });
        put.addEventListener('keyup', function (e) {
            if (e.keyCode === 13)
                bind();
        });
        function bind() {
            element.innerHTML = Template(element, Loader(put.value));
            success.parentElement.style.display = 'none';
            copy.value = '';
        }
    }, 100);
    return "\n        " + BuilderStyle() + "\n        <div class=\"builder-wrapper\">\n            <div class=\"builder-json get\">JSON Current Data</div>\n            <input>\n            <div class=\"builder-json load\">Load Data</div>            \n        </div>\n\n        <div class=\"builder-prompt\">\n            <p>Please enter your JSON Data</p>\n            <input placeholder=\"HTTP Link or JSON Object\">\n            <p class=\"success\">Confirm</p>\n        </div>\n    ";
}

function Template(element, data) {
    var isLive = function (bool) { return !bool.live ? Builder(element, data) : ''; };
    return "\n        " + Style() + "\n        <div class=\"wrapper\">\n          <!-- \uC0C1\uB2E8 \uD5E4\uB354 -->\n          " + Template$1(data.header || {}) + "\n          <!-- \uD504\uB85C\uC81D\uD2B8 \uC139\uC158 -->\n          " + ProjectSection(data.projects || []) + "\n          <!-- \uAE30\uC220 \uC139\uC158 -->\n          " + SkillSection(data.skills || []) + "\n          <!-- \uACBD\uD5D8 \uC139\uC158 -->\n          " + ExperienceSection(data.experience || []) + " \n          <!-- \uAD50\uC721 \uBC0F \uC778\uC99D \uC139\uC158 -->\n          " + EduAndCertSection(data.eduandcert || {}) + "\n          <!-- \uD558\uB2E8 \uD478\uD130 -->\n          " + Footer(data.footer || {}) + "\n          <!-- \uBE4C\uB354 -->\n          " + isLive(data.footer || {}) + "\n        </div>        \n        ";
}

var ResumeRenderer$1 = (function (_super) {
    __extends(ResumeRenderer, _super);
    function ResumeRenderer(parent) {
        _super.call(this, parent);
    }
    ResumeRenderer.prototype._render = function () {
        if (!this.parent)
            throw 'invalid parent element';
        this.shadowDOM.innerHTML = Template(this.shadowDOM, this.data);
    };
    return ResumeRenderer;
}(Renderer));

return ResumeRenderer$1;

})));
