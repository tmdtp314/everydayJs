
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



///////////////////// Ver.1

function commJs_CheckAll2(gridName, headChk, bodyChk) {
    var grid = $("#" + gridName).data().kendoGrid;
    var tbody = $("#" + gridName + " > .k-grid-content > table.k-selectable > tbody");
    var rowIndex = 0;

    $.each(grid.dataSource.view(), function () {

        this.dirty = true;

        var rows = grid.dataSource.view()[rowIndex];

        if ($("#" + headChk).is(":checked")) {
            $("." + bodyChk).prop("checked", true);
            this["CHK"] = "true";
        
            tbody.find("tr[data-uid='" + rows.uid + "']").addClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").attr('class','k-dirty-cell')
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").append("<span class='k-dirty'></span>") // dirty의 경우 class ='k-dirty-cell'이 있고 그 하위엘레멘트로 class='k-dirty'가 있어야 표시가 됨. 

        } else {
            $("." + bodyChk).prop("checked", false); 
            this["CHK"] = "false";
            tbody.find("tr[data-uid='" + rows.uid + "']").removeClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").removeAttr('class'); //class인 element찾아서 제거 
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").find('span').remove(); // 하위 element인 span을 찾아 제거 
        }
        
        rowIndex++;
    });
}
/////////////////// Ver2.

function commJs_CheckAll2(gridName, headChk, bodyChk) {
    var grid = $("#" + gridName).data().kendoGrid;
    var tbody = $("#" + gridName + " > .k-grid-content > table.k-selectable > tbody");
    var rowIndex = 0;

    $.each(grid.dataSource.view(), function () {

        this.dirty = true;

        var rows = grid.dataSource.view()[rowIndex];

        if ($("#" + headChk).is(":checked")) {
            $("." + bodyChk).prop("checked", true); 
            this["CHK"] = true; // 이것때문에 오류 난것이었음

            tbody.find("tr[data-uid='" + rows.uid + "']").addClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").attr('class','k-dirty-cell')
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").append("<span class='k-dirty'></span>")

        }
        else
        {

            $("." + bodyChk).prop("checked", false);
            this["CHK"] = false;  // 이것때문에 오류 난것이었음
            tbody.find("tr[data-uid='" + rows.uid + "']").removeClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").removeAttr('class');
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").find('span').remove();

        }

        rowIndex++;
    });

}