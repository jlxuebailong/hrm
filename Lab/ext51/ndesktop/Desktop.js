/*
 * ! P2 Library 1.0
 */
/**
 * 覆盖 Ext.ux.desktop.Desktop;
 */
Ext.override(Ext.ux.desktop.Desktop, {
			createDesktopMenu: function() {
				var me = this, ret = {
					items : me.contextMenuItems || []
				};
				return ret;
			},
			// onDesktopMenu方法，桌面右击不显示菜单
			onDesktopMenu: function(e) {
			},
			shortcutTpl: [
				'<div class="ux-desktop-shortcut-column">',
				'<tpl for=".">',
				'<div class="ux-desktop-shortcut ux-desktop-longShortcut" id="{name}-shortcut">',
				'<div class="ux-desktop-shortcut-icon {iconCls}">',
				'<img src="{iconCls}" title="{name}">',
				'</div>',
				'<span class="ux-desktop-shortcut-text ux-desktop-font">{name}</span>',
				'</div>',
				'<tpl if="xindex % 6 === 0">',
				'</div>',
				'<div class="ux-desktop-shortcut-column">',
				'</tpl>',
				'<tpl if="hasTip==true">',
				'<div style="display:{tipDisplayOrNot};">',
				'<span  id="{windowId}_tip" class="badge badge-inbox">{tipText}</span>',
     			'</div>',
     			'</tpl>',
				'</tpl>',
				'</div>',
				'<div calss="x-clear"></div>'
			],

			onShortcutItemClick : function(dataView, record) {
				var me = this; // , module = me.app.getModule(record.data.module),
				if (Ext.isFunction(record.data.handler)) {
					record.data.handler.call();
				}
			},
			createWindowMenu: function() {
				var me = this;
				return {
					defaultAlign : 'br-tr',
					floating: true,
					alwaysOnTop: true,
					bodyStyle: {zIndex: 120010},
					items : [{
								text : SysConfig.restoreText,
								handler : me.onWindowMenuRestore,
								scope : me
							}, {
								text : SysConfig.minimizeText,
								handler : me.onWindowMenuMinimize,
								scope : me
							}, {
								text : SysConfig.maximizeText,
								handler : me.onWindowMenuMaximize,
								scope : me
							}, '-', {
								text : SysConfig.closeText,
								handler : me.onWindowMenuClose,
								scope : me
							}],
					listeners : {
						beforeshow : me.onWindowMenuBeforeShow,
						hide : me.onWindowMenuHide,
						scope : me
					}
				};
			}
		});
