/*
     Node.js는 서버환경이다.
     동접수가 만명이 넘어가는 경우를 고려해야한다. 
     JS는 single thread다. 
          -- 하나의 함수가 호출되고 끝날때까지 다른 함수가 호출되지 않는다!
          -- 동기 처리 (순차적 처리)
     Node.js환경에서 js는 비동기 처리한다. 
     이러하나 환경에서 Context형태가 효율성이 높다. 
     함수가 실행되는 도중에 다른 함수가 호출되더라도 context하나만 올라가면 되니 빠르다. 

     단, 최적화된 형태로 코드를 작성해야 한다. (정적 아키텍쳐이므로)
     따라서 엔진 처리에 대한 이해가 선결과제이다. 

     */


    /*   Function 인스턴스
        - new 연산자 사용
        - prototype에 연결된 메소드로 생성
    
    */

    
    /*  Function 오브젝트

       - 형태
         var book = function(){} //function object생성하여 변수에 할당
         일반적으로 함수, 메소드는 function 오브젝트를 의미한다. 
       - 엔진이 function 키워드를 만나 생성한 거라서 book() 의 함수 형태로 호출 가능
       - 생성한 후에 호출하려면 생성한 function object를 저장해야한다.
         {name:value} 형태로 저장 즉,
         {함수의 이름: 생성한 function 오브젝트 }
       -  저장된 함수 이름으로 검색 - 식별자 해결
       -  value가 string이면 문자열 처리, int면 계산 처리, function 오브젝트면 호출한다. 

          함수 호출 
          -> 함수의 변수와 함수를 {name:value}형태로 실행 환경 설정
          -> 함수 코드 실행
          -> JS 엔진 시각적 접근 


       - function object 생성 과정

         엔진이 function 키워드를 만난다.
         오브젝트를 생성하고 저장한다.
         빈 오브젝트를 채워가는 식이다.
 
    */
      var sports = function(){};
     // 생성한 오브젝트가 sports변수에 할당된다
     /*function object의 구조*/
     sports={ // 엔진 관점에서 보면 모두 key-value형태의 properties이다. 
         arguments:{},
         caller:{},
         length:0,
         name:"sports",
         prototype:{
             constructor:sports, // object 이름작성, object전체 참조
             __proto__:Object.prototype //엔진이 사용, 6개의 메소드가 설정됨
         },
         __proto__:Function.prototype // 3개의 메소드가 설정됨
                                      // Function 이면 Function인스턴스가 연결
                                      // Array이면 Array인스턴스가 연결
                                      // String이면 String 인스턴스가 연결됨
     }
   /*
     함수 실행 환경 인식
       - 엔진이 function 키워드를 만나서 function 오브젝트 생성 할 때
       - 함수가 속한 정적 스코프(실행영역), 파라미터 함수 코드 등을 설정
       - 함수가 호출될 때 사용할 수 있도록 환경을 저장해야한다. 
       - 생성한 function오브젝트에 저장한다. 
         즉, 생성한 function 오브젝트를 읽으면 실행될 수 있는 환경이 설정되어있다. 
       - {name:value} 형태로 저장
       

   
   
   
   */
    

