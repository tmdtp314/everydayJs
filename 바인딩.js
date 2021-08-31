```
    - 바인딩의 대상은 프로퍼티 이름이다. 
    - 구조적으로 결속된 상태로 만드는 것이다.
    - 바인딩의 목적 : 스코프 설정, 식별자 해결
    - 정적 바인딩 <-> 렉시컬 스코프 : 초기화 단계에서 바인딩'
                                     함수 선언문 이름을 바인딩
                                     표현식 이름을 바인딩
      동적 바인딩 <-> 동적 스코프   : 실행할 때 바인딩(실행할 때 마다 바인딩)
                                     eval, with문


    - 바인딩할 때 스코프가 결정되기 때문에 바인딩 시점이 중요하다. 

                 
```
function book(){
    var point=100;                     // ---- 1
    function add(){ point += 200;};    // ---- 2
    function get(){return point;}      // ---- 3
}
```
 book 의 FO가 생성되는 시점에 1,2,3이 book FO의 [[Scope]]에 설정된다
 add 의 FO가 생성되는 시점에 1,2,3 이 add FO의 [[Scope]]에 설정된다
 get 의 FO가 생성되는 시점에 1,2,3 이 get FO의 [[scope]]에 설정된다

 1,2,3 이 각자의 스코프에 설정된다
 그리고 절대 스코프가 변경되지 않는다
    
```

function book_(){
    var point = 100; // ------2 
    function add(param){ // ------- 3
        point+=param;
    };
    var get = function(){ // ------- 4
        return point;
    };
    add(200);
    console.log(get()); // --------5
                       
};
book_(); // -------- 1

```
   스코프 바인딩

   book함수 호출 --- 1
   함수 안으로 엔진컨트롤 이동 --- 2
   초기화 단계에서 함수와 변수 이름을 선언적 환경 레코드에 바인딩 
   add FO 생성 --- 3
   add 함수가 속한 영역(2~5) add FO의 내부 프로퍼티인 [[Scope]]에 설정
   add 이름을 '선언적 환경 레코드(레코드)'에 바인딩
   point 의 이름을 레코드에 바인딩 이 때 값은 undefined --- 3
   get 의 이름을 레코드에 바인딩 이 때 get 의 값은 undefined --- 4

   =====> 여기까지 함수와 변수의 식별자 문제가 해결됨

   코드 실행
   point = 100 할당
   function Object 만들어서 get에 할당
   get이 속한 영역(2~5)을 get Function Object의 내부 프로퍼티에 설정


   add(200)함수 호출
   선언적 환경 레코드에서 point 를 찾는다 -> 없다
   -> add 오브젝트의 스코프를 사용해서 찾는다. (100)
   -> 100+200
   => 즉 함수 밖에 있는 값을 가져다가 내꺼처럼 쓸 수 있다. (스코프 개념 때문에)

   console.log(get()) 실행
   get()함수 호출 -> return point 를 만난다.
   레코드에 point가 없으므로 다시 검색
   get 오브젝트의 [[Scope]]((2~5)까지 담아놓은 )사용
   book 오브젝트가 스코프임

   
```

/* 동적 바인딩
     - with문 "use strict"환경에서 에러 발생
     - eval()함수 : 보안에 문제 있음
 */

