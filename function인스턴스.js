/*
      function 구분
        -  빌트인 Function 오브젝트
        - function 오브젝트 : function 키워드로 생성
        - function 인스턴스 : new 연산자로 생성

      사실 function 오브젝트도 인스턴스이다. 
      빌트인 Function object로 생성하기 때문이다. 

      일반적으로 말하는 함수가 FO 

      -----------------------
*/

/*
     new 연산자로 생성하는 인스턴스는 일반적으로 prototype에 프로거티를 작성한다.

*/
function Book(point){
    this.point=point;
}
Book.prototype.getPoint = function(){ //프로퍼티 이름 : getPoint
                                      //프로퍼티 값 : function()~
    return this.point+200;
}
var obj = new Book(100);
obj.getPoint();  // obj라는 인스턴스의 getPoint메소드 호출
console.log(obj.point);
console.log(obj.getPoint());

/*      function 인스턴스 생성 순서
      1. function Book(point){...}
        - Book 오브젝트를 생성
        - 엔진이 Book.prototype을 만든다. (Book.prototype도 오브젝트)

      2. Book.protytpe.getPoint = function(){}
         - Book.prototype에 getPoint를 연결하고 function(){}을 할당. 
         - Book.prototype이 오브젝트이므로 프로퍼티 연결이 가능함. 
         {name:getPoint, value:function(){...}}

      3. var obj = new Book(100);
         - Book()을 실행한다. 
         - 인스턴스 생성, point값 할당
         - 생성한 인스턴스에 메소드들(prototype.getPoint = function()~을 설정한다. ( {getPoint:function(){...}} {name:value}형태로 할당된다.)
           {name:value}형식으로 인스턴스에 할당

      4.  obj.getPoint() 호출
        - getPoint의 this는 인스턴스를 찹조하게 된다. (new Book(100))


      5. obj 인스턴스에서 point변수 이름을 찾는다. 
         obj 인스턴스에서 getPoint() 를 찾는다. 
         
      6. 실행 
    ====> 프로토타입에 연결되는 것안 앞으로 "메소드"이다. 
       function은 "함수"


*/