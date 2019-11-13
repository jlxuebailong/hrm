/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * 
 * /license
 */
Ext.ux.Portlet = Ext.extend(Ext.Panel, {
    anchor : '100%',
    frame : true,
    collapsible : true,
    draggable : true,
    cls : 'x-portlet'
});

Ext.reg('portlet', Ext.ux.Portlet);
