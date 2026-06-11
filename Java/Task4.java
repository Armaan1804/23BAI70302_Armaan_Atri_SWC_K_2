public class Task4 {
    public static void main(String[] args) {
        Object knife = new Object();
        Object cuttingBoard = new Object();

        Thread chef1 = new Thread(() -> {
            synchronized (knife) {
                System.out.println("Chef 1 acquired Knife");
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }
                synchronized (cuttingBoard) {
                    System.out.println("Chef 1 acquired Cutting Board");
                }
            }
        });

        Thread chef2 = new Thread(() -> {
            synchronized (cuttingBoard) {
                System.out.println("Chef 2 acquired Cutting Board");
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }
                synchronized (knife) {
                    System.out.println("Chef 2 acquired Knife");
                }
            }
        });

        chef1.start();
        chef2.start();
    }
}
