//用户添加与修改页面
extjs.user.save = function (user) {
    //------------第一列内容开始-------------//
    var flag = (user.IntUserID !== 0) ? true : false; //如果 user 对象存在，说明是修改则取出数据
    //姓名
    var username = {
        width: 130,
        allowBlank: false,
        xtype: 'textfield',
        name: 'username',
        maxLength: 4,
        fieldLabel: '姓名',
        blankText: '请输入姓名',
        maxLengthText: '姓名不能超过4个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrUserName);
            }
        }
    };
    //创建政治面貌数据源
    var combostore = {
        xtype: 'store',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({ url: '/App_Ashx/Political/List.ashx' }),
        reader: new Ext.data.JsonReader({ root: 'data' },
                 [{ name: 'id', mapping: 'TintPoliticalID' }, { name: 'name', mapping: 'StrName'}])
    };
    //政治面貌下拉列表
    var cobpolitical = {
        hiddenName: 'political',
        width: 130,
        allowBlank: false,
        fieldLabel: '政治面貌',
        store: combostore,
        displayField: 'name',
        valueField: 'id',
        triggerAction: 'all',
        emptyText: '请选择...',
        blankText: '请选择政治面貌',
        editable: false,
        xtype: 'combo',
        mode: 'remote',
        selectOnFocus: true,
        listeners: {
            'render': function () {
                if (flag) {
                    var combobox = this;
                    this.store.addListener('load', function () {
                        combobox.setValue(user.TintPolitical);
                    });
                }
            }
        }
    };
    //毕业院校
    var graduateschool = {
        name: 'graduateschool',
        width: 130,
        allowBlank: false,
        xtype: 'textfield',
        maxLength: 10,
        name: 'graduateschool',
        fieldLabel: '毕业院校',
        blankText: '请输入毕业院校',
        maxLengthText: '毕业院校不能超过10个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrGraduated);
            }
        }
    };
    //通信地址
    var address = {
        name: 'address',
        width: 130,
        allowBlank: false,
        xtype: 'textfield',
        maxLength: 30,
        name: 'address',
        fieldLabel: '通信地址',
        blankText: '请输入通信地址',
        maxLengthText: '通信地址不能超过30个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrAddress);
            }
        }
    };
    //第一列包含4行
    var column1 = {
        columnWidth: .28,
        layout: 'form',
        items: [
                    username, cobpolitical, graduateschool, address
                ]
    };
    //------------第一列内容结束-------------//
    //------------第二列内容开始-------------//
    //性别
    var rdosex = {
        fieldLabel: '性别',
        name: 'sex',
        xtype: 'radiogroup',
        width: 130,
        style: 'padding-top:3px;height:17px;',
        items: [{ name: 'sex', inputValue: '0', boxLabel: '男', checked: true }, { name: 'sex', inputValue: '1', boxLabel: '女'}],
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.TintSex);
            }
        }
    };
    //身高
    var numheight = {
        name: 'height',
        fieldLabel: '身高',
        width: 127,
        decimalPrecision: 0,
        minValue: 1,
        maxValue: 400,
        unitText: ' cm',
        allowBlank: false,
        blankText: '请输入身高',
        xtype: 'numberfield',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.SintHeight);
            }
        }
    };
    //毕业专业
    var professional = {
        width: 130,
        xtype: 'textfield',
        allowBlank: false,
        maxLength: 30,
        name: 'professional',
        fieldLabel: '毕业专业',
        blankText: '请输入毕业专业',
        maxLengthText: '毕业专业不能超过30个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrProfessional);
            }
        }
    };
    //联系电话
    var phone = {
        width: 130,
        xtype: 'textfield',
        allowBlank: false,
        maxLength: 20,
        name: 'phone',
        fieldLabel: '联系电话',
        blankText: '请输入联系电话',
        maxLengthText: '联系电话不能超过20个字符',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrPhone);
            }
        }
    };
    //第二列包含4行
    var column2 = {
        columnWidth: .28,
        layout: 'form',
        items: [rdosex, numheight, professional, phone]
    };
    //------------第二列内容结束-------------//
    //------------第三列内容开始-------------//
    //年龄
    var numage = {
        fieldLabel: '年龄',
        width: 117,
        xtype: 'numberfield',
        decimalPrecision: 0,
        minValue: 1,
        maxValue: 60,
        name: 'age',
        unitText: ' 岁',
        allowBlank: false,
        blankText: '请输入年龄',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.TintAge);
            }
        }
    };
    //体重
    var numweight = {
        fieldLabel: '体重',
        xtype: 'numberfield',
        width: 117,
        decimalPrecision: 0,
        minValue: 1,
        maxValue: 300,
        name: 'weight',
        unitText: ' kg',
        allowBlank: false,
        blankText: '请输入体重',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.SintWeight);
            }
        }
    };
    //毕业日期
    var dategraduation = {
        fieldLabel: '毕业日期',
        xtype: 'datefield',
        name: 'graduationdate',
        width: 117,
        format: 'Y-m-d',
        editable: false,
        allowBlank: false,
        blankText: '请选择毕业日期',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(new Date(Date.parse(user.DtmGraduated)).format("Y-m-d"));
            }
        }
    };
    //密码
    var password = {
        fieldLabel: '密码',
        inputType: 'password',
        xtype: 'textfield',
        name: 'password',
        width: 117,
        allowBlank: false,
        blankText: '请输入密码',
        maxLength: 20,
        maxLengthText: '密码不能超过20个字符!',
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrPassword);
            }
        }
    };
    //第三列包含3行
    var column3 = {
        columnWidth: .25,
        layout: 'form',
        items: [numage, numweight, dategraduation, password]
    };
    //------------第三列内容结束-------------//
    //------------第四列内容开始-------------//
    //创建相片div组件
    var imagebox = {
        xtype: 'box',
        autoEl: {
            width: 65,
            height: 70,
            style: 'clear:both;margin-left:37px;border:1px solid #ccc; margin-bottom:8px',
            tag: 'img',
            id: 'user.save.photoshow.' + user.IntUserID,
            src: (user.StrImagePath === '' || user.StrImagePath === undefined) ? nophone : user.StrImagePath
        }
    };
    //相片隐藏字段
    var hiddenfield = {
        xtype: 'hidden',
        name: 'photo',
        id: 'user.save.hiddenphotoupload.' + user.IntUserID,
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.StrImagePath);
            }
        }
    };
    //上传按钮
    var uploadbutton = {
        xtype: 'button',
        text: '上传相片',
        style: 'margin:0px auto;',
        handler: function () {
            new extjs.user.upload(user.IntUserID);
        }
    };
    //每4列定义
    var column4 = {
        columnWidth: .16,
        layout: 'form',
        items: [imagebox, uploadbutton, hiddenfield]
    };
    //------------第四列内容结束-------------//
    var checksource = {
        xtype: 'remotecheckboxgroup',
        name: 'checksource',
        boxLabel: 'StrName',
        inputValue: 'IntSourcesID',
        url: '/App_Ashx/Sources/List.ashx',
        fieldLabel: '招聘来源',
        style: 'padding-top:3px;height:17px;',
        listeners: {
            'render': function () {
                if (flag) {
                    var checked = this;
                    //获取数据
                    Ext.Ajax.request({
                        url: '/App_Ashx/Sources/Selection.ashx',
                        method: 'post',
                        params: { userid: user.IntUserID },
                        success: function (response, options) {
                            checked.setValue(response.responseText);
                        }
                    });
                }
            }
        }
    };
    //创建文本上传域
    var exteditor = {
        xtype: 'htmleditor',
        name: 'other',
        fieldLabel: '其他信息',
        width: 745,
        height: 320,
        listeners: {
            'render': function () {
                if (flag)
                    this.setValue(user.TxtOther);
            }
        }
    };
    //表单
    var form = {
        frame: true,
        url: '/App_Ashx/User/Save.ashx?ID=' + user.IntUserID,
        xtype: 'form',
        iconCls: 'nodeicon',
        title: '员工信息表',
        style: 'margin:0px auto',
        width: 900,
        height: 520,
        labelWidth: 70,
        buttonAlign: 'center',
        items: [{
            layout: 'column',
            items: [
                        column1,
                        column2,
                        column3,
                        column4
                    ]
        },
        checksource, exteditor],
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