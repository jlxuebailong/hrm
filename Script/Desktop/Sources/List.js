//招聘来源添加与修改页面
extjs.sources.list = function (desktop) {
    //定义查询表单
    var search = {
        xtype: 'searchpanelframe',
        items: [{
            columnWidth: .8,
            layout: 'form',
            items: [{
                width: 90,
                xtype: 'textfield',
                fieldLabel: '名称'
            }]
        }, {
            columnWidth: .2,
            layout: 'column',
            items: [{
                xtype: 'button',
                style: 'margin-right:10px',
                width: 60,
                handler: search,
                text: '确定'
            },
            {
                xtype: 'button',
                width: 60,
                text: '取消',
                handler: reset
            }]
        }]
    };
    //查询
    function search() {
        ds.baseParams.name = this.ownerCt.ownerCt.items.items[0].items.items[0].getValue();
        ds.reload();
    }
    //重置
    function reset() {
        this.ownerCt.ownerCt.getForm().reset();
    }

    //复选框列
    var sm = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            'selectionchange': selectchange
        }
    });
    //复选框选中变化事件
    function selectchange() {
        var count = this.getCount();
        //删除
        if (count == 0) {
            grid.topToolbar.items.items[6].disable();
        }
        else {
            grid.topToolbar.items.items[6].enable();
        }
        //修改、详细
        if (count == 1) {
            grid.topToolbar.items.items[2].enable();
            grid.topToolbar.items.items[4].enable();
        }
        else {
            grid.topToolbar.items.items[2].disable();
            grid.topToolbar.items.items[4].disable();
        }
    }
    //grid 表头
    var cm = new Ext.grid.ColumnModel([
                    new Ext.grid.RowNumberer({
                        renderer: function (value, cellmeta, record, rowIndex, columnIndex, ds) {
                            return grid.recordstart + 1 + rowIndex;
                        }
                    }),
                    sm,
                    { header: '名称', dataIndex: 'StrName' }
                ]);
    //grid 数据源
    var ds = new Ext.data.Store({
        baseParams: baseParams,
        proxy: new Ext.data.HttpProxy({ url: '/App_Ashx/Sources/List.ashx', method: 'post' }),
        reader: new Ext.data.JsonReader(
        { totalProperty: 'total', root: 'data' },
        [{ name: 'IntSourcesID' },
        { name: 'StrName'}])
    });
    ds.load();
    //创建 grid // 在 Ext.ux.GridPanelFrame 定义
    var grid = new Ext.ux.GridPanelFrame({
        add: add,
        save: save,
        detail: detail,
        remove: remove,
        sm: sm,
        cm: cm,
        store: ds,
        pagestore: ds
    });
    //创建窗体
    var panel = {
        xtype: 'panel',
        iconCls: 'user',
        frame: true,
        collapsible: true,
        maximizable: false,
        style: 'margin:0px auto',
        bodyStyle: 'padding:10px;',
        items: [search, grid]
    };
    //------------------------------------事件处理方法开始-------------------------------------//

    //添加
    function add() {
        var win = desktop.getWindow('extjs.sources.save.0');
        if (!win) {
            win = new extjs.sources.save(desktop, { "IntSourcesID": 0 });
        }
        win.show();
    }
    //保存
    function save() {
        var sources = ds.data.items[grid.getSelectionModel().lastActive].data;   //取出用户对象，传到修改页去显示
        var win = desktop.getWindow('extjs.sources.save.' + sources.IntSourcesID);
        if (!win) {
            win = new extjs.sources.save(desktop, sources);
        }
        win.show();
    }
    //查看
    function detail() {
        var id = grid.getSelectionModel().getSelected().get('IntSourcesID');
        var win = desktop.getWindow('extjs.sources.detail.' + id);
        if (!win) {
            win = new extjs.sources.detail(desktop, id);
        }
        win.show();
    }
    //移除
    function remove() {
        var row = grid.getSelectionModel().getSelections();
        var removeUserArray = new Array();
        for (var i = 0; i < row.length; i++) {
            removeUserArray.push(row[i].get('IntSourcesID'));
        }
        //确定删除按钮隐藏
        grid.topToolbar.items.items[7].hide();
        //向服务器发送请求
        Ext.Ajax.request({ url: '/App_Ashx/Sources/Remove.ashx', method: 'post', async: false,
            params: { idlist: removeUserArray.toString() },
            success: function (response, options) {
                var responseJson = Ext.util.JSON.decode(response.responseText);
                if (responseJson.success == true) {
                    ds.reload();
                    //显示删除成功按钮
                    grid.topToolbar.items.items[8].show();
                    Ext.Msg.alert("提示", "删除成功！");
                }
                else {
                    Ext.Msg.alert("提示", "删除失败，请与管理员联系！");
                }
            },
            failure: function () {
                Ext.Msg.alert("提示", "删除失败，请与管理员联系！");
            }
        });
    }
    //------------------------------------事件处理方法结束-------------------------------------//
    //创建窗体
    var win = desktop.createWindow({
        id: 'extjs.sources.list',
        collapsible: true,
        iconCls: 'user',
        title: '系统管理',
        width: 920,
        height: 590,
        closable: true,
        maximizable: false,
        bodyStyle: 'padding:10px',
        items: [panel]
    });
    return win;
}
