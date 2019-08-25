//用户添加与修改页面
extjs.sources.save = function (sources) {
    //------------第一列内容开始-------------//
    var flag = (sources.IntSourcesID !== 0) ? true : false; //如果 sources 对象存在，说明是修改则取出数据
    //姓名
    var name = {
        width: 130,
        allowBlank: false,
        xtype: 'textfield',
        maxLength: 10,
        name: 'name',
        fieldLabel: '名称',
        blankText: '请输入名称',
        maxLengthText: '姓名不能超过10个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(sources.StrName);
            }
        }
    };
    //表单
    var form = {
        frame: true,
        url: '/App_Ashx/Sources/Save.ashx?ID=' + sources.IntSourcesID,
        xtype: 'form',
        iconCls: 'nodeicon',
        title: '招聘来源',
        style: 'margin:0px auto',
        width: 300,
        height: 100,
        labelWidth: 70,
        buttonAlign: 'center',
        items: name,
        buttons: [{
            text: '保存',
            handler: sumbit
        }, {
            text: '重置',
            handler: reset
        }]
    };
    //------------事件处理方法开始-------------//
    //提交
    function sumbit() {
        if (this.ownerCt.ownerCt.getForm().isValid()) {
            this.ownerCt.ownerCt.getForm().submit();
            Ext.Msg.alert("提示", "提交成功！");
        }
    }
    //重置
    function reset() {
        this.ownerCt.ownerCt.getForm().reset();
    }
    //------------事件处理方法结束-------------//
    //返回表单
    return form;
}