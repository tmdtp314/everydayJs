public class SingletonLazyHolder {
    private static SingletonLazyHolder instance = new SingletonLazyHolder("asdf");
    private String msg;

    private SingletonLazyHolder(String msg){
        try{
            Thread.sleep(100);
            this.msg=msg;
        }
        catch(InterruptedException e){
            e.printStackTrace();
        }
    }
    private static class Initial {  //Known as the best performance in speed among the other Singleton Patterns
       private static final SingletonLazyHolder instance = new SingletonLazyHolder("msg"); // Preserve instance from allocating values in several times 
    }
       // It's adopting "holder" concept which is made as inner class in the class
       // The inner class's instance will not be initializied until getInstance method is called. And at the same time 'static' instance will be called only one time when 
       // class is loaded, and "final" can preserve instance from being allocated repeatedly. 
    public static SingletonLazyHolder getInstance(){
        return Initial.instance;
    }
    public String getMsg(){
        return msg;
    }
    
}
