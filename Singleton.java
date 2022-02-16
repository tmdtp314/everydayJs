public class Singleton {
    private static Singleton instance ; // 외부에서 직접 인스턴스를 생성할 수 없도록 함. 
    private String msg;
    private Singleton(String msg){
        //생성자 외부에서 호출x게끔 private변수로 생성 
        this.msg=msg;
    }
    public static Singleton getInstance(String msg){ // 객체는 오로지 getInstance()를 통해서만 생성되거나 얻을 수 있다. 
        if(instance==null){
            instance=new Singleton(msg);
        }
        return instance;
    }
    public void say(){
        System.out.println(msg);
    }
}


//1. 인스턴스를 오직 한개로 가져간다
//2. 이럴 경우 메모리 측면에서 유리하다. 
//3. 다른클래스 간에 데이터 공유가 쉽다. (싱글톤 인스턴스가 전역변수이기 때문) - but 이 경우 동시성 문제(여러 클래스에서 싱글톤 인스턴스에 동시접근 할 경우 충돌)가 발생할수 있으니 유의 
//이미 생성된 인스턴스를 활용하니 속도 측면에서도 이점이있다.


// sycronized 키워드를 적절하게 잘 사용해야 한다. 
