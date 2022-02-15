var state = "N";
var menuId="asdf" // from ViewData
var check_callback = "A";
var check = true;
var editRow = ""; 
var array = []; // 팝업 통해 추가 관련 - 최초 배열
    var array2 = []; // 팝업 통해 추가 관련 -팝업창에서 추가할 때마다 비교하기 위해 만든 배열   
    var array3 = []; //remove용 배열

$(document).ready(function () {
    var GUBUN = $('#GUBUN').val();
    if (GUBUN == "INSERT") {
        var CompArry = ["GEM_02:T", "GEM_03:P", "GEM_04:D", "GEM_05:N", "GEM_06:C", "GEM_07:C", "GEM_08:T", "GEM_97:T"];
        commJs_fnOrderComp("fr", CompArry, "btnSaveOrUpdate");
    }
    else if (GUBUN == "UPDATE") {
        var CompArry = ["GEM_02:T", "GEM_04:D", "GEM_05:N", "GEM_06:C", "GEM_07:C", "GEM_08:T", "GEM_97:T"];
        commJs_fnOrderComp("fr", CompArry, "btnSaveOrUpdate");
    }
   

});

$(function () {
    $('#GEM_02').on("input change", function (e) {
        var grid = $('#grid').data().kendoGrid;
        var dataitem = grid.dataSource.view();
        if (grid._data.length != 0) {

            for (var i = 0; i < dataitem.length; i++) {
                dataitem[i].set("GED_03", $('#GEM_02').val());
            }
        }
        else return false;
        });
});

 

function GED09DropDownTemplate(e) {    //영세율 드롭다운
    var selbx_dataSource = [{ "key": "A", "value": "영세율" }, { "key": "B", "value": "일반" }, { "key": "C", "value": "기타" }];
    var grid = e.sender;
    var items = e.sender.items();

    items.each(function (e) {
        var dataItem = grid.dataItem(this);
        var selbx_DD = $(this).find('.selbx');

        $(selbx_DD).kendoDropDownList({
            value: dataItem.GED_09,
            dataSource: selbx_dataSource,
            dataValueField: "key",
            dataTextField: "value",
            change: onSelbxChange
           
        });

    });
}
$("#btnDelete").click(function (e) {
    if (confirm("삭제 하시겠습니까?")) {
        $("#GUBUN").val("DELETE");
        ajaxForm();
    } else {
        e.preventDefault(); return false;
    }
});

function onSelbxChange(e) {
    var selected = this.value();
    var grid = $('#grid').data().kendoGrid;
    var dataItem = grid.dataItem(grid.select());
    var rowIndex = grid.items().index(grid.select())
    dataItem.set('GED_09', selected);

    grid.select("tr:eq(" + rowIndex + ")");
  
    // dropMoveFlage = !dropMoveFlage;
    $(".k-state-selected td:nth-child(17)").click();
}



$(function () {
    $("#grid").on("click", ".chkbx", function () {
        var checked = $(this).is(':checked');
        var grid = $("#grid").data().kendoGrid;
        var dataItem = grid.dataItem($(this).closest('tr'));
        dataItem.set('CHK', checked);
    })

    $('#grid').on('click', '.chkbx1', function (e) {
     

        var checked = $(this).is(':checked');
        var grid = $('#grid').data().kendoGrid;
        var dataItem = grid.dataItem($(this).closest('tr'));

        var GED_05 = commJs_commaDelete(dataItem.GED_05);  // 단가      
        var GED_07 = commJs_commaDelete(dataItem.GED_07);



        if (checked == true) {
            dataItem.set("GED_08", "Y");
            dataItem.set("GED_14", GED_07 * 1.1); // 합계  = 공급가액*1.1
            dataItem.set("GED_13", GED_05 * 0.1)  // 부가세

        } else {

            dataItem.set('GED_08', 'N');
            dataItem.set("GED_14", GED_07);       //합계=공급가액
            dataItem.set("GED_13", GED_05 * 0.1)  // 부가세
        }
    })
});


