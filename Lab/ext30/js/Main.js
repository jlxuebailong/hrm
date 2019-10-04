/**
 * Created by gavin on 2019/8/26.
 */
Ext.onReady(function () {
  //Ext.BLANK_IMAGE_URL = 'pic/blank.png';
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
  var t1 = new Ext.tree.TreePanel({
    border: false,
    rootVisible: false,
    root: new Ext.tree.AsyncTreeNode({
      text: '人力资源管理',
      expanded: true,
      children: [
        {id: 'company', text: '公司管理', leaf: true},
        {id: 'department', text: '部门管理', leaf: true},
        {id: 'employee', text: '员工管理', leaf: true},
        {id: 'permissions', text: '权限管理',
          children: [
            {id: 'permission', text: '权限管理', leaf: true},
            {id: 'permissionType', text: '权限类别', leaf: true}]}
      ]
    })
  });

  var t2 = new Ext.tree.TreePanel({
    border: false,
    rootVisible: false,
    root: new Ext.tree.AsyncTreeNode({
      text: '办公资源管理',
      expanded: true,
      children: [
        {id: 'officeRoom', text: '办公室管理', leaf: true},
        {id: 'meetingRoom', text: '会议室管理', leaf: true},
        {id: 'officeSupplies', text: '办公用品管理',
          children: [
            {id: 'Consumables', text: '易耗品管理', leaf: true},
            {id: 'computer', text: '计算机管理', leaf: true}]}
      ]
    })
  });

  var leftMenu = new Morik.Office.LeftMenu({
    title: '我的办公系统',
    trees: [t1, t2]
  });

  var indexPanel = new Ext.ux.Portal({
    id: 'index',
    title: '首页',
    items: [{
      columnWidth: 0.33,
      style: 'padding: 10px 0 10px 10px',
      items: [{
        title: 'portal1',
        height: 200,
        html: 'portal1'
      }]
    },
    {
      columnWidth: 0.33,
      style: 'padding: 10px 0 10px 10px',
      items: [{
        title: 'portal2',
        height: 200,
        html: 'portal2'
      }]
    },
    {
      columnWidth: 0.33,
      style: 'padding: 10px 0 10px 10px',
      items: [{
        title: 'portal3',
        height: 200,
        html: 'portal3'
      }]
    }]
  });

  //4. 创建workspace部分
  /*var mainTab = new Morik.Office.MainPanel({
    region: 'center',
    border: false,
    indexTab: indexPanel
  });*/

   var mainTab = new Morik.Office.MainPanel({
    region: 'center',
    border: false,
    indexTab: indexPanel
  });


  
  
  //5. 建立menu和tab的联系
  leftMenu.on('nodeClick', function (node) {
    //console.log('nodeClick event: ', node);
    mainTab.loadTab(node);
    }
  );

  //6. 创建布局
  var viewport = new Ext.Viewport({
    layout: 'border',
    style: 'border: #024459 2px solid;',
    items: [head, foot, leftMenu, mainTab]
  });
  
});