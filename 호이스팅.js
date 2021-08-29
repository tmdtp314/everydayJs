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

function book(){
    function getBook(){
        return "책1";                             
    };
    console.log(getBook());
    function getBook(){
        return "책2";
    };

};
book();   //실행결과 ---> 책2


/////////////////////////////
var book1=function(){
    return "책1";
}
console.log(book1);
var book1=function(){
    return "책2"
}

////////////////////////
