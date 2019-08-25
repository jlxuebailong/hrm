Ext.namespace('Extjs.cookie');
Extjs.cookie.set = function (userid, username) {
    var cp = new Ext.state.CookieProvider({
        //path: "/cgi-bin/",
        expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)) //30 days
        //domain: "extjs.com"
    });
    Ext.state.Manager.setProvider(cp);
    cp.set("userid", userid);
    cp.set("username", username);
}
Extjs.cookie.clear = function () {
    var cp = new Ext.state.CookieProvider();
    Ext.state.Manager.setProvider(cp);
    cp.clear("userid");
    cp.clear("username");
}
Extjs.cookie.check = function () {
    var cp = new Ext.state.CookieProvider();
    Ext.state.Manager.setProvider(cp);
    var cpUsername = cp.get("username");
    if (cpUsername == undefined) {
        Ext.Msg.alert('提示', '连接超时，请重新登陆！', function () { window.location.href = "/Login.htm"; });

    }
}
