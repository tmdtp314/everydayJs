/*
    생성자 함수 : new 연산자와 함게 인스턴스를 생성하는 함수
    new Book()에서 Book()이 생성자 함수이다. 

    new 연산자가 생성자 함수를 호출
    -> 생성자 함수에서 인스턴스를 호출 및 반환.
    -> new연산자가 이를 받아 반환. 
*/

function Book(point){ // 대문자, 생성자 함수
    this.point=point;
};
Book.prototype.getPoint = function(){  // new연산자와 prototype의 존재는 전형적인 형태 *
    return this.point; 
};
var obj = new Book(10);

/*
   1. new연산자로 인스턴스 생성
   2. 생성자 함수인 Book()으로 인스턴스를 생성하여 반환
   3. 엔진이 new 연산자를 만나면 FO의 [[Construct]]호출
     파라미터 값으로 10을 넘겨줌 
   4. [[Constructor]]는 Book()함수 전체를 참조하도록 설정
      따라서 Book.prototype.getPoint에 연결되어 있는 것들도 처리 가능
   5. Constructor에서 인스턴스를 생성하여 반환
   6. new연산자가 받아서 연산자를 호출한 곳에서 반환
   7. function object의 [[Constructor]]가 인스턴스를 생성하는 것임.

*/

/*
    실행.

       1. new Book(10) 실행
       2. Book 오브젝트의 [[Construct]] 호출
       3. 빈 오브젝트 생성 ( 이게 인스턴스 )
       4. {} 상태이며 이걸 하나씩 채워감
       5. 내보 처리용 프로퍼티를 설정
       6. 오브젝트의 [[Class]]에 "Object" 설정
          - 따라서 function에서 Object로 타입이 바뀜
       7. Book.prototype에 연결된 메소드를 생성한 인스턴스의 [[Prototype]]에 설정


       Book 인스턴스 : {
           point:10,
           __proto__={                     -- Book.protytpe에 연걸된 프로퍼티가 여기에
               constructor:Book,           -- constructor도 같이 설정된다.(자동으로) 이는 Book 전체 참조한다.
               getPoint : function(){},
               __proto__: Object
           }
       }

*/