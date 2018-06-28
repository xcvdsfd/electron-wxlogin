 // 需要添加元素 <webview id="foo"></webview>

 const appid = '' // appid
 const client_url = ''
 const redirect_uri = '' // 重定向地址 

 const webview = document.getElementById('foo') 

 let obj = null

 function addQd() {
   obj = new WxLogin({
     self_redirect: false,
     appid: appid,
     scope: "snsapi_login",
     redirect_uri: redirect_uri,
     state: Math.ceil(Math.random() * 1000),
     style: "",
     href: ""
   })
 }

 webview.addEventListener("did-stop-loading", () => {
   let code = parseURL(webview.src).params.code
   if (code) {
     obj = null
     let geturl = `${client_url}?appID=${appid}&code=${code}`
       //提交code
     await fetch(geturl, {
         method: 'GET'
       }).then(res => {
         if (res.ok) {
           return res.json();
         }
         throw new Error('network');
       }).then((res) => {
         // 获得token
       })
       .catch((e) => {})
   }
 })


 addQd()

 // 获取二维码
 ! function(a, b, c) {
   function d(a) {
     var c = "default";
     a.self_redirect === !0 ? c = "true" : a.self_redirect === !1 && (c = "false");
     var d = b.getElementById('foo'),
       e = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid + "&scope=" + a.scope + "&redirect_uri=" + a.redirect_uri + "&state=" + a.state + "&login_type=jssdk&self_redirect=" + c;
     d.src = e;
   }
   a.WxLogin = d
 }(window, document);

 // 解析url
 function parseURL(url) {
   let a = document.createElement('a');
   a.href = url;
   return {
     source: url,
     protocol: a.protocol.replace(':', ''),
     host: a.hostname,
     port: a.port,
     query: a.search,
     params: (function() {
       let ret = {},
         seg = a.search.replace(/^\?/, '').split('&'),
         len = seg.length,
         i = 0,
         s;
       for (; i < len; i++) {
         if (!seg[i]) {
           continue;
         }
         s = seg[i].split('=')
         ret[s[0]] = s[1]
       }
       return ret
     })(),
     file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
     hash: a.hash.replace('#', ''),
     path: a.pathname.replace(/^([^\/])/, '/$1'),
     relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
     segments: a.pathname.replace(/^\//, '').split('/')
   }
 }