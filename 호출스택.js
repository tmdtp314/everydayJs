```
    실행 콘텍스트의 논리적 구조
      
        - First In Last Out
        - 스택의 가장 위에 실행 콘텍스트 위치
        - 싱글 스레드에서 나오는 논리
        - 최종적으로 호출되는 것이 먼저 나오게 된다. 
        - 가장 아래에는 글로벌 오브젝트의 함수가 위치
```


function one(){   // ----- 글로벌 오브젝트
    two();            // ---- 스택의 가장 위
    console.log(1);
}
function two(){
    three();           // ----- 스택의 가장 위
    console.log(2);
}
function three(){
    console.log(3);      //---- three가 스택에서 나온다.
}
one();

// 결과 : 3 2 1
window.onload=function(){
    "use strict"
    debugger;
    function setMain(){
        function one(){
            two();
            console.log(1);
        };
        function two(){
            three();
            console.log(2);
        };
        function three(){
            console.log(3);
        }
    one();
    };
    setMain();
};
