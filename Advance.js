function check_sum_ook09(a) {     //FO 생성(스코프 생성)

            
    var result = ''
    var state = ''                            
 
    if (a == false) {
        var sum = 0
        $('.chkbx').each(function () {  //FO 생성, 스코프 결정
            var grid = $("#grid").data().kendoGrid;           
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($(this).is(":checked") == true) {

                sum += dataItem.OOK_09;

            }
        });

        state = 'check_all off';
       result = sum.toLocaleString('ko-KR');          
        console.log(result + ' ' + state);
    
    }
    else {
        let rowIndex = 0;
        var sum_ = 0;
        var grid = $("#grid").data().kendoGrid;
        $.each(grid.dataSource.view(), function () {
            var rows = grid.dataSource.view()[rowIndex];
            sum_ += rows.OOK_09;
            rowIndex++;
        });
       
     
        result = sum_.toLocaleString('ko-KR');         
        state = 'check all';
        console.log(result + ' ' + state);

    }
    return result;

}
```

함수가 호출됨가 동시에 실행 context가 생성된다. -> 실행 context에서 


1. check_sum_ook_09(x) 호출되는 순간 엔진 컨트롤이 var result로 이동

2. function  선언문 검색 -> 없음

3. 변수 초기화 -> 호이스팅 

   - result = undefined   -> '' 
   - state = undefined    -> ''
   - sum = undefined
   - grid = undefined
   - dataItem = undefined
   - $('.chkbx') = undefined
   - rowIndex = undefined
   - sum_ = undefined
   - grid = undefined 
   - grid.dataSource.view = undefined 

4. 변수 값 할당 
```