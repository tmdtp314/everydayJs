```
   스코프의 목적
    - 범위를 제한하여 식별자 해결
    - '제한'이 키워드(중복을 제거하고 정확한 값을 쉽게 찾기 위함)
    - 스코프는 식별자 해결을 하여 궁극적으로 값을 구하기 위해 존재한다. 
```

// Function Object를 만드는 시점에 스코프가 설정된다.

function book(){       //엔진이 function을 만나는 순간 FO를 생성하고  
    var point = 123;   //               생성한 FO의 내부 프로퍼티 [[Scope]]에 스코프를 설정한다. 
    function get(){    //               ----> 정적 스코프의 개념이다. (FO생성 할 때 한번만 만들어지니까)
        console.log(point);
    };
    get();

};
book();  // 함수 호출 하면 엔진 컨트롤이 var point로 이동하면서 제일 먼저 선언문을 찾아 function get의 FO를 생성한다
        //                                           이 때, FO에 스코프가 결정된다.
        //                                           이때의 스코프는 '영역 범위'의 개념이다. get함수가 속한 영역을 의미
        //                                       *******  스코프에 속한 point변수도 가져다 쓸 수 있다. *******

