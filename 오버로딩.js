function book(one){}
function book(one,two){}
function book(one,two,three){}

book(one,two);

```
   JS는 오버로딩을 지원하지 않음. 
   {name:value}형식으로 저장하가ㅣ 때문
```

function book(){
    function getBook(){
        return "책1";
    };
    getBook(); //실행 부분이라 실행콘텍스트 생성 {name:value}  부분에서는 skip!
    function getBook(){
        return "책2";
    };
};
book();
// FO 책1 -> Fo 책2 : {name:value}에서 name이 같아서 value가 대체된다!
// 실행 할 경우 대체 된 값인 책2를 반환
// 실행결과 >> 책2 
