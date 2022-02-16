public class SingletonLazy {
    private static SingletonLazy instance;
    private String msg; 

    private SingletonLazy(String msg){
        try{
            Thread.sleep(100);
            this.msg=msg;
        }
        catch(InterruptedException e){
            e.printStackTrace();
        }
    }
    public static synchronized SingletonLazy getInstance(String msg){
        if(instance==null){
           // instance = new SingletonLazy(msg); - it costs a lot 
           synchronized(SingletonLazy.class){
               if(instance==null){
                   instance = new SingletonLazy(msg); // If instance is null then approach to the "synchronized block"
               }
           }
        }
        return instance;
    }
    public String getMsg(){
        return msg; 
    }
}
