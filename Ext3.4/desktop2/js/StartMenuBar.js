/*
 * ! Ext JS Library 3.3.0 Copyright(c) 2006-2010 Ext JS, Inc.
 *  /license
 */
/**
 * @class Ext.ux.StartMenuBar
 * @extends Ext.util.Observable
 */
Ext.ux.StartMenuBar = function(app){
    this.app = app;
    this.init();
}

Ext.extend(Ext.ux.StartMenuBar, Ext.util.Observable, {
    init : function(){
        var startMenu = new Ext.Toolbar({
        	renderTo: 'ux-startmenus-panel',
        	items : this.app.getStartMenuItems()
        });
        return this;
    }
});



