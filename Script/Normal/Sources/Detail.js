//用户添加与修改页面
extjs.sources.detail = function (id) {
    //创建panel
    var panel = new Ext.Panel({
        frame: true,
        iconCls: 'nodeicon',
        title: '招聘来源',
        style: 'margin:0px auto',
        width: 300,
        height: 100
    });
    //创建数据显示模板
    var template = new Ext.XTemplate(
                        '<table id="template">',
                           '<tr><td class="label">名称:</td><td><tpl for="sources">{values.StrName}</tpl></td></tr>',
                        '</table>'
                    );
    //获取数据
    Ext.Ajax.request({
        url: '/App_Ashx/Sources/Detail.ashx',
        method: 'post',
        params: { id: id },
        success: function (response, options) {
            var responseJson = Ext.util.JSON.decode(response.responseText);
            template.compile();
            template.overwrite(panel.body, responseJson);
        },
        failure: function () {
            Ext.Msg.alert("提示", "系统出错，请联系管理人员！");
        }
    });
    //返回表单
    return panel;
}