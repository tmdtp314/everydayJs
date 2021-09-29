```
  목적:
  this를 이용하여 함수를 호출한 오브젝트의 프로퍼티에 엑세스를 하기 위함.
  this.propertyName
  오브젝트의 프로퍼티가 변경되면 동적으로 참조 ('참조'이기 때문)
  오브젝트 자체를 binding함
```

var obj={
    point:100
};
obj.getPoint=function(){
    return this.point;
};
obj.getPoint();
```
point와 getPoint는 프로퍼티 이름,
100과 function Object는 값(value)

getPoint()호출
  - 실행콘텍스트
     - 렉시컬 : ...
     - 외부:...
     - 변수:...
     - this 바인딩 컴포넌트 => getPoint()에서 this로 
       obj의 프로퍼티를 사용할 수 있도록 바인딩(오브젝트를 바인딩)
  - 초기화 단계
     - 파라미터, 함수, 선언문, 변수 선언없음 pass
  - 실행 단계
    return this.point; 실행
     => this바인딩 컴포넌트 가서 찾는다.
     => this는 언제나 최신값이다. 

`/**  obj.getPoint()에서 obj의 프로퍼티가 this바인딩 컴포넌트에 바인딩되록 의도적으로 설계해야함 */``

/*

      ✔this로 인스턴스 참조 

    - this를 이용하여, 메소드를 호출한 인스턴스 참조
    - var obj = new Book();
      obj.get()를 호출하면 get메소드 안에서 this로 obj를 참조한다
      (즉, get앞에 있는 obj를 참조한다)

     ✔인스턴스안에서 메소드를 호출하는 방법
       - Book.prototype에 연결된 메소드가 __proto__에 설정되면 인스턴스 프로퍼티가 된다.
       - this.prototype.setPoint()형태가 아닌 this.setPoint()형태로 호출 
         이 때 this는 obj를 참조한다. 

*/

function Book(){
  console.log("1:",this.point);
}
Book.prototype.getPoint=function(){
  this.setPoint();
  console.log("2: ",this.setPoint);
};
Book.prototype.setPoint=function(){
  this.point=100;
};
var obj=new Book();
obj.getPoint();
