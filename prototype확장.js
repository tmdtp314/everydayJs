/*
     prototype 확장 방법

       - prototype에 프로퍼티를 연결하여 작성한다. 
       - prototype.name = value 형태로
       - value에 JS데이터 타입 작성 가능 
       - prototype에 null을 설정하면 확장이 안된다. 

    prototype 연결 시 고려사항
      
     - 연결할 프로퍼티가 많을 때에는 
       Book.prototype = {name1:value,...} 형태로 작성된다. 
       문제는 이렇게 할당을 하면 constructor가 지워진다. 
       하지만 지워지고 난 후 다시 constructor를 다시 연결하면 된다.  




*/

function Book(){};
Book.prototype={
    constructor:Book, // --constructor를 의도적으로 작성해준다. 
    setPoint:function(){}
};
var obj = new Book();
console.log(obj.constructor); // 실행결과 function Book(){}

/*
  Prototype확장과 인스턴스의 형태 (ES5)
*/
function Book2(point){
  this.point=point;
};

Book2.prototype.getPoint = function(){
  return this.point;
};

var obj = new Book2(100);
obj.getPoint();

/*
     1. function Book2(point) {}
         Book2 오브젝트 생성
     2. Book2.prototype에다가 getPoint메소드 연결
     3. new Book2으로 인스턴스 생성, obj에 할당
        - 인스턴스를 생성하면 prototype에 연결된 메소드를
          인스턴스.메소드이름() 형태로 호출한다.
        - obj:{
            point: 100,
            __proto__ = {

              constructor : Book2,
              getPoint: function(){}
            }


        }
     4. obj.getPoint()호출
        = obj.__proto__.getPoint() 로 호출가능


*/