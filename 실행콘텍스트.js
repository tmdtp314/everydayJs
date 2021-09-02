/* 실행콘텍스트는 함수가 실행되는 영역이자 묶음이다.
   함수 코드를 실행하고 *****실행 결과를 <저장>*******한다. 
   개발자가 실행콘텍스트를 가지고 뭘 어떻게 할 수는 없다
     -  엔진이 처리하는 개념
*/

```
   컴포넌트
     - 렉시컬 환경변수
     - 동적 환경
     - ThisBinding

```

function music(title){
    var musicTitle = title;
};
music("음악");

```
   music()함수 호출
   -> 엔진은 실행 콘텍스트를 만든다
   -> 엔진 컨크롤이 실행 콘텍스트 안으로 이동한다
   -> 실행콘텍스트는 준비단계, 초기화 단계, 코드실행 단계로 이루어진다.

   실행 가능한 코드 유형
   : 함수코드, 글로벌 코드, eval 코드
   : 각각 처리 방법과 실행 환경이 다르다. 
   : 함수코드 - 렉시컬 환경(정적 환경에서 실행)
     글로벌코드 - 글로벌 환경에서 실행
     eval 코드 - 동적 환경에서 실행


   ```

   ```

       실행 콘텍스트(EC):{ -- 오브젝트
           렉시컬 환경 컴포넌트:{},   -- 각각이 오브젝트
           변수 환경 컴포넌트:{},
           this 바인딩 컴포넌트:{}
       }

       렉시컬 환경과 변수 환경은 초기값이 같다.
       각각의 컴포넌트들을 채워나간다

   ```


   /*  실행 콘텍스트 실행 과정 */
   var base = 200;                 
   function getPoint(bonus){          
       var point = 100;
       return point +base + bonus;
   };
   console.log(getPoint(70))
   ```
      1. getPoint FO 생성
      2. getPoint의 [[Scope]]에 글로벌 오브젝트 설정 (51번줄~56번줄까지)
      3. base 선언
      4. base 값 200 할당
      5. getPoint(70) 호출, 실행 콘텍스트 생성
      6. 준비단계
      7. 렉시컬환경, 변수환경, this바인딩 컴포넌트들을 생성하여 실행 콘텍스트에 첨부
      8. 환경 레코드 생성 -> 렉시컬 환경 컴포넌트에 첨부
      9. 외부 렉시컬 환경 참조를 생성 -> 렉시컬 환경 컴포넌트에 첨부
      10. 호출한 함수의 파라미터 값을 호출된 함수의 파라미터 이름에 매핑
          -> 환경 레코드에 작성

          렉시컬 환경 컴포너트 = {
              환경 레코드:{
                  bonus:70,
                  point: undefined
              },
              외부 렉시컬 환경 참조:{
                  base:200
              }

          }
      11. 실행단계 - 함수 안의 코드 실행
      12. var point=100
          => 실행 콘텍스트 안에서 관련된 함수와 변수를 사용할 수 있다. 
          => 우리가 보는 로직이 실행이 된다. 

    ---> 이 모든 묶음이 메모리 상에서 이루어진다. 
          
        
   ```
   function book(){
    function get(){
        return point;
    };
    var point = 123;
   return get();
   };
   book();
   ```
   FO book 생성, 스코프  설정
   book() 실행
   실행콘텍스트
   렉시칼환경
     -환경 get FO,point(undefined)
     -외부 x
   실행 : point=123, return get();
   get 함수 호출
     -환경
     -외부 point=123
    실행 return point
    console.log(123)
   


   ```