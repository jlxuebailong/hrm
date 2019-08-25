Ext.override(Ext.form.TextField, {
    unitText: '',
    onRender: function (ct, position) {
        Ext.form.TextField.superclass.onRender.call(this, ct, position);
        // 如果单位字符串已定义 则在后方增加单位对象   
        if (this.unitText != '') {
            this.unitEl = ct.createChild({
                tag: 'div',
                html: this.unitText
            });
            this.unitEl.addClass('x-form-unit');
            // 增加单位名称的同时 按单位名称大小减少文本框的长度 初步考虑了中英文混排 未考虑为负的情况   
            this.width = this.width - (this.unitText.replace(/[^\x00-\xff]/g, "xx").length * 6 + 2);
            // 同时修改错误提示图标的位置   
            this.alignErrorIcon = function () {
                this.errorIcon.alignTo(this.unitEl, 'tl-tr', [2, 0]);
            };
        }
    }
});