一个electron微信第三方登录的方法
============================

通过electron自带的webwiew 和类似第三方网站第二种获取微信code的方法

- 通过webview替换原来的iframe
- 监听webview的did-stop-loading事件和webview的url判断用户登录，并获取code
- 获取code之后......

只是个临时的解决方案 写的很难看 假如有时间再封装一下吧
WxLogin的style和href参数可能无效

