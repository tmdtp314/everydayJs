


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
    arryData.forEach(function (element) {
     
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
       
    
        
    });
 
    state = "N";
     // 추가되는 행이 첫번째 행이 아님을 체크  
    array = grid._data; // kendo grid에 저장되어 있는 데이터를 사용한다.
  
    for (var j = 0; j < array2.length; j++) {
        for (var i = 0; i < array.length; i++) {
            
            if (array[i].GED_04 === array2[j].GED_04 && array[i].GED_11 === array2[j].GED_11 && array[i].GED_05 === array2[j].GED_05)  // 품목코드, 규격, 단가가 같으면 같은 데이터로 간주
            {
                if(array[i].uid!==array2[j].uid)  array[i].GED_06 += array2[j].GED_06; //  새로 추가 되는 행의 경우 수량 *2 입력 방지  
            
               
                if (array[i].GED_06 > array[i].GED_MAX) {
                    array[i].GED_06 = array[i].GED_MAX;
                    alert("[품목코드 : " + array[i].GED_04 +"] 의 입고수량은 발주수량을 넘을 수 없습니다");
                }
                array3.push(array2[j].uid);                    
            }
        }
      
    }
    const uniqueArr = array3.filter((element, index) => { // 중복된 uid값 제거용         
        return array3.indexOf(element) !== index;         // 중복된 uid값만 뽑아서 나중에 일괄로 삭제처리.이렇게안하면 너루푸 뜸
                                                          // 한번에 할 수 있는 알고리즘이있는것같긴 하지만 일단은..
    });
    for (var i = 0; i < uniqueArr.length; i++) {
        var dataRow = $('#grid').data("kendoGrid").dataSource.getByUid(uniqueArr[i]); // 품목코드,규격,단가 등이 중복되는 데이터들은 행에서 지워준다. 
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
    edit = false;
    check_callback = "B";
}