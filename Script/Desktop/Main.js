MyDesktop = new Ext.app.App({
    init: function () {
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'side';
        new Extjs.cookie.check();
    },
    //向开始菜单左侧添加菜单
    getModules: function () {
        return [
                    new MyDesktop.UserWindow(),
                    new MyDesktop.SourcesWindow()
                ];
    },
    //向开始菜单右侧添加菜单
    getStartConfig: function () {
        return {
            title: '无废话ExtJs入门教程桌面版系统演示',
            iconCls: 'window',
            toolItems: [{
                text: '设置',
                iconCls: 'settings',
                scope: this,
                handler: function () {
                    alert('设置');
                }
            }, '-', {
                text: '退出',
                iconCls: 'logout_de',
                scope: this,
                handler: function () {
                    Ext.Msg.confirm('提示', '确定退出吗？', function (btn) {
                        if (btn == 'yes') {
                            new Extjs.cookie.clear();
                            window.location.href = "/Login.htm";
                        }
                    })
                }
            }]
        };
    }
});

MyDesktop.UserWindow = Ext.extend(
            Ext.app.Module, {
                id: 'user-win',
                init: function () {
                    this.launcher = {
                        text: '员工管理',
                        iconCls: 'user',
                        handler: function () { return false; },
                        menu: {
                            items: [{
                                text: '员工添加',
                                iconCls: 'user',
                                handler: this.createWindowSave,
                                scope: this
                            }, {
                                text: '员工管理',
                                iconCls: 'user',
                                handler: this.createWindow,
                                scope: this
                            }]
                        },
                        scope: this
                    }
                },
                createWindowSave: function () {
                    var desktop = this.app.getDesktop();
                    var win = desktop.getWindow('extjs.user.save.0');
                    if (!win) {
                        win = new extjs.user.save(desktop, { "IntUserID": 0 });
                    }
                    win.show();
                },
                createWindow: function () {
                    var desktop = this.app.getDesktop();
                    var win = desktop.getWindow('extjs.user.list');
                    if (!win) {
                        win = new extjs.user.list(desktop);
                    }
                    win.show();
                }
            });

MyDesktop.SourcesWindow = Ext.extend(
            Ext.app.Module, {
                id: 'system-win',
                init: function () {
                    this.launcher = {
                        text: '系统管理',
                        iconCls: 'system-icon',
                        handler: function () { return false; },
                        menu: {
                            items: [{
                                text: '招聘来源',
                                iconCls: 'system-icon',
                                handler: this.createWindow,
                                scope: this
                            }]
                        },
                        scope: this
                    }
                }
                ,
                createWindow: function () {
                    var desktop = this.app.getDesktop();
                    var win = desktop.getWindow('extjs.sources.list');
                    if (!win) {
                        win = new extjs.sources.list(desktop);
                    }
                    win.show();
                }
            });