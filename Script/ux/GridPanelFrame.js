Ext.ux.GridPanelFrame = Ext.extend(Ext.grid.GridPanel, {
    height: 440,
    autoWidth: true,
    frame: true,
    recordstart: 0,
    initComponent: function () {
        this.tbar = [{
            text: '添加',
            iconCls: 'add',
            handler: this.add,
            scope: this
        }, '-', {
            text: '修改',
            iconCls: 'option',
            disabled: true,
            handler: this.save,
            scope: this
        }, '-', {
            text: '详细',
            iconCls: 'icon-grid',
            disabled: true,
            handler: this.detail,
            scope: this
        }, '-', {
            text: '删除',
            disabled: true,
            iconCls: 'remove',
            handler: function () {
                //显示
                var confirm = this.topToolbar.items.items[7];
                confirm.show();
                //3秒钟后消失
                var task = new Ext.util.DelayedTask(function () { confirm.hide(); });
                task.delay(3000);
            },
            scope: this
        }, {
            text: '确认删除吗？',
            iconCls: 'confirm',
            hidden: true,
            handler: this.remove,
            scope: this
        }, {
            text: '删除成功！',
            iconCls: 'remove-sueecss',
            disabled: true,
            hidden: true,
            listeners: {
                'show': function () {
                    var success = this;
                    //3秒钟后消失
                    var task = new Ext.util.DelayedTask(function () {
                        success.hide();
                    });
                    task.delay(3000);
                }
            }
        }]
        this.bbar = new Ext.PagingToolbar({
            store: this.pagestore,
            pageSize: this.pagestore.baseParams.limit,
            doLoad: function (startIndex) {
                this.ownerCt.recordstart = startIndex;
                this.store.load({
                    params: {
                        start: startIndex,
                        limit: this.pageSize
                    }
                });
            }
        })
        Ext.ux.GridPanelFrame.superclass.initComponent.call(this, arguments);
    }
});