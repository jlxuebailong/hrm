/**
 * Created by gavin on 2019/8/26.
 */
var Morik = {};
Morik.Office = {};
Morik.Office.LeftMenu = function (cfg) {

  //缺省配置
  var dfg = Ext.apply({
    split: true,
    region: 'west',
    width: 200,
    defaults: {border: false},
    layoutConfig: {animate: true}
  }, cfg || {} );
  
  cfg = Ext.apply(dfg, {layout: 'accordion', collapsible: true});

  Morik.Office.LeftMenu.superclass.constructor.call(this, dfg||{});
  
  for(var i=0; i<this.trees.length; i++){
    this.add({
      title: this.trees[i].getRootNode().text,
      items:[this.trees[i]]
    });
  }

  this.addEvents('nodeClick');
  this.initTreeEvent();

}
Ext.extend(Morik.Office.LeftMenu, Ext.Panel, {
  initTreeEvent: function () {
    if(!this.items) return;
    for(var i=0; i<this.items.length; i++){
      var p = this.items.itemAt(i);
      if(p) var t = p.items.itemAt(0);
      if(t) t.on({
        'click': function (node, event) {
          if(node && node.isLeaf()){
            event.stopEvent();
            this.ownerCt.ownerCt.fireEvent('nodeClick', node.attributes);
          }
        }
      });
    }

  }
});

