Ext.ux.resizeSpot = function(el, c){
	this.el = this.getEl();
	for(var p in c || {}){
		this[p] = c[p];
	}
	this.init(c);
	

}

Ext.ux.resizeSpot = Ext.extend(Ext.BoxComponent, {
	spots: 'tl,tr,bl,br,tc,bc,lc,rc',
	dragPos: {
		t:  function(){}, b: function(){},
		l:  function(){}, r: function(){},
		tl: function(){}, tr: function(){},
		bl: function(){}, br: function(){},
		tc: function(){}, bc: function(){},
		lc: function(){}, rc: function(){}
	}
});	