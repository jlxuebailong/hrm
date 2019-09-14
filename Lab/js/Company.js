Morik.Office.CompanyPanel = function (cfg) {
  Morik.Office.CompanyPanel.superclass.constructor.call(this, cfg);

  var proxy = new Ext.data.HttpProxy({
    url: '/Server/Lab/Company.php?method=query'
  });
  var recordType = new Ext.data.Record.create([
    {name: 'id', mapping: 'id', type: 'int'},
    {name: 'comNum', mapping: 'comNum', type: 'string'},
    {name: 'comName', mapping: 'comName', type: 'string'},
    {name: 'comAddress', mapping: 'comAddress', type: 'string'}
  ]);
  var reader = new Ext.data.JsonReader({
      totalProperty: 'results',
      root: 'rows',
      id: 'id'}
    ,recordType);
  var ds = new Ext.data.Store({
    proxy: proxy,
    reader: reader
    //autoLoad: true
  });
  var cm = new Ext.grid.ColumnModel({
    defaultSortable: true, defaultWidth: 180,
    columns: [
      {header: '编号', dataIndex: 'comNum'},
      {header: '名称', dataIndex: 'comName'},
      {header: '地址', width: 300, dataIndex: 'comAddress'}
    ]
  });
  var grid = new Ext.grid.GridPanel({
    cm: cm,
    store: ds,
    height: 700,
    title: '公司列表',
    loadMask: {msg: 'Loading Data, Waiting...'}
  });

  this.add(grid);
  grid.getStore().load();

};

Ext.extend(Morik.Office.CompanyPanel, Ext.Panel, {

});