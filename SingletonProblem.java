public class SingletonProblem {
    private static SingletonProblem instance;
    private String msg;
    private SingletonProblem(String msg){
        try{
            Thread.sleep(100); // 여기 시간 적게 두면 에러남.
            this.msg=msg;
        }
        catch(InterruptedException e){
            e.printStackTrace();
        }
    }

    public static SingletonProblem getInstance(String msg){
        if(instance==null){ // 쓰레드 동시도착, 여기서 거의 동시에 객체를 생성함
            instance = new SingletonProblem(msg);
        }
        return instance;
    }

    public String getMsg(){
        return msg;
    }
}
