
/*체크박스 체크하면 특정 cell이 focus되면서 수정할수있게하는 */
$(function () {
    $("#grid").on("click", ".chkbx", function (e) {

        var checked = $(this).is(':checked');
        var grid = $("#grid").data().kendoGrid;
        var dataItem = grid.dataItem($(this).closest('tr'));
        dataItem.set('CHK', checked);

        var focusedCell = $("#grid tr[data-uid='" + dataItem.uid + "'] td:nth-child(7)");  
        $('#grid').data('kendoGrid').editCell(focusedCell);
     
    })
});



/** 전체 체크박스 클릭 시 dirty 표시  */