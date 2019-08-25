//用户添加与修改页面
extjs.user.list = function () {
    //定义查询表单
    var search = {
        xtype: 'searchpanelframe',
        items: [{
            columnWidth: .2,
            layout: 'form',
            items: [{
                width: 90,
                xtype: 'textfield',
                fieldLabel: '用户名'
            }]
        }, {
            columnWidth: .2,
            layout: 'form',
            items: [{
                width: 90,
                xtype: 'textfield',
                fieldLabel: '电话号码'
            }]
        }, {
            columnWidth: .2,
            layout: 'form',
            items: [{
                width: 90,
                xtype: 'textfield',
                fieldLabel: '地址'

            }]
        }, {
            columnWidth: .2,
            layout: 'form',
            items: [{
                width: 90,
                xtype: 'textfield',
                fieldLabel: '毕业院校'
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
        ds.baseParams.username = this.ownerCt.ownerCt.items.items[0].items.items[0].getValue();
        ds.baseParams.phone = this.ownerCt.ownerCt.items.items[1].items.items[0].getValue();
        ds.baseParams.address = this.ownerCt.ownerCt.items.items[2].items.items[0].getValue();
        ds.baseParams.graduated = this.ownerCt.ownerCt.items.items[3].items.items[0].getValue();
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
    //grid 表头
    var cm = new Ext.grid.ColumnModel([
                    new Ext.grid.RowNumberer({
                        renderer: function (value, cellmeta, record, rowIndex, columnIndex, ds) {
                            return grid.recordstart + 1 + rowIndex;
                        }
                    }),
                    sm,
                    { header: '姓名', dataIndex: 'StrUserName' },
                    { header: '性别', dataIndex: 'TintSex', renderer: function (value) { if (value == '0') { return '男'; } else { return '女'; } } },
                    { header: '电话', dataIndex: 'StrPhone' },
                    { header: '地址', dataIndex: 'StrAddress' },
                    { header: '年龄', dataIndex: 'TintAge' },
                    { header: '毕业院校', dataIndex: 'StrGraduated' },
                    { header: '毕业专业', dataIndex: 'StrProfessional' }
                ]);
    //grid 数据源
    var ds = new Ext.data.Store({
        baseParams: baseParams,
        proxy: new Ext.data.HttpProxy({ url: '/App_Ashx/User/List.ashx', method: 'post' }),
        reader: new Ext.data.JsonReader(
        { totalProperty: 'total', root: 'data' },
        [{ name: 'IntUserID' },
        { name: 'StrUserName' },
        { name: 'StrPassword' },
        { name: 'TintSex' },
        { name: 'TintAge' },
        { name: 'TintPolitical' },
        { name: 'SintHeight' },
        { name: 'SintWeight' },
        { name: 'StrGraduated' },
        { name: 'StrProfessional' },
        { name: 'DtmGraduated' },
        { name: 'StrAddress' },
        { name: 'StrPhone' },
        { name: 'StrImagePath' },
        { name: 'TxtOther' },
        { name: 'DtmSubmit'}])
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
        collapsible: true,
        maximizable: false,
        width: 900,
        style: 'margin:0px auto',
        bodyStyle: 'padding:10px;',
        items: [search, grid]
    };
    //------------------------------------事件处理方法开始-------------------------------------//
    //多选框变化
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
    //添加
    function add() {
        var node = new Ext.tree.TreeNode({
            id: 'tab.user.save',
            leaf: true,
            text: '员工添加<span style=display:none>new extjs.user.save({"IntUserID":0})</span>'
        });
        nodeClick(node);
    }
    //保存
    function save() {
        var user = ds.data.items[grid.getSelectionModel().lastActive].data;   //取出用户对象，传到修改页去显示
        var node = new Ext.tree.TreeNode({
            id: 'tab.user.save' + user.IntUserID,
            leaf: true,
            text: '员工修改<span style=display:none>new extjs.user.save(' + Ext.util.JSON.encode(user) + ')</span>'
        });
        nodeClick(node);
    }
    //查看
    function detail() {
        var id = grid.getSelectionModel().getSelected().get('IntUserID');
        var node = new Ext.tree.TreeNode({
            id: 'tab.user.detail' + id,
            leaf: true,
            text: '员工详细<span style=display:none>new extjs.user.detail(' + id + ')</span>'
        });
        nodeClick(node);
    }
    //移除
    function remove() {
        var row = grid.getSelectionModel().getSelections();
        var removeUserArray = new Array();
        for (var i = 0; i < row.length; i++) {
            removeUserArray.push(row[i].get('IntUserID'));
        }
        //确定删除按钮隐藏
        grid.topToolbar.items.items[7].hide();
        //向服务器发送请求
        Ext.Ajax.request({ url: '/App_Ashx/User/Remove.ashx', method: 'post', async: false,
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
    return panel;
}
