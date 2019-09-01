/**
 * Created by gavin on 2019/8/26.
 */
Morik.Office.MainPanel = Ext.extend(Ext.TabPanel,{
  initComponent: function () {
    Morik.Office.MainPanel.superclass.initComponent.call(this);
    var indexTab = this.add(this.indexTab);
    if(indexTab) {
      this.setActiveTab(indexTab);
      indexTab.show().doLayout();
    }
  },
  addPanel: function (name, panel) {
    if(!this._cache) this._cache = {};
    this._cache[name] = panel;
  },
  findPanel: function (name) {
    if(!this._cache) this._cache = {};
    var ret = this._cache[name];
    if(!ret){
      var pn = (this.ns ? this.ns : 'Morik.Office') + '.' + Ext.util.Format.capitalize(name) + 'Panel';
      ret = eval(pn);
    }
    return ret;
  },
  loadTab: function (node) {
    var n = this.getComponent(node.id);
    var c = {'id': node.id, 'title': node.text, closable: true};
    if(n) this.setActiveTab(n);
    else {
      var pn = this.findPanel(node.id);
      n = this.add(pn ? new pn(c) : Ext.apply(c, {'html': '该页面尚未实现!'}));
      n.show().doLayout();
    }
  }
});

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


