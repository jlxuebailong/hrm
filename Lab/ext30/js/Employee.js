Morik.Office.EmployeePanel = function (cfg) {

 var panelLeft = new Ext.tree.TreePanel({
    title: '人力资源',
    border: false,
    rootVisible: false,
    columnWidth: .23,
    height: 700,
    style: 'border: #f0f0f0 1px solid;',
    root: new Ext.tree.AsyncTreeNode({
      text: '人力资源',
      expanded: true,
      children: [
        {id: 'departmentA', text: 'A部门', leaf: true},
        {id: 'departmentB', text: 'B部门',
          children: [
            {id: 'employee1', text: '雇员1', leaf: true},
            {id: 'employee2', text: '雇员2', leaf: true}]},
        {id: 'departmentC', text: 'C部门',
          children: [
            {id: 'employee3', text: '雇员3', leaf: true},
            {id: 'employee4', text: '雇员4', leaf: true}]}    
      ]
    })
  });

 panelLeft.addEvents('nodeClick');
 panelLeft.on({
        'click': function (node, event) {
          if(node && node.isLeaf()){
            event.stopEvent();
            this.fireEvent('nodeClick', node.attributes);
          }
        }
      });

var panelRight = new Ext.Panel({
  title: '雇员信息',
  columnWidth: .77,
  height: 700,
  style: 'border: #f0f0f0 1px solid;'
});

panelLeft.on({
  'nodeClick': function(node){
      console.log('nodeClick',node)  
      panelRight.removeAll();
      panelRight.insert(0, new Ext.Panel({html:node.text}));  
      panelRight.doLayout();
  }
});

var dfg = Ext.apply({
    defaults: {border: true},
    layout: 'column',
    items: [panelLeft, panelRight]
}, cfg || {} );

Morik.Office.EmployeePanel.superclass.constructor.call(this, dfg);

};

Ext.extend(Morik.Office.EmployeePanel, Ext.Panel, {
   
});
