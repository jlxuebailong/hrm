//用户添加与修改页面
extjs.user.upload = function (userid) {
    //图片预览
    var box = new Ext.BoxComponent({
        autoEl: {
            width: 65,
            height: 70,
            style: 'clear:both;margin-left:90px;margin-bottom:8px;border:1px solid #ccc;',
            tag: 'img',
            id: 'user.save.photopreview.' + userid,
            src: nophone
        }
    });
    //创建文本上传域
    var file = new Ext.form.TextField({
        inputType: "file",
        fieldLabel: '相片',
        width: 190,
        allowBlank: false,
        blankText: '请浏览相片！',
        name: 'imgFile',
        xtype: 'textfield'
    });
    //相片地址隐藏字段
    var uploadpath = {
        xtype: 'hidden',
        name: 'path',
        id: 'user.save.hiddenphotopreview.' + userid
    };
    //上传图片表单
    var panel = new Ext.form.FormPanel({
        url: '/App_Ashx/User/Phone.ashx',
        frame: true,
        fileUpload: true,
        labelWidth: 40,
        buttonAlign: 'center',
        style: 'padding:0px',
        items: [box, file, uploadpath],
        buttons: [{
            text: '预览',
            handler: preview
        }, {
            text: '确定',
            handler: upload
        }]
    });
    //预览
    function preview() {
        var url = 'file:///' + file.getValue();
        if (panel.getForm().isValid() && img_reg.test(url)) {
            panel.getForm().submit({
                waitTitle: "请稍候",
                waitMsg: '正在上传...',
                success: function (form, action) {
                    //预览图片
                    document.getElementById('user.save.photopreview.' + userid).src = action.result.path;
                    //本地隐藏域赋值
                    Ext.getCmp('user.save.hiddenphotopreview.' + userid).setValue(action.result.path);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert("提示", "上传失败：" + action.result.info);
                }
            });
        }
    }
    //把图片显示在父窗体，点击确定时
    function upload() {
        //预览时隐藏域中的预览图片地址不为空时
        if (Ext.getCmp('user.save.hiddenphotopreview.' + userid).getValue() != '') {
            //获取隐藏域中预览图片的地址
            var perviewimage = Ext.getCmp('user.save.hiddenphotopreview.' + userid).getValue();
            //把用户保存页的图片地址赋值
            document.getElementById('user.save.photoshow.' + userid).src = perviewimage;
            //把用户管理员要发往服务器的表单赋值
            Ext.getCmp('user.save.hiddenphotoupload.' + userid).setValue(perviewimage);
            //把隐藏域中的预览图片地址设置为空时，以免在关闭窗口的时候把他在服务器端删除
            Ext.getCmp('user.save.hiddenphotopreview.' + userid).setValue('');
            win.close();
        }
    }
    //窗体
    win = new Ext.Window({
        title: '上传相片',
        iconCls: 'addimageicon',
        width: 280,
        modal: true,
        items: [panel],
        listeners: {//如果没有点击确定时，关闭前删除服务端已上传的预览图片
            'beforeclose': function () {
                if (Ext.getCmp('user.save.hiddenphotopreview.' + userid).getValue() != '') {
                    Ext.Ajax.request({
                        url: '/App_Ashx/User/RemovePhoto.ashx',
                        method: 'post',
                        params: { path: Ext.getCmp('user.save.hiddenphotopreview.' + userid).getValue() }
                    });
                }
            }
        }
    });
    win.show();
}