function deleteRow(gridName, urlAction) {

    var jsonArry = commJs_SelectList(gridName, "Multi");
    var arryData = JSON.parse(jsonArry);


        var url = '@Url.Action("_url_", "Z04004C001", new { Area = "Z04004" })'.replace("_url_", urlAction);

        if (arryData.length > 0) {
            commJs_Ajax(url, arryData, "POST", "text", fnDeleteRowSub_Callback)
        } else {
            alert('삭제할 항목을 체크 하세요.');
            return false;
        }
    array.length = 0;
    array2.length = 0;
    array3.length = 0;
}

function fnDeleteRowSub_Callback(retVal) {
    alert("체크목록이 삭제되었습니다.");
    opener.parent.fnSearch2();
    commJs_Read("grid");
 //   $("#grid .k-state-selected td:nth-child(10)").click();
}


/**** 문제의소재 
 *    1. grid.addRow()를 해 주기 위해서는 grid 마지막행이 매번 select 되어있어야 함.
 *    2. 문제는 수량이 수정되어 더해진 행에 focus를 해 줘야 함
 *    3. onDataBound가 grid 행 select를주는 곳인데 이곳을 조건에 따라 바꿔줘야 함 ***/


function onDataBound(e) {
    var GUBUN = $("#GUBUN").val();

    if (flag) {
        $("#grid").data("kendoGrid").select("tr:last"); // editable (CreateAt(GridInsertRowPosition.Bottom) >> Bottom으로 한경우 last를해줘야 추가 됨 

    }
    else {

        //grid.select(select);

        var dataRow = $('#grid').data("kendoGrid").tbody.find("tr[data-uid='" + editRow + "']")
        $("#grid").data("kendoGrid").select(dataRow);
        
        
    }
    lockedGridHover("grid");
    

    if (GUBUN == "INSERT") {
        $("#grid > .k-grid-toolbar > a").css("visibility", "hidden");
        opener.parent.fnSearch2();
    } else {
        if (state == "N") {
            $("#grid > .k-grid-add").show();
        }
    }
    GED09DropDownTemplate(e);
}
function onRequestEnd(e) {
    var response = e.response;
    var type = e.type; 
    

    if (type == "undefined") {
        showError();
    } else if (type == "read") {
        if (response != undefined && response != null) {
            $("#totalCount").html(response.Total);
        }
    } else if (type == "create" || type == "update") {
        if (response != undefined && response != null) {
            commJs_Message(1);
            opener.parent.fnSearch2();
            commJs_Read("grid");
        }
    }
}

function fnEnterPopup(div) {
    if (event.keyCode == 13) {
        if (div == "ODM") {
            fnEnterPopupODM();
        } else if (div = "ODD") {
            fnEnterPopupODD();
        }
    }
}
function fnEnterPopupODM() {
    var param = {"ODM_01": $("#GEM_03").val()  }
    var voParam = commJs_fnGetParamter("@ViewData["+menuId+"]", param, "GEM_04", "fnOdmCallBack");
    commJs_WindowOpen("/Z04004/Z04004CSearchPopup/PopupODM", voParam, "1000", "700");
}
function fnOdmCallBack(poData, nextFocus) {
    var getData = JSON.parse(poData);

    //데이터 셋팅

    $("#GEM_03").val(getData[0].ODM_01); // 발주서 번호 셋팅
    $('#GEM_03_NM').val(getData[0].ODM_03_NM);
    $('#ODM_04_NM').val(getData[0].ODM_04_NM);
    $('#ODM_05').val(getData[0].ODM_05);
    if (getData[0].ODM_10 == "Y") $("input:checkbox[id='GEM_07']").prop("checked", true);
    else $("input:checkbox[id='GEM_07']").prop("checked", false);
    $("#" + nextFocus).parent("span").focus();
}
function readParam() {

    return {
        "GUBUN": "LIST",
            "GED_01": $('#GEM_01').val()
        }
}
$("#btnSaveOrUpdate").click(function (e) {
    validationCheck(e);
});
function ajaxForm() {
    commJs_commaDeleteList(["GEM_05"]);
    $('#fr').ajaxForm({
        enctype: "multipart/form-data",
        success: callBack,
        error: function (request, status, error) {
            alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            alert('에러발생 ]] 작업실패..!!');
            return false;
        }
    });
}
function validationCheck(e) {

    if ($("#GEM_03").val() == "") {
        alert("발주서 번호를 입력하세요."); e.preventDefault(); $("#GEM_03").focus(); return false;
    }
    if ($("#GEM_04").val() == "") {
        alert("운송 방식을 선택 하세요."); e.preventDefault(); $("#GEM_04").focus(); return false;
    }
    if ($("#GEM_05").val() == 0) {
        alert("운송 비용은 0원 이상입니다."); e.preventDefault(); $("#GEM_05").focus(); return false;
    }
    ajaxForm();
}

