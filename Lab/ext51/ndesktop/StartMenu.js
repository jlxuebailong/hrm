/*
 * ! P2 Library 1.0
 */
/**
 * 覆盖 Ext.ux.desktop.StartMenu;
 */
Ext.override(Ext.ux.desktop.StartMenu, {
    baseCls : Ext.baseCSSPrefix + 'panel',
    cls : 'x-menu ux-start-menu',
    bodyCls : 'ux-start-menu-body',
    defaultAlign : 'bl-tl',
    iconCls : 'user',
    bodyBorder : true,
    width : 320,
    maxHeight:722,
    initComponent : function() {
    	var me = this;
    	if (me.menu.length < 10) {
    	    me.height = 380;
    	} else {
    	    var newHeight = (me.menu.length + 1) * 38;
    	    me.height = newHeight;
    	    if (newHeight > me.maxHeight) {
    		me.height = me.maxHeight
    	    }
    	}
    	me.callParent();
    },
    listeners:{
    	boxready:function(src, width, height, eOpts){
    		for (var i = 0; i < src.items.length; i++) {
    			if(src.height == src.maxHeight){
    				src.body.dom.childNodes[1].style.marginTop = '24px';
    			}
    		} 
    	}
    }
});
