
//树型的点击事件
function nodeClick(node, e) {
    if (node.isLeaf()) {                    // 叶子节点点击不进入链接
        var tab = center.getItem(node.id);
        if (tab) {
            if (e !== undefined) {
                e.stopEvent();
            }
            center.setActiveTab(tab);
        } else {
            if (e !== undefined) {                     // 显示叶子节点菜单
                e.stopEvent();
            }
            centersetActiveTab(node);
        }
    }
    else {
        // 不是叶子节点不触发事件
        e.stopEvent();
        node.toggle();                      // 点击时展开
    }
}
//树型的点击事件
function centersetActiveTab(node) {
    var funActive = eval(node.text.substring(node.text.indexOf('>') + 1, node.text.indexOf('</')));
    var tab = center.add({
        id: node.id.toString(),
        iconCls: "tabicon",
        xtype: "panel",
        title: node.text,
        closable: true,
        frame: true,
        items: funActive
    });
    center.setActiveTab(tab);
}