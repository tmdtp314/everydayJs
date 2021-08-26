/*
   내부 프로퍼티 분류
     - 공통 프로퍼티 : 모든 오브젝트에 공통으로 설정되는 프로퍼티
     - 선택적 프로퍼티 : 오브젝트에 따라 선택적으로 설정되는 프로퍼티 
     - 스펙 표시 : [[프로퍼티명]]


*/

/*   함수 정의 

   함수 코드가 실행될 수 있도록 js문법에 맞게 함수를 작성하는 것
   - 선언문 : function book(){...} 이런 형식
   - 함수 표현식
      var getBook = function(title){함수코드}   : 변수 이름이 function 오브젝트 이름. 
      var name = function abc(){} 에서 abc가 식별자 위치의 함수 이름

*/

/*      엔진 해석 순서
        - 첫번째, 함수 선언을 순서대로 해석한다.
           function abc(){...}   --> 이런 거
           선언문 n개가 있을 때 이 n개를 작성한 순서대로 석한다.
        
        - 두번째, 표현식을 순서대로 해석
          함수 선언문 n개의 해석을 마친 후 
          m개의 표현식을 작성한 순서대로 해석한다. (변수 표현식, 함수 표현식 가리지 않고)

*/

function book(){
    console.log(title)        // undefined -- > 엔진 해석 했다는 뜻임. 
    console.log(readBook)     // undefined
    console.log(getBook)      // function getBook(){return title;}  --> function object라는 것은 이것을 엔진히 해석했다는 소리임. 
    debugger;
    var title="JS책";
    function getBook(){
        return title;
    };
    var readBook = function(){};
    getBook();
};
book(); 
// '엔진이 해석했다'라는 뜻은 - 스코프 등록을 했다는 소리.
//  title과 readBook {name:value} 에서 name은 등록되어있는데 value는 등록되지 않았따는 소리
// javascript는 프로퍼티를 등록할 때 이름만 있으면 자동적으로 undefined를 설정해버린다. 

/* 함수 흐름 순서 

    1. book() 함수 호출
    2. title 변수 선언
    3. 함수 선언문 작성
    4. 함수 표현식 낙성
*/

/*  함수 코드 해석 순서
    1. 첫번째 돌 때 함수 선언문 해석
      function getBook()                   -- function 오브젝트 생성
    2. 한번 돌고 두번째 돌 때 변수 초기화
       var title = undefined;              -- 일단 식별자 해결
       var readBook = undefined;           -- 일단 식별자 해결
    3. 세번 째 돌 때
       debugger 에서 멈춘다.
       var title = "JS책"
       var readBook = function(){};
       getBook(); 
    4. getBook을 호출했으므로 다시 1~3의 과정을 거친다.
*/

/*    코드 실행 순서

    1. debugger를 실행하며, 실행이 멈춘다.

    2. var title = "JS책"                  -- title변수에 JS책 할당

    3. function getBook(){return title};   -- 선언이므로 다음 줄로 이동
    4. var readBook = function(){};
       function 오브젝트를 생성하여 readBook 변수에 할당 
       readBook이 function 오브젝트화 되었으므로 이 시점에서 readBook 함수를 호출할 수 있다. 
    5. 


*/
