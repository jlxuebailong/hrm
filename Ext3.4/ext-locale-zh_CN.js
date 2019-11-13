Ext.onReady(function() {
    Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    Date.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    if(Ext.calendar) {
        if(Ext.calendar.MonthView){
            Ext.apply(Ext.calendar.MonthView.prototype, {
                todayText : "今天"
            });
        }
        
        if(Ext.calendar.DayView){
            Ext.apply(Ext.calendar.DayView.prototype, {
                todayText : "今天"
            });
        }
        
        if(Ext.calendar.CalendarPanel){
            Ext.apply(Ext.calendar.CalendarPanel.prototype, {
                todayText : "今天"
            });
        }
    }
});


