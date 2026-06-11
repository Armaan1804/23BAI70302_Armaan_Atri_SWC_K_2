public class Task1 {
    public static void main(String[] args) {
        // Thread A: Prints a countdown from 10 to 1 with a 1-second delay
        Thread threadA = new Thread(() -> {
            for (int i = 10; i >= 1; i--) {
                System.out.println(i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.err.println("Thread A was interrupted: " + e.getMessage());
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        });

        // Thread B: Prints "blast off" as soon as Thread A finishes using join()
        Thread threadB = new Thread(() -> {
            try {
                // Wait for Thread A to finish
                threadA.join();
                System.out.println("blast off");
            } catch (InterruptedException e) {
                System.err.println("Thread B was interrupted: " + e.getMessage());
                Thread.currentThread().interrupt();
            }
        });

        // Start both threads
        threadA.start();
        threadB.start();
    }
}
