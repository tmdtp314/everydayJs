/*
    constructor 프로퍼티란
       
       - 생성하는 function 오브젝트를 참조한다.
       - prototype에 연결되어 있다.
       - function 오브젝트를 생성할 때 설정된다. 

       Book function 오브젝트 : {
           ...
           prototype:{
               constructor : Book      -- Book function object 전체 참조
           }
       }
*/

var Book = function(){};                   // 생성자 Book
var result =
  Book === Book.prototype.constructor;
  console.log("1:",result);               // true , Book object랑 Book.prototype.constructor이 타입까지 같다.
                                          // Book.prototype.constructor가 Book전체 참조하기 때문

var obj = new Book();                         // new 만나서 생성자 Book 생성
console.log("2: ",Book === obj.constructor);  // true반환

console.log("3: ",typeof obj);            //function, 
console.log("4: ",typeof obj)             //object,       

/*
                function Object (var Book = function(){}) 를 인스턴스로 생성했더니 object로 타입이 변경됨
                이것은 [[Constructor]]가 실행 될 때 생성한 오브젝트의 [[Class]]에 'Object'를 설정하기 때문
  
                ==> 오브젝트 타입이 바뀐다는 것은 오브젝트의 성격과 목적이 바뀐 것을 의미. 
                     ->  funciton -> object 로 바뀐것
                     ->  따라서 인스턴스는 다른 관점에서 접근해야 한다. 
                         함수 개념으로 접근할 것이 아니라. 
                         prototype이 있으며 이 prototype에 많은 메소드들의 연결된다.

                        **** 즉 인스턴스는 함수가 하나가 아니라 다수이다.*** 
                             (function은 함수가 하나이다.)
                
*/


