package pdp;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Main {
    public static Integer a, b, c;
    public static Integer functionType;
    public static Integer taskNumber;
    public static Matrix matrix1;
    public static Matrix matrix2;

    /**
     * a = number of rows in the first matrix
     * b = number of columns in the first matrix and number of rows in the second matrix
     * c = number of columns in the second matrix
     */
    public static void getParams() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("a: ");
        a = scanner.nextInt();
        System.out.println("b: ");
        b = scanner.nextInt();
        System.out.println("c: ");
        c = scanner.nextInt();
        System.out.println("function type:");
        System.out.println("0. Task");
        System.out.println("1. Pool");
        functionType = scanner.nextInt();
        System.out.println("Enter the number of the tasks:");
        taskNumber = scanner.nextInt();
        generateMatrix();
    }

    public static void generateMatrix() {
        matrix1 = new Matrix(a, b);
        matrix2 = new Matrix(b, c);
    }

    public static Matrix productByTasks() throws InterruptedException {
        Integer[][] result = new Integer[a][c];
        List<Thread> threads = new ArrayList<>();
        int totalCells = a * c;
        int baseCellsPerThread = totalCells / taskNumber;
        int remainderCells = totalCells % taskNumber;

        int start = 0;
        for (int i = 0; i < taskNumber; i++) {
            int cellsForThisThread = baseCellsPerThread + (i < remainderCells ? 1 : 0); // add one extra cell for threads covering remainders
            int end = start + cellsForThisThread;
            threads.add(new Thread(new RowThread(result, start, end)));
            start = end; // update start for the next thread
        }

        for (Thread thread : threads) {
            thread.start();
        }
        for (Thread thread : threads) {
            thread.join();
        }
        return new Matrix(result);
    }

    public static Matrix productByThreadPool() throws InterruptedException {
        ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(taskNumber);
        Integer[][] result = new Integer[a][c];
        List<Runnable> tasks = new ArrayList<>();
        int totalCells = a * c;
        int baseCellsPerThread = totalCells / taskNumber;
        int remainderCells = totalCells % taskNumber;

        int start = 0;
        for (int i = 0; i < taskNumber; i++) {
            int cellsForThisTask = baseCellsPerThread + (i < remainderCells ? 1 : 0); // add one extra cell for tasks covering remainders
            int end = start + cellsForThisTask;
            tasks.add(new RowThread(result, start, end));
            start = end; // update start for the next task
        }

        for (Runnable task : tasks) {
            executor.execute(task);
        }
        executor.shutdown();
        while (!executor.awaitTermination(1, TimeUnit.DAYS)) {
            System.out.println("Not yet. Still waiting for termination");
        }
        return new Matrix(result);
    }


    public static void main(String[] args) throws InterruptedException {
        while (true) {
            getParams();
            Matrix trueProduct = Matrix.getProduct(matrix1, matrix2);
            Matrix computedProduct;
            double startTime = System.nanoTime();
            if (functionType == 0) {
                computedProduct = productByTasks();
            } else {
                computedProduct = productByThreadPool();
            }
            double endTime = System.nanoTime();
            System.out.println("Elapsed time: " + (endTime - startTime) / 1_000_000_000.0);
            if (trueProduct.equals(computedProduct)) {
                System.out.println("Correct");
            } else {
                System.out.println("Incorrect");
            }
        }
    }
}