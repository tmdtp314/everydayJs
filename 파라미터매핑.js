/*
      ** 함수 호출 **
      1. 실행콘텍스트 생성
      2. 다음 3가지를 실행 콘텍스트로 넘긴다.  
         함수를 호출한 오브젝트 : this 바인딩 컴포넌트에 설정, this참조
         함수 코드 : function 오브젝트의 [[Code]]에 설정됨
         호출한 함수의 파라미터 값 : Argument 오브젝트에 설정
        

     ** 파라미터 매핑이란 **
     1. 호출한 함수에서 넘겨 준 파라미터 값을 
     2. 호출된 함수의 파리미터 작성 순서에 맞춰 맵핑

     --> 엔진 처리 관점
       - 실행 콘텍스트에 넘겨 준 파라미터 값과
         function 오브젝트의 [[FormalParameters]]에 작성된 '이름'에 값을 매핑하고 (순서대로)
         결과를 선언적 환경 레코드에 설정하는 것 

*/

var obj={};
obj.getTotal = function(one,two){
    return one+two;
}
console.log(obj.getTotal(11,22,77));

/*
getTotal(11,22,77) 함수가 호출 되면
 getTotal FO의 [[FormalParameters]]에서 호출된 함수의 파라미터 이름을 구한다.
 function Object를 만들 때 [[FormalParameters]]에 배열값 [one,two]로 이미 설정되 있다.
 
 실행콘텍스트에서 넘겨준 값 (11,22,77)에서 index번째 값을 구한다.
 선언적 환경 레코드에 {one:11, two:22} 형태로 설정
 77은 맵핑되는 파라미터이름이 없다. 다만 Arguments Object에는 값이 들어간다. 


*/
var obj2={};
obj2.getTotal2=function(one,two){
    var one;
    console.log(one+two);
    two=77;
    console.log('two'+two);
}
obj2.getTotal2(11,22);


/*
   1. obj2.getTotal(11,22) 호출 Start
   2. 파라미터 값을 실행 콘텍스트로 넘김
   3. 파라미터 이름에 값 맵핑
      {one:11,two:22}
   4. 초기화 
      var one 무시됨 one=11
   5. 선언적 환경 레코드 ( 렉시칼환경컴포넌트>환경레코드>선언적 환경 레코드 ) 에서 two존재 체크
      -> 파라미터 맵핑 시 two가 등록되어있으므로 
      그대로 two=22
   6. 선언적 환경 레코드는
      {one:11, two:22} 상태
   7. console.log(one+two) ==> 33 출력
   9. two = 77;
   10 console.log("two:"+two) ===> two: 77

     
*/

/* 과제 */
var obj = {};
obj.getTotal = function (one, two, two){
    console.log(one+two);
}
obj.getTotal(11,22,55);

// >>>>> 샐행 결과 : 66
/*
    1. obj undefined
    2. {getTotal:undefined}
    3. obj.getTotal()실행
    4. Fo , scope
    5. this바인딩, 함수코드, Argument Object에 파라미터 설정
    6. {one:11, two:22, two:55} 선언적 환경 레코드에 설정(매핑 시 이미 존재)
    7. --> two : 22 -> 55로 변경
*/