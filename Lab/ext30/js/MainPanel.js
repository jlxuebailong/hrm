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




