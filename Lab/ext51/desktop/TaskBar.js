/*
 * ! P2 Library 1.0
 */
/**
 * 覆盖 Ext.ux.desktop.TaskBar;
 */
Ext.override(Ext.ux.desktop.TaskBar, {
	alwaysOnTop : true,
	startBtnText : SysConfig.startBtnText,
	initComponent : function() {
		var me = this;
		
		me.startMenu = new Ext.ux.desktop.StartMenu(me.startConfig);

        me.quickStart = new Ext.toolbar.Toolbar(me.getQuickStart());

        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());

        me.tray = new Ext.toolbar.Toolbar(me.getTrayConfig());
        
		me.items = [ {
			xtype : 'button',
			cls : 'ux-start-button',
			iconCls : 'ux-start-button-icon',
			menu : me.startMenu,
			menuAlign : 'bl-tl',
			id : 'startbtn',
			text : me.startBtnText,
			listeners:{
				click:function(){
                    var cmp=Ext.getCmp('startTooltip');
                    console.log(me.startMenu);
					if(cmp){
						cmp.destroy();
					}
				}
			},
			
		}, me.quickStart, {
			xtype : 'splitter',
			html : '&#160;',
			height : 14,
			width : 2, // TODO - there should be a CSS way here
			cls : 'x-toolbar-separator x-toolbar-separator-horizontal'
		}, me.windowBar, '-', me.tray ];
		me.superclass.initComponent.call(this);
	},
	onQuickStartClick : function(btn) {
		var me = this; // , module = me.app.getModule(record.data.module),
		if (Ext.isFunction(btn.module)) {
			btn.module.call();
		}
	},
	getQuickStart : function() {
		var me = this, ret = {
			minWidth : 20,
			width : Ext.themeName === 'neptune' ? 70 : 75,
			items : [],
			enableOverflow : true
		};
		Ext.each(this.quickStart, function(item) {
			ret.items.push({
				tooltip : {
					text : item.name,
					align : 'bl-tl'
				},
				// tooltip: item.name,
				overflowText : item.name,
				iconCls : item.iconCls,
				module : item.module,
				handler : me.onQuickStartClick,
				scope : me
			});
		});

		return ret;
	},
	addTaskButton: function(win) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 168,
            margin: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 28),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        var st = this.windowBar.getScrollerEl();
        st.scrollTo(0,st.getBottom());
        cmp.toggle(true);
        return cmp;
    },
    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
            var st = this.windowBar.getScrollerEl();
            st.scrollTo(0,btn.x);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    },
	onWindowBtnClick: function (btn) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            //btn.disable();
            win.show(null, function() {
                btn.enable();
            });
        } else if (win.active) {
            //btn.disable();
            win.on('hide', function() {
                btn.enable();
            }, null, {single: true});
            win.minimize();
        } else {
            win.toFront();
        }
    }

});
/**
 * @class Ext.ux.desktop.TrayClock
 * @extends Ext.toolbar.TextItem
 * This class displays a clock on the toolbar.
 */
Ext.define('Ext.ux.desktop.InBoxCounter', {
    extend: 'Ext.toolbar.TextItem',

    alias: 'widget.inboxcounter',

    cls: 'ux-desktop-trayclock',

    html: '&#160;',

    timeFormat: 'g:i A',

    tpl: '{time}',

    initComponent: function () {
        var me = this;
        me.callParent();
        me.setText(me.text);
    }
});