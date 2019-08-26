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

  Morik.Office.LeftMenu.superclass.constructor.call(this, cfg||{});

}
Ext.extend(Morik.Office.LeftMenu, Ext.Panel,  {/*加上LeftMenu类的方法*/});

