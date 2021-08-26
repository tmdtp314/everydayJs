function book(){ //실행 콘텍스트가 생성됨 하나의 덩어리 안에서 함수가 실행될 수 있도록. 
    var point = 123; 
    function show(){
        var title="js책";
        //getPoint();
        //this.bookAmount

    };
    function getPoint(){
        return point;
    };
    show();
}
book();

/*
실행 콘텍스트 안에다가 함수에서 구할 수 있는 덩어리를 만들어 놓은 것. (환경)

show 실행 콘텍스트:{
    렉시컬 환경 컴포넌트:{

        환경 레코드:{
             선언적 환경 레코드{ title:"JS책" },
             오브젝트 환경 레코드{}
        },
        외부 렉시컬 환경 참조:{
            point:123,
            getPoint:function(){}
        }
       
    },
    변수 환경 컴포넌트:{},
    this 바인딩 컴포넌트:{
        글로벌 오브젝트(window)
        (this로 참조할 object를 바인딩 하는 작업)
    }
}


show가 속한 범위를 scope에 설정
scope에 설정된 것을 외부 렉시컬 환경 참조에 설정(var point, getPoing)
저게 하나의 context(덩어리)
함수 밖에 있는 것도 가져다 쓸 수 있다. 
 */


/* *******렉시컬 개념 정리*********
function 키워드를 만나면 show Function 오브젝트 생성 시에 이미 scope가 설정 된다. 
함수를 호출했을 때 scope를 만들면 동적 환경 컴포넌트일것이다
*/

/**********식별자 해결********** */
/**
 * 사용할 변수/함수를 결정하는 것
 */
var point =100; // <-----2. 포인트변수2
function getPoint(){
    var point = 200; // <---1. 포인트변수1
    return point;
};
var result = getPoint(); //getPoint함수를 호출하게 되면 1.로 이동한다. 200반환
                         //var point가 스코브 변수임. 
                        // 스코프 변수에서 제일 먼저 찾는다. 그래서 200을 반환하는 것임. 
                        // 스코프에서 설정된 이름은 변경되지 않는다. 값은 바뀐다. 
                        // 따라서 식별자 해결 대상은 ******이름****** 이다. 
console.log(result)

//식별자가 유일하면 스코프는 필요하지 않다. 이름이 중복 될 때 필요한 개념이다. 
/*********식별자 해결을위해 스코프를 사용하는 거지!! 스코프가 목적이 아니다!!! 주객전도 하지 말자 ***********/


/*ES3의 scope chain
  {name:value} 형태로 설정
  함수가 새로 생길 때마다 동적으로 처리된다.  
  scope chain은 es5에 없다
  동적환경보다 정적 환경이 빠르다. (정적 환경에서 찾는 것이 빠르다)
*/

/*
     함수가 호출 될 때 context하나만 올라가면 된다. --> 빠름

     여기에 맞춰서 코드를 작성해주기만 하면 됨
*/