import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Task2 {
    private static final String FILE_PATH = "massive_text.txt";
    private static final String TARGET_WORD = "banana";

    public static void main(String[] args) {
        try {
            System.out.println("Generating sample text file with 30 lines...");
            createSampleFile(FILE_PATH, TARGET_WORD);

            int totalLines = countLines(FILE_PATH);
            System.out.println("Total lines in file: " + totalLines);

       
            int chunkSize = totalLines / 3;
            
            
            int start1 = 1;
            int end1 = chunkSize;

            int start2 = end1 + 1;
            int end2 = 2 * chunkSize;

            int start3 = end2 + 1;
            int end3 = totalLines; 

            System.out.println("Dividing workload into 3 independent chunks:");
            System.out.println("Thread 1: Lines " + start1 + " to " + end1);
            System.out.println("Thread 2: Lines " + start2 + " to " + end2);
            System.out.println("Thread 3: Lines " + start3 + " to " + end3);
            System.out.println("----------------------------------------------");

  
            SearchTask task1 = new SearchTask("Thread-1", FILE_PATH, TARGET_WORD, start1, end1);
            SearchTask task2 = new SearchTask("Thread-2", FILE_PATH, TARGET_WORD, start2, end2);
            SearchTask task3 = new SearchTask("Thread-3", FILE_PATH, TARGET_WORD, start3, end3);

           
            Thread thread1 = new Thread(task1);
            Thread thread2 = new Thread(task2);
            Thread thread3 = new Thread(task3);

            thread1.start();
            thread2.start();
            thread3.start();

    
            thread1.join();
            thread2.join();
            thread3.join();

            System.out.println("----------------------------------------------");
            System.out.println("All threads have completed search. Program finished.");

        } catch (IOException | InterruptedException e) {
            System.err.println("An error occurred during execution: " + e.getMessage());
        }
    }

  
    private static void createSampleFile(String filePath, String targetWord) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (int i = 1; i <= 30; i++) {
                if (i == 7) {
                    writer.write("Line " + i + ": Monkeys love eating a sweet yellow " + targetWord + ".");
                } else if (i == 15) {
                    writer.write("Line " + i + ": A single " + targetWord + " contains key nutrients.");
                } else if (i == 28) {
                    writer.write("Line " + i + ": The word is written here: " + targetWord + ".");
                } else {
                    writer.write("Line " + i + ": Just a normal line containing random words.");
                }
                writer.newLine();
            }
        }
    }

  
    private static int countLines(String filePath) throws IOException {
        int lines = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            while (reader.readLine() != null) {
                lines++;
            }
        }
        return lines;
    }

   
    static class SearchTask implements Runnable {
        private final String threadName;
        private final String filePath;
        private final String targetWord;
        private final int startLine;
        private final int endLine;

        public SearchTask(String threadName, String filePath, String targetWord, int startLine, int endLine) {
            this.threadName = threadName;
            this.filePath = filePath;
            this.targetWord = targetWord;
            this.startLine = startLine;
            this.endLine = endLine;
        }

        @Override
        public void run() {
            // Compile a regex pattern to find target word with boundaries, case-insensitively
            Pattern pattern = Pattern.compile("\\b" + Pattern.quote(targetWord) + "\\b", Pattern.CASE_INSENSITIVE);

            try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
                // Skip lines up to the start of this thread's chunk
                for (int i = 1; i < startLine; i++) {
                    reader.readLine();
                }

                String line;
                int currentLine = startLine;

                // Search through the assigned line range
                while (currentLine <= endLine && (line = reader.readLine()) != null) {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        System.out.println("[" + threadName + "] MATCH FOUND - Line " + currentLine + ": " + line.trim());
                    }
                    currentLine++;
                }
            } catch (IOException e) {
                System.err.println("[" + threadName + "] Error reading file: " + e.getMessage());
            }
        }
    }
}
