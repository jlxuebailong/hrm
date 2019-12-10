/*!
 * P2 Library 1.0
 */

Ext.define('P2.ux.desktop.App', {
    extend : 'Ext.ux.desktop.App',
    alternateClassName: ['P2.desktop.App'],
    init : function() {
		// custom logic before getXYZ methods get called...
		var me=this;
		me.callParent();

		// now ready...
    },

    getDesktopConfig : function() {
		var me = this, ret = me.callParent();
		return Ext.apply(ret, {
		    wallpaper : SysConfig.desktopPic,
		    wallpaperStretch : true,
		    /*listeners:{
		    	resize:function(self, width, height, oldWidth, oldHeight, eOpts){
            		var app=this.getActiveWindow( );
            		if(app){
            			app.setWidth(width);
            			app.setHeight(height-37);
            		}
            	}
		    }*/
		});
    },

    // config for the start menu
    getStartConfig : function() {
		var me = this, ret = me.callParent();
		Global.userNameLabel =  Global.hello+Global.userNameLabel;
		return Ext.apply(ret,{
			//height : 400,//change startMenu height
			title :Global.userNameLabel,
			iconCls : "user",
			toolConfig : {
				width : 120,
				items : [ {
					text : Global.startInboxLabel,
					textAlign : 'left',
					iconCls : 'inboxassignment16',
					handler : function(src) {
						console.log({
							event : 'showinbox',
							appid : 'STARTAPP',
							targetid : 'myportal'
						})
					},
					scope : me
				},  {
					text : Global.startSettingLabel,
					textAlign : 'left',
					iconCls : 'settings',
					handler : function(src) {
						console.log({
							event : "profiledefault",
							appid : 'STARTAPP',
							targetid : "myportal",
							value : "DEFAULT",
							visvalue : "DEFAULT"
						});
					},
					scope : me
				}, '-',{
					text : Global.startLogonSessionLabel,
					textAlign : 'left',
					iconCls : 'logonsession',
					handler : function(src) {
						console.log({
							event : 'logonsession',
							appid : 'STARTAPP',
							targetid : 'myportal'
						})
					},
					scope : me
				}, {
					text : Global.startAboutLabel,
					textAlign : 'left',
					iconCls : 'aboutdialog',
					handler : function(src) {
						console.log({
							event : 'aboutdialog',
							appid : 'STARTAPP',
							targetid : 'myportal'
						})
					},
					scope : me
				}, '-', {
					text : Global.startLogoutLabel,
					textAlign : 'left',
					iconCls : 'logout',
					handler : function(src) {
						console.log({
							event : "signout",
							appid : 'STARTAPP',
							targetid : "myportal"
						});
					},
					scope : me
				}]
			}
		});
    },

    //config for the qucikStart menu
    getTaskbarConfig : function() {
		var me = this, ret = this.callParent();
		return Ext.apply(ret, {
		    quickStart : [{
				name : Global.showDesktopLabel,
		    	//tooltip : Global.showDesktopLabel,
				iconCls : 'nav_icon_taskbar_showdesks2',
				scope : this,
				bodyStyle : 'display:none;',
				module : function(){
					if (Global.currentApp != 'STARTAPP') {
						console.log({
							event : 'switchapp',
							appid : 'STARTAPP',
							value : 'STARTAPP'
						});
						
						var desktop = P2Desktop.getDesktop().getDesktopZIndexManager();
						var DesktopShow = "";
						if(desktop!=null){
							DesktopShow = desktop.hide();
							var myportal_kpiPanel=Ext.get("myportal_kpiPanel");
							if(myportal_kpiPanel != null){
								myportal_kpiPanel.show();
							}
							var starttooltip = Ext.getCmp('startTooltip');
							if(starttooltip){
								starttooltip.show();
							}
						}
							
						
					}
				}
		    },{
		    	name : Global.startInboxLabel,
		    	iconCls:'inboxassignment16',
		    	scope:this,
		    	bodyStyle:'dispalay:none;',
		    	module:function(){
		    		console.log({
					    event : 'showinbox',
					    appid : 'STARTAPP',
					    targetid : 'myportal'
					});
		    	}
		    }],
		    trayItems : [{
				xtype : 'inboxcounter',
				flex : 1,
				text:Global.tbtaskcount
		    }]
		});
    }
});
