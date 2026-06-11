import java.util.concurrent.atomic.AtomicInteger;

public class Task5 {
    public static void main(String[] args) throws InterruptedException {
        AtomicInteger seatsBooked = new AtomicInteger(0);
        Thread[] threads = new Thread[100];

        for (int i = 0; i < 100; i++) {
            final int userId = i + 1;
            threads[i] = new Thread(() -> {
                boolean success = false;
                int seatNumber = 0;
                while (true) {
                    int current = seatsBooked.get();
                    if (current >= 10) {
                        break;
                    }
                    if (seatsBooked.compareAndSet(current, current + 1)) {
                        success = true;
                        seatNumber = current + 1;
                        break;
                    }
                }
                if (success) {
                    System.out.println("User " + userId + " booked seat " + seatNumber);
                } else {
                    System.out.println("User " + userId + " failed to book: Sold out");
                }
            });
        }

        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
    }
}
