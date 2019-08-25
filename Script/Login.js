/**
*
* 创建人：李林峰
* 时  间：2012-07-01
* 描  述：登陆窗体
*/

Ext.onReady(function () {
    //创建表单
    var form = new Ext.form.FormPanel({
        url: '/Server/User.php?method=login',
        defaults: { xtype: 'textfield', width: 145, maxLength: 20, allowBlank: false },
        labelAlign: 'right',
        labelWidth: 45,
        frame: true,
        cls: 'loginform',
        bodyStyle: 'padding:6px 0px 0px 15px',
        items: [{
            fieldLabel: '用户名',
            name: 'username',
            id: 'username',
            blankText: '请输入用户名！',
            maxLengthText: '用户名不能超过20个字符!'
        }, {
            fieldLabel: '密　码',
            name: 'password',
            inputType: 'password',
            blankText: '请输入密码！',
            maxLengthText: '密码不能超过20个字符!'
        }, {
            fieldLabel: '验证码',
            id: 'checkcode',
            name: 'checkcode',
            width: 76,
            xtype: 'textfield',
            blankText: '请输入验证码！',
            maxLength: 4,
            maxLengthText: '验证码不能超过4个字符!'
        }],
        buttons: [{
            text: '确 定',
            handler: login
        }, {
            text: '重 置',
            handler: reset
        }],
        buttonAlign: 'center'
    });
    //登陆事件
    function login() {
        if (form.getForm().isValid()) {
            
            form.getForm().submit({

                clientValidation: true,
                waitMsg: '正在提交数据...',
                waitTitle: '提示',
                success: function (form, action) {
                    console.log('action.result.flag = ', action.result.flag);
                    if (action.result.flag == true) {
                        console.log('action.result.flag == true ');
                        //设置Cookie
                        new Extjs.cookie.set(action.result.userid, Ext.getCmp("username").getValue());
                        //桌面应用系统
                        window.location.href = "/Desktop/Main.htm";
                        //传通框架应用系统
                        //window.location.href = "/Normal/Main.htm";
                    } else {
                        Ext.Msg.alert("提示", "登陆失败:<br>" + action.result.msg);
                    }
                },
                failure: function () {
                    console.log('failure', arguments);
                    Ext.Msg.alert("提示", "登陆失败，请与管理员联系！");
                }
            });
        }
    }
    //重置
    function reset() {
        form.getForm().reset();
    }
    //登陆窗体
    var win = new Ext.Window({
        iconCls: 'loginicon',
        title: '用户登陆',
        plain: true,
        width: 276,
        height: 174,
        resizable: false,
        shadow: true,
        modal: true,
        closable: false,
        animCollapse: true,
        items: [form]
    });
    win.show();
    //创建验证码
    Ext.get(Ext.getDom('checkcode').parentNode).createChild({
        tag: 'img',
        src: 'App_Ashx/Image.ashx',
        align: 'absbottom',
        style: 'padding-left:23px;cursor:pointer;',
        onclick: 'this.src =this.src+"?"+Math.random()'
    });
});
