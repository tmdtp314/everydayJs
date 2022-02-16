public class Main {
    public static int num =1 ;
    private String msg ="asdf";
    public static void main(String[] args){
      //  Singleton instance1 = Singleton.getInstance("hi");
      //  Singleton instance2 = Singleton.getInstance("Bonjour");
      //  instance1.say();
      //  instance2.say();
      // problemOfSingleton();  // 실행때마다 달라짐 - 왜냐면 동시에 getInstance에 접근하기 때문에 
     // eagerSingleton();
   //  lazySingleton();
     lazyHolderSingleton();

    }
    public static void problemOfSingleton(){
        Runnable run = ()->{
            num++;
            SingletonProblem singleton = SingletonProblem.getInstance(String.valueOf(num));
            System.out.println("instance : "+singleton.getMsg());
        };
        for(int i=0;i<6;i++){
            Thread thread = new Thread(run);
            thread.start();
        }

    }
    public static void eagerSingleton(){
        Runnable run = ()->{
            num++;
            SingletonEager eager = SingletonEager.getInstance();
            System.out.println("instance : "+eager.getMsg());

        };
        for(int i=0;i<7;i++){
            Thread thread = new Thread(run);
            thread.start();
        }
    }
    public static void lazySingleton(){
        Runnable run =()->{
            num++;
            SingletonLazy lazy = SingletonLazy.getInstance(String.valueOf(num));
            System.out.println("instance : "+lazy.getMsg());
        };
        for(int i=0;i<7;i++){

            Thread thread = new Thread(run);
            thread.start();
        }

    }
    public static void lazyHolderSingleton(){
        Runnable run = ()->{
            num++;
            SingletonLazyHolder holder = SingletonLazyHolder.getInstance();
            System.out.println("instance : "+holder.getMsg());
        };
        for(int i=0;i<7;i++){
            Thread thread = new Thread(run);
            thread.start();
        }
    }
}
