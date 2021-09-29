/*
       prototype 오브젝트의 목적
         - prototype의 확장
         - prototype에 프로퍼티를 연결하여 ㅗ학장
           ex) Book.prototype.getPoint=function(){...}

         -원본 프로퍼티 공유
          var obj = new Book(123);
          obj.getPoint();  
          ----> 인스턴스의 getPoint를 호출하는 것이 아니라 Book.prototype의 getPoint를 호출한다.
         
         - 인스턴스 상속
           function 인스턴스를 연결해서 상속한다. 
           ex) Point.Prototype = new Book();
           prototype-based 상속이라고도 한다. 


*/
function Book(title){           // Book 생성자 함수
    this.title=title;
};
Book.prototype.getTitle = function(){
    return this.title;
};
function Point(title){        //Point 생성자 함수
    Book.call(this, title);    // prototype은 연결되어있지만 지금 function Book()이 연결이 안 되어있는 상태
                               // 파라미터 값을 넘겨줘서 '이어주는' 것 필요
}
Point.prototype=
    Oject.create(Book.prototype,{/*A */});   //Book.prototype 즉 getTitle을 Point.prototype에 연결시켜준다. (create)
                                             // A 부분에는 Point prototype의 메소드들이 들어간다. 
var obj=new Point("자바스크립트");  // new 연산자로 Point생성자 호출
console.log(obj.getTitle()); 

/*
     JS에서 prototype은 상속보다 프로퍼티의 연결 의미가 더 크다. 
     인스턴스의 연결도 프로퍼티 연결의 하나이다. 

    => ES6는 이런 복잡한 과정을 안거쳐도 된다. class로 상속한다. 
       class상속은 아래와 같다
*/

class Book2{
    constructor(title){
        this.title=title;
    }
    getTitle(){
        return this.title;
    }

};
class Point extends Book2{
    constructor(title){
        super(title);
    };
};
const obj = new Point("자바스크립트");
console.log(obj.getTitle());