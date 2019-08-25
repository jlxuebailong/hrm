//用户添加与修改页面
extjs.user.detail = function (id) {
    //创建panel
    var panel = new Ext.Panel({
        frame: true,
        iconCls: 'nodeicon',
        title: '员工信息表',
        style: 'margin:0px auto',
        width: 900,
        height: 520
    });
    //创建数据显示模板
    var template = new Ext.XTemplate(
                        '<table id="template">',
                           '<tr><td class="label">姓名:</td><td><tpl for="user">{values.StrUserName}</tpl></td><td class="label">性别:</td><td><tpl for="user">{[this.getSex(values.TintSex)]}</tpl></td><td class="label">年龄:</td><td><tpl for="user">{TintAge}</tpl></td><td class="label" rowspan="4" valign="top">相片:</td><td rowspan="4" valign="top"><div style="width:65px;height:70px;border:1px solid #ccc"><tpl for="user">{[this.getPhoto(values.StrImagePath)]}</tpl></div></td></tr>',
                           '<tr><td>政治面貌:</td><td><tpl for="political">{StrName}</tpl></td><td>身高:</td><td><tpl for="user">{SintHeight}</tpl></td><td>体重:</td><td><tpl for="user">{SintWeight}</tpl></td></tr>',
                           '<tr><td>毕业院校:</td><td><tpl for="user">{StrGraduated}</tpl></td><td>毕业专业:</td><td><tpl for="user">{StrProfessional}</tpl></td><td>毕业日期:</td><td><tpl for="user">{[values.DtmGraduated.format("Y-m-d")]}</tpl></td></tr>',
                           '<tr><td>通信地址:</td><td><tpl for="user">{StrAddress}</tpl></td><td>联系电话:</td><td><tpl for="user">{StrPhone}</tpl></td><td>密码:</td><td><tpl for="user">{StrPassword}</tpl></td></tr>',
                           '<tr><td>招聘来源:</td><td colspan="7"><tpl for="sources">{[values.StrName + " "]}</tpl></td></tr>',
                           '<tr><td valign="top">其他信息:</td><td colspan="7"><tpl for="user">{TxtOther}</tpl></td></tr>',
                        '</table>',
                        {
                            getSex: function (sex) {
                                if (sex == 0) {
                                    return '男';
                                }
                                else {
                                    return '女'
                                }
                            }
                        }, {
                            getPhoto: function (path) {
                                if (path == "") {
                                    return "<img src=\'/image/nophone.gif\'>";
                                }
                                else {
                                    return "<img src=\'" + path + "\' style=\"width:65px;height:70px\">"
                                }
                            }
                        }
                    );
    //获取数据
    Ext.Ajax.request({
        url: '/App_Ashx/User/Detail.ashx',
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