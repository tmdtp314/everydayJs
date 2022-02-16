public class SingletonEager { 
    private static SingletonEager instance = new SingletonEager("a"); //Eager initailization 이른초기화 - static특징 이용 초기화하는 시점에 인스턴스를 메모리에 등록하는 방법
    private String msg;

    private SingletonEager(String msg){
        try{
            Thread.sleep(100);
            this.msg=msg;
        }
        catch(InterruptedException e){
            e.printStackTrace();
        }
    }
    public static SingletonEager getInstance(){
        return instance; 
    }
    public String getMsg(){
        return msg; 
    }
    
}
