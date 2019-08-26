/**
 * Created by gavin on 2019/8/26.
 */
Ext.onReady(function () {
  Ext.BLANK_IMAGE_URL = 'Image/my/pic_126.jpg';
  Ext.QuickTips.init();
  Ext.lib.Ajax.defaultPostHeader += '; charset=utf-8';
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

  //1. 创建head部分
  var head = new Ext.Panel({
    region: 'north',
    border: false,
    height: 80,
    html: '<div style="background: url(pic/head.png) repeat-x; height: 78px;"></div>'
  });

  //2. 创建foot部分
  var foot = new Ext.Panel({
    region: 'south',
    border: true,
    height: 35,
    html: '<div style="background: url(pic/foot.png) repeat-x; height: 33px;">' +
    '<div style="float: left;font: normal 12px 宋体;margin: 10px 0 0 0px;">' +
    'Power By: <span style="color: blue;">茶茶</span>&nbsp;</div>' +
    '<div style="float: right;font: normal 12px 宋体;margin: 10px;">' +
    '版权所有: <a href="http://www.313fm.com">www.313fm.com</a></div>' +
    '</div>'
  });

  //3. 创建leftMenu部分
  /*var leftMenu = new Ext.Panel({
    region: 'west',
    border: true,
    width: 200,
    html: '<div>导航菜单</div>'
  });*/

  var t1 = new Ext.tree.TreePanel({
    border: false,
    rootVisible: false,
    root: new Ext.tree.AsyncTreeNode({
      text: '我的办公桌',
      expanded: true,
      children: [
        {id: 'department1', text: '部门管理1', leaf: true},
        {id: 'company1', text: '公司管理1', leaf: true},
        {id: 'permissions1', text: '权限管理1',
        children: [
          {id: 'permission1', text: '权限管理1', leaf: true},
          {id: 'permissionType1', text: '权限类别1', leaf: true}]}
      ]
    })
  });

  var t2 = new Ext.tree.TreePanel({
    border: false,
    rootVisible: false,
    root: new Ext.tree.AsyncTreeNode({
      text: '主数据管理',
      expanded: true,
      children: [
        {id: 'department', text: '部门管理', leaf: true},
        {id: 'company', text: '公司管理', leaf: true},
        {id: 'permissions', text: '权限管理',
          children: [
            {id: 'permission', text: '权限管理', leaf: true},
            {id: 'permissionType', text: '权限类别', leaf: true}]}
      ]
    })
  });
  var leftMenu = new Morik.Office.LeftMenu({
    title: '我的办公系统',
    items:[
      {title: '我的办公桌', items: [t1]},
      {title: '主数据管理', items: [t2]}
    ]
  });


  //4. 创建workspace部分
  var workspace = new Ext.Panel({
    region: 'center',
    border: true,
    html: '<div>工作区</div>'
  });

  //5. 建立menu和tab的联系

  //6. 创建布局
  var viewport = new Ext.Viewport({
    layout: 'border',
    style: 'border: #024459 2px solid;',
    items: [head, foot, leftMenu, workspace]
  });
  
});