function callBack(data) {
    switch (parseInt(data)) {
        case 1:
            var GEM_01 = data.toString().split("^")[1];
            if ($('#GUBUN').val()=="INSERT") {
                $('#GEM_01').val(GEM_01);
                $('.k-grid-save-changes').click();
                alert("저장이 완료되었습니다.");
            }
            location.href = "/Z04004/Z04004C001/GEM_U?MNC_02=" + "@ViewData["+menuId+"]" + "&nextFocus=&callBack=&GEM_01=" + GEM_01;
            opener.parent.fnSearch();
            break;
        case 2:
            opener.parent.fnSearch();
            commJs_Reload(2);
            break;
        case 3:
            opener.parent.fnSearch();
            commJs_Close(3);
            break;
        case 20: alert("입고된 정보입니다. 입고현황 정보를 삭제해주세요.");
            break;
        default: alert("실패 ]] 오류발생..!");
            $("#GUBUN").val("@ViewData["+STATE+"].ToString()");
            break;
    }
}

function createParam() {


    return {
        "GEM_01": $('#GEM_01').val()
    }
}
function updateParam() {

    return {
        "GED_02": $("GED_01").val(),
        "GED_01":$("GED_01").val()
    }
}

var dropMoveFlage = true;
function onEdit(e) {
    var field = e.container.find("input");
    setTimeout(function () {
        field.select();
    }, 25);


    if (state == "Y") {
        e.preventDefault();
        return false;
    }



    $("#GED_06").keyup(function (e) {
        if (e.keyCode == 13) {            
         //   $(".k-state-selected td:nth-child(14)").click();  
            $("tr.k-state-selected input.selbx").click();
        }      
    });



    $("#GED_09").keyup(function (e) {
       if (e.keyCode == 13) {            
         $(".k-state-selected td:nth-child(16)").click();

       }
    });

    $("#GED_03").keyup(function (e) {
        // if (e.keyCode == 13) {
        if (confirm("입고일을 변경하시겠습니까?")) {

            $('#GEM_02').focus();
        }
        else {
            $(".k-state-selected td:nth-child(17)").click();
        }
        
    });
    $("#GED_10").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".k-state-selected td:nth-child(18)").click();
        }
    });
    $("#GED_97").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".k-grid-save-changes").click();
        }

    });
}


function fnEnterPopupDAH(DAH_01) {
    var param = {
        "DAH_01": DAH_01
                };

    var voParam = commJs_fnGetParamter("@ViewData["+menuId+"]", param, "", "fnDahCallBack");
    commJs_WindowOpen("/Z04004/Z04004CSearchPopup/PopupDAH", voParam, "1400", "875");
};

    function fnEnterPopupODD() {
      
     var param = {
        "ODD_01":$('#GEM_03').val()
                };
    var voParam = commJs_fnGetParamter("@ViewData["+menuId+"]", param, "", "fnOddCallBack");
        commJs_WindowOpen("/Z04004/Z04004CSearchPopup/PopupODD", voParam, "1400", "875"); 
    }
 
function fnOddCallBack(poData, nextFocus) {   // 팝업통해 추가 부분        
    state = "Y";     

  
    var arryData = JSON.parse(poData);
    var grid = $("#grid").data("kendoGrid");
   
    var GEM_02 = $('#GEM_02').val(); //마스터 그리드의 입고일

    var GED_04 = "";
    var GED_11 = "";
    var GED_06 = 0;
    var GED_05 = 0;
    var uid = "";
  
    var MAX_ = 0; // 남은 발주 수량. 이 수량을 넘으면 추가가 안되도록  

    arryData.forEach(function (element,idx,array) {
     
        grid.addRow();    
        var selectData = element;
        var gridDataItem = grid.dataItem(grid.select());
       
       
        var GEM_02 = $('#GEM_02').val(); //마스터 그리드의 입고일

        edit = true;

        gridDataItem.set("GED_04", selectData.ODD_03);    // 품목코드
        gridDataItem.set("GED_04_NM", selectData.ODD_03_NM); // 품목명
        gridDataItem.set("GED_11", selectData.ODD_11);    // 규격
        gridDataItem.set("GED_12", selectData.ODD_12); // 길이
        gridDataItem.set("GED_05", selectData.ODD_04); // 단가
        gridDataItem.set("GED_06", selectData.ODD_05);    // 수량
        gridDataItem.set("GED_07", selectData.ODD_06);    // 공급가액
        gridDataItem.set("GED_13", selectData.ODD_14);  // 부가세
        gridDataItem.set("GED_14", selectData.ODD_13);  // 합계
        gridDataItem.set("GED_08 ", selectData.ODD_07);   // 부가세포함
        gridDataItem.set("GED_09", selectData.ODD_08);  // 영세율
        gridDataItem.set("GED_03", GEM_02);  // 입고일자 - 마스터 그리드의 입고일자랑 일단 맞춤
        gridDataItem.set("GED_10", selectData.ODD_10);  // 입고장소
        gridDataItem.set("GED_97", '');  // 비고
        gridDataItem.set("GED_MAX", selectData.ODD_05_INIT);         

        var tr = $('tr[data-uid=' + gridDataItem.uid+ ']');
        if (selectData.ODD_07 == "Y") { tr.find('.chkbx1').prop("checked", true); }

        GED_04 = selectData.ODD_03;
        GED_11 = selectData.ODD_11;
        GED_06 = selectData.ODD_05;
        GED_05 = selectData.ODD_04;
        uid = gridDataItem.uid;
        MAX_ = selectData.ODD_05_INIT;

        var data = { "GED_04": GED_04, "GED_11": GED_11, "GED_05": GED_05, "GED_06": GED_06, "uid": uid, "MAX": MAX_ } // key-value값 배열 생성
                                                                                                                       // 품목코드, 규격, 단가가 같으면 같은 데이터로 간주하여 입고수량 추가 시 
                                                                                                                       // 따로 그리드 행 추가 안되고 해당 행 목록에서 입고수량만 갱신
        array2.push(data)

        if (idx === array.length - 1) {
            flag = false; // 마지막 행일 경우에만 flag true/false줘서 grid.select되지 않도록
            editRow = gridDataItem.uid;

        }
     
    });


    array = grid._data;

    for (var j = 0; j < array2.length; j++) {
        for (var i = 0; i < array.length; i++) {
            
            if (array[i].GED_04 === array2[j].GED_04 && array[i].GED_11 === array2[j].GED_11 && array[i].GED_05 === array2[j].GED_05)  // 품목코드, 규격, 단가가 같으면 같은 데이터로 간주
            {
                if (array[i].uid !== array2[j].uid) {
                    //   array[i].GED_06 += array2[j].GED_06; 
                    array[i].set("GED_06", array2[j].GED_06 + array[i].GED_06);
                    
                }
                else if (array[i].uid === array2[j].uid) {                 
                    array[i].set("GED_06", array[i].GED_06);                       
                }
       
                
                if (array[i].GED_06 > array[i].GED_MAX) {                 
                    array[i].set("GED_06", array[i].GED_MAX);
                  //  alert("[품목코드 : " + array[i].GED_04 +"] 의 입고수량은 발주수량을 넘을 수 없습니다"); 여기서 alert를 주면 popup창이 안닫힘. 
                  
                }
                array3.push(array2[j].uid);                    
            }
        }
      
    }
    const uniqueArr = array3.filter((element, index) => { // 중복된 uid값 제거용 배열 filter      
       
        return array3.indexOf(element) !== index;
    });

    for (var i = 0; i < uniqueArr.length; i++) {
        var dataRow = $('#grid').data("kendoGrid").dataSource.getByUid(uniqueArr[i]); // 품목코드,규격,단가 항목이 중복되는 데이터들은 행에서 지워준다. 
        $('#grid').data("kendoGrid").dataSource.remove(dataRow);
    } 
  
    array2.length = 0; // 비교용 배열 초기화 
    array3.length = 0; // remove row용 배열 초기화 
    $("#grid .k-state-selected td:nth-child(10)").click();
    $("#GED_06").keyup(function (e) {
        if (e.keyCode == 13) {
            $(".k-state-selected td:nth-child(14)").click();              
        }
    });
    state = "N";
    edit = false;
    
    check_callback = "B";
   
    
}  
  
$('#grid .k-grid-cancel-changes').click(function (e){ // 취소-그리드 비우기 

    check_callback = "A"; // 초기화 check포인트
    array.length = 0; // 배열 비우기 
    array2.length = 0;
    flag = true;
    editRow = "";

});
function addRow() {
    flag = true;
    editRow = "";
    fnEnterPopupODD(); 
}

function onCellClose(e) {

 
    var GED_05 = commJs_commaDelete(e.model.GED_05);  // 단가
    var GED_06 = commJs_commaDelete(e.model.GED_06);  // 입고수량

    var GED_13 = commJs_commaDelete(e.model.GED_13)  // 부가세
    var GED_08 = e.model.GED_08 // 부가세 체크 여부     

    var uid = e.model.uid;
 /*   for (var i = 0; i < array.length; i++) {
        if (array[i].UID == uid) {

            array[i].GED_06 = e.model.GED_06;
        }
    }*/

    

    if (e.model.GED_06 <= e.model.GED_MAX) { // 수정한 입고수량이 발주수량(MAX)을 넘지 않을 경우
      
        var GED_07 = GED_05 * GED_06          

    }
    else if (e.model.GED_06 > e.model.GED_MAX) { // 수정한 입고수량값이 발주수량을 넘을 경우 
        alert("입고수량은 발주수량을 넘을 수 없습니다. 총 발주수량으로 입력됩니다. ")
        e.model.set("GED_06", e.model.GED_MAX);
        var GED_07 = GED_05 * e.model.GED_MAX; 
    }


    if (GED_08 == "Y") {                     // 부가세 포함 체크 시
        e.model.set("GED_14", GED_07 * 1.1); // 합계  = 공급가액*1.1
        e.model.set("GED_13", GED_05 * 0.1)  // 부가세
        e.model.set("GED_07", GED_07)        // 공급가액
    }
    else {                                   // 부가세 포함 미 체크 시
        e.model.set("GED_14", GED_07);       //합계=공급가액
        e.model.set("GED_13", GED_05 * 0.1)  // 부가세
        e.model.set("GED_07", GED_07)        // 공급가액
    }

}
 ///////////////


 var GED_05 = commJs_commaDelete(e.model.GED_05);  // 단가
 var GED_06 = commJs_commaDelete(e.model.GED_06);  // 입고수량

 var GED_13 = commJs_commaDelete(e.model.GED_13)  // 부가세
 var GED_08 = e.model.GED_08 // 부가세 체크 여부     

 var uid = e.model.uid;
/*   for (var i = 0; i < array.length; i++) {
     if (array[i].UID == uid) {

         array[i].GED_06 = e.model.GED_06;
     }
 }*/

 

 if (e.model.GED_06 <= e.model.GED_MAX) { // 수정한 입고수량이 발주수량(MAX)을 넘지 않을 경우
   
     var GED_07 = GED_05 * GED_06          

 }
 else if (e.model.GED_06 > e.model.GED_MAX) { // 수정한 입고수량값이 발주수량을 넘을 경우 
     alert("입고수량은 발주수량을 넘을 수 없습니다. 총 발주수량으로 입력됩니다. ")
     e.model.set("GED_06", e.model.GED_MAX);
     var GED_07 = GED_05 * e.model.GED_MAX; 
 }


 if (GED_08 == "Y") {                     // 부가세 포함 체크 시
     e.model.set("GED_14", GED_07 * 1.1); // 합계  = 공급가액*1.1
     e.model.set("GED_13", GED_05 * 0.1)  // 부가세
     e.model.set("GED_07", GED_07)        // 공급가액
 }
 else {                                   // 부가세 포함 미 체크 시
     e.model.set("GED_14", GED_07);       //합계=공급가액
     e.model.set("GED_13", GED_05 * 0.1)  // 부가세
     e.model.set("GED_07", GED_07)        // 공급가액
 }