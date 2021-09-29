// 함수 앞에서 함수를 호출 하는 것을 hoisting이라 한다. 
/*

     함수 선언문은 초기화 단계에서 function object를 생성하므로
     어디에서든 함수 호출 가능


*/

var result = book();    // 2. result=undefined //3. book()값으로 할당
//console.log(result);
function book(){            //1. 여기서 젤 먼저 function object 생성
    return "호이스팅"
};   // 따라서 함수 선언문 앞쪽에서도 호출 가능한것임. 


/*
   변수에 undefined가 아닌 값이 있으면 초기화 하지 않음

*/

var result = book();
//console.log(result);    // "호이스팅"

function book(){
    return "호이스팅";
};
book = function(){              //이미 존재하니까 초기화 하지않는다. 
    return "함수 표현식"
};
//////////////////////////////
```
       ※ 실행콘텍스트가 생성될때 즉 book() 이 때, " 초기화 -> 값 할당" 이 이루어진다.
          초기화 때 "기존 FO에 값이 할당되있는 경우 변수값의 초기화가 안 이루어지는" 것이지
          실행해서 값 할당할 경우 변수에 새로운 FO가 값으로 할당이 된다!!!
```

function book(){
    function getBook(){         
        return "책1";                             
    };                                // FO getBook() 책1 -> getBook()책2 -> 실행(console.log): 책2
    log(getBook());
    function getBook(){ 
        return "책2";
    };

};
book();   //실행결과 ---> 책2


/////////////////////////////

function book1(){

    var getbook1=function(){
        return "책1";
    }
    console.log(getbook1());                   //getbook1 = undefined -> getbook1 =undefined -> "책1" -> 실행 console.log: 책1
    var getbook1=function(){
        return "책2";
    }
    
}
book1();



////////////////////////
function book2(){
    function getbook2(){
        return "책1"
    }                                     // FO book2():"책1" -> book2 = "책1" -> console.log : "책1" 
    console.log(getbook2())
    var getbook2 = function(){
        return "책2"
    }
}
book2();


//////////////////////////
function book3(){
    var getbook3 = function(){
        return "책1";
    }
    console.log(getbook3());                  //FO getbook3 = "책2" -> getbook3 = "책2" -> book3()-> getbook3 = "책1" -> console.log : "책1"
    function getbook3(){
        return "책2";
    }
}
book3();
/////////////////////////////






