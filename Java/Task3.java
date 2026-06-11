class PiggyBank {
    private int balance = 0;

    public void addUnsynchronized() {
        balance++;
    }

    public synchronized void addSynchronized() {
        balance++;
    }

    public int getBalance() {
        return balance;
    }

    public void reset() {
        balance = 0;
    }
}

public class Task3 {
    public static void main(String[] args) throws InterruptedException {
        PiggyBank bank = new PiggyBank();

        Thread[] threads = new Thread[5];
        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 2000; j++) {
                    bank.addUnsynchronized();
                }
            });
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        System.out.println("Unsynchronized balance: " + bank.getBalance());

        bank.reset();

        for (int i = 0; i < 5; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < 2000; j++) {
                    bank.addSynchronized();
                }
            });
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }
        System.out.println("Synchronized balance: " + bank.getBalance());
    }
}
