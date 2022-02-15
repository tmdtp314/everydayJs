$(document).ready(function () {
    $(document).ready(function () {
        var CompArry = ["ODD_03:T"]
        commJs_fnOrderComp("", CompArry, "btnSearch");
    });
    $(".k-pager-numbers").css("left", "7.05em");

    $('.headerSub_title').text("■ " + opener.parent.document.title + " > ");
    $('.headerSub_title_now').text("발주상세 목록 찾기 팝업");

    $("#btnShow").show();
    $("#btnHide").hide();
    $("#grid > div.k-grid-header > div > table > thead > tr.k-filter-row").hide();

    $("#btnHide").on("click", function (e) {
        e.preventDefault();
        $("#grid > div.k-grid-header > div > table > thead > tr.k-filter-row").hide();
        $("#btnHide").hide();
        $("#btnShow").show();
    });

    $("#btnShow").on("click", function (e) {
        e.preventDefault();
        $("#grid > div.k-grid-header > div > table > thead > tr.k-filter-row").show();
        $("#btnShow").hide();
        $("#btnHide").show();
        commJs_Read("grid");
    });

});
$("#btnSearch").click(function () {
    fnSearch();
});
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
var state = "N";
function onEdit(e) {
    var field = e.container.find("input");
    setTimeout(function () {
        field.select();
    }, 25);

    if (state == "Y") {
        e.preventDefault();
        return false;
    }

}
$('#grid .k-grid-save-changes').click(function () {


    fnAllSelect();
});

function fnSearch() {
    commJs_Read("grid");
}
function readonly() {
    return false;
}

function onRequestEnd(e) {
    var response = e.response;
    var type = e.type;
    if (type == "undefined") {
        showError();
    } else if (type == "read") {
        if (response != undefined && response != null) {
            $("#totalCount").html(response.Total);

           if (response.Total == 1) { //곧바로 세팅
                var ArryData = [];
                ArryData.push(response.Data[0])
                commJs_Callback(this, JSON.stringify(ArryData), "@ViewData["+callBack+"]", "@ViewData["+nextFocus+"]", "Y");
            }
        }
    }
}

function readParam() {

    var ODD_03 = $('#ODD_03').val();


    return {
         "GUBUN": "ODD_POPLIST"
        , "ODD_03": ODD_03
        , "ODD_01": '@ViewData["ODD_01"]'

    }
}

function fnAllSelect(gridName) {
    var selectData = [];
    selectData = commJs_SelectList(gridName, "Multi");

   
    commJs_Callback(this, selectData, "@ViewData["+callBack+"]", "@ViewData["+nextFocus+"]", "Y");
}

function commJs_CheckAll2(gridName, headChk, bodyChk) {
    var grid = $("#" + gridName).data().kendoGrid;
    var tbody = $("#" + gridName + " > .k-grid-content > table.k-selectable > tbody");
    var rowIndex = 0;

    $.each(grid.dataSource.view(), function () {

        this.dirty = true;

        var rows = grid.dataSource.view()[rowIndex];

        if ($("#" + headChk).is(":checked")) {
            $("." + bodyChk).prop("checked", true); 
            this["CHK"] = true;  // 이 부분을 this["CHK"]=="true"로 했어서 오류 났었음 

            tbody.find("tr[data-uid='" + rows.uid + "']").addClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").attr('class','k-dirty-cell') //수정한 부분에 dirty -flag 붙이기
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").append("<span class='k-dirty'></span>")

        }
        else
        {

            $("." + bodyChk).prop("checked", false);
            this["CHK"] = false;
            tbody.find("tr[data-uid='" + rows.uid + "']").removeClass("k-state-selected");
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").removeAttr('class');
            tbody.find("tr[data-uid='" + rows.uid + "']").find("td:eq(6)").find('span').remove();

        }

        rowIndex++;
    });

}
function onCellClose(e) {

    var ODD_04 = commJs_commaDelete(e.model.ODD_04);  // 단가
    var ODD_05 = commJs_commaDelete(e.model.ODD_05);  // 입고수량
    var ODD_06 = ODD_04 * ODD_05 // 공급가액
 
 
    var ODD_07_NM = e.model.ODD_07 // 부가세 체크 여부
    
    if (e.model.ODD_05 > e.model.ODD_05_INIT)  { // 수정한 발주수량값이 최초 발주수량을 넘을 경우 
        alert("입고수량은 발주수량을 넘을 수 없습니다. 총 발주수량으로 입력됩니다. ")
        e.model.set("ODD_05", e.model.ODD_05_INIT);
       
        ODD_06 = ODD_04 * e.model.ODD_05_INIT;
        e.model.set("ODD_06", ODD_06);
    }


    if (ODD_07_NM == "Y") {                     // 부가세 포함 체크 시
        e.model.set("ODD_13", ODD_06 * 1.1); // 합계  = 공급가액*1.1
    
        e.model.set("ODD_06", ODD_06)        // 공급가액
    }
    else {                                   // 부가세 포함 미 체크 시
        e.model.set("ODD_13", ODD_06);       //합계=공급가액
      
        e.model.set("ODD_06", ODD_06)        // 공급가액
    }


}