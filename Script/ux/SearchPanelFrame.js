Ext.ux.SearchPanelFrame = Ext.extend(Ext.form.FormPanel, {
    style: 'margin-bottom:8px;',
    bodyStyle: 'padding-left:8px;padding-top:4px',
    labelWidth: 60,
    frame: true,
    method: 'post',
    layout: 'column',
    title: '查询',
    iconCls: 'search'
});
Ext.reg('searchpanelframe', Ext.ux.SearchPanelFrame);