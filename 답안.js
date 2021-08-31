function book() {
    function getBook() {
        return "one";
    };
    console.log(getBook());
    function getBook() {
        return "two";
    };
};

book();

// two



```
- 함수 선언문 해석

- function 키워드를 만나서 Function 오브젝트를 생성합니다.

- 엔진이 자신이 속한 스코프를 생성한 Function 오브젝트의 [\[Scope]]에 설정합니다.

- book() 함수를 호출하게 되면, 실행 콘텍스트가 생성되고 실행 콘텍스트에서 호출된 함수의 [\[Scope]]에 바인딩된 것을 호출된 함수의 1레벨 밖의 스코프로 사용합니다.

- 이때 내부를 읽으면서 단계를 거쳐, 함수와 변수를 {name: value} 형식으로 실행 콘텍스트에 저장합니다.

- book() 함수를 호출할 때, 엔진 컨트롤이 함수 내부로 들어갑니다.

- 첫 번째 함수 선언문을 getBook에 function 오브젝트를 할당합니다.

- console.log(getBook())은 패스합니다.

- 두 번째 함수 선언문을 getBook에 function 오브젝트를 할당합니다.

- 결과적으로 getBook에는 두 번째 function 오브젝트가 할당되어 있는 상태입니다.

- 변수 초기화

- 내부를 읽어 변수들을 초기화합니다.

- 변수 선언이 없어서 패스합니다.

- 코드 실행

- console.log(getBook())을 실행합니다.

- 이때, getBook() 함수를 호출합니다.

- 해당하는 function 오브젝트는 두 번째로 two를 반환합니다.

- 따라서, 콘솔에 two가 출력됩니다.

- 최종적으로, getBook에는 two를 반환하는 function 오브젝트 할당되어있습니다.


```

//2. 함수 표현식, 함수 호출(), 함수 표현식


function book() {
    var getBook = function() {
        return "one";
    };
    ㅊonsole.log(getBook());
    var getBook = function() {
        return "two";
    };

};

book();

// one

```

- 함수 선언문 해석

- function 키워드를 만나서 Function 오브젝트를 생성합니다.

- 엔진이 자신이 속한 스코프를 생성한 Function 오브젝트의 [\[Scope]]에 설정합니다.

- book() 함수를 호출하게 되면, 실행 콘텍스트가 생성되고 실행 콘텍스트에서 호출된 함수의 [\[Scope]]에 바인딩된 것을 호출된 함수의 1레벨 밖의 스코프로 사용합니다.

- 이때 내부를 읽으면서 단계를 거쳐, 함수와 변수를 {name: value} 형식으로 실행 콘텍스트에 저장합니다.

- book() 함수를 호출할 때, 엔진 컨트롤이 함수 내부로 들어갑니다.

- 내부에 함수 선언문이 없어서 패스합니다.

- 변수 초기화

- 내부에 있는 변수를 초기화합니다.

- 처음에 getBook에 undefined를 설정합니다.

- console.log(getBook())은 패스합니다.

- 두 번째로 getBook에 undefined를 설정합니다.

- 코드 실행

- getBook에 function 오브젝트를 할당합니다.

- console.log(getBook())를 실행하고, getBook() 함수를 호출합니다.

- 이때, getBook() 함수는 one을 반환합니다.

- 콘솔에 one이 출력됩니다.

- 그 후, getBook에 새로운 function 오브젝트가 할당됩니다.

- 최종적으로, getBook에는 two를 반환하는 function 오브젝트 할당되어있습니다.


```

// 3. 함수 선언문, 함수 호출(), 함수 표현식



function book() {
    function getBook() {
        return "one";
    };
    console.log(getBook());
    var getBook = function() {
        return "two";
    };

};

book();

// one

```



- 함수 선언문 해석

- function 키워드를 만나서 Function 오브젝트를 생성합니다.

- 엔진이 자신이 속한 스코프를 생성한 Function 오브젝트의 [\[Scope]]에 설정합니다.

- book() 함수를 호출하게 되면, 실행 콘텍스트가 생성되고 실행 콘텍스트에서 호출된 함수의 [\[Scope]]에 바인딩된 것을 호출된 함수의 1레벨 밖의 스코프로 사용합니다.

- 이때 내부를 읽으면서 단계를 거쳐, 함수와 변수를 {name: value} 형식으로 실행 콘텍스트에 저장합니다.

- book() 함수를 호출할 때, 엔진 컨트롤이 함수 내부로 들어갑니다.

- 첫 번째 함수 선언문을 만나 getBook에 function 오브젝트를 할당합니다.

- 나머지는 패스합니다.

- 변수 초기화

- getBook 변수를 초기화하려했는데 이미 값이 있어서 초기화하지 않습니다.

- 현재 getBook에는 function 오브젝트가 할당되어 있습니다.

- 코드 실행

- console.log(getBook())을 만나서, getBook() 함수를 호출합니다.

- one이 반환됩니다.

- 따라서, 콘솔에 one이 출력됩니다.

- 그 후, getBook에 새로운 function 오브젝트가 할당됩니다.

- 최종적으로, getBook에는 two를 반환하는 function 오브젝트 할당되어있습니다.



4. 함수 표현식, 함수 호출(), 함수 표현식


```


function book() {
    var getBook = function() {
        return "one";
    };
    console.log(getBook());
    function getBook() {
        return "two";
    };

};

book();

// one

```



- 함수 선언문 해석

- function 키워드를 만나서 Function 오브젝트를 생성합니다.

- 엔진이 자신이 속한 스코프를 생성한 Function 오브젝트의 [\[Scope]]에 설정합니다.

- book() 함수를 호출하게 되면, 실행 콘텍스트가 생성되고 실행 콘텍스트에서 호출된 함수의 [\[Scope]]에 바인딩된 것을 호출된 함수의 1레벨 밖의 스코프로 사용합니다.

- 이때 내부를 읽으면서 단계를 거쳐, 함수와 변수를 {name: value} 형식으로 실행 콘텍스트에 저장합니다.

- book() 함수를 호출할 때, 엔진 컨트롤이 함수 내부로 들어갑니다.

- 함수 선언문을 만나 getBook에 function 오브젝트를 할당합니다.

- 변수 초기화

- getBook을 초기화하려 하지만 이미 function 오브젝트가 설정되어 있어서 초기화하지 않습니다.

- 현재 getBook에는 function 오브젝트가 할당되어 있습니다.

- 코드 실행

- getBook에 새로운 function 오브젝트를 할당합니다.

- console.log(getBook())를 만나, getBook() 함수를 호출합니다.

- getBook() 함수는 one을 반환합니다.

- 따라서, 콘솔에 one이 출력됩니다.

- 이 단계에서 다시 함수 선언문을 실행하지는 않습니다.

- 최종적으로, getBook에는 one을 반환하는 function 오브젝트 할당되어있습니다.
```