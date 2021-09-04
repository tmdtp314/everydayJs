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
   3. 
*/