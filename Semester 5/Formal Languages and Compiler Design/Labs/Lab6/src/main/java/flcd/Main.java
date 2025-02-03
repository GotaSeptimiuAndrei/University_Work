package flcd;

public class Main {
    public static void main(String[] args) {
        Grammar grammar = new Grammar("src/main/resources/g3.txt");
        Parser parser = new Parser(grammar, "x1 a");
        parser.descendingRecursiveParsing();
    }
}