package flcd;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class Grammar {
    private List<String> setOfNonTerminals;
    private List<String> setOfTerminals;
    private String startingSymbol;
    private HashMap<String, List<String>> setOfProductions;
    private String fileName;

    public Grammar(String _fileName){
        fileName = _fileName;
        setOfNonTerminals = new ArrayList<String>();
        setOfTerminals = new ArrayList<String>();
        setOfProductions = new HashMap<>();
        startingSymbol = "";
    }

    private void readGrammarFile() {
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            // Read the first line for non-terminals
            setOfNonTerminals = parseLine(br.readLine());

            // Read the second line for terminals
            setOfTerminals = parseLine(br.readLine());

            // Read the third line for the starting symbol
            startingSymbol = br.readLine();

            // Read the rest for productions
            String line;
            while ((line = br.readLine()) != null) {
                // Split only on the first occurrence of "->"
                int arrowIndex = line.indexOf("->");
                if (arrowIndex != -1) {
                    String nonTerminal = line.substring(0, arrowIndex).trim();
                    String production = line.substring(arrowIndex + 2).trim();

                    // If the non-terminal already has productions, add to the existing list
                    if (setOfProductions.containsKey(nonTerminal)) {
                        setOfProductions.get(nonTerminal).add(production);
                    } else {
                        // Otherwise, create a new list for the non-terminal
                        List<String> productionList = new ArrayList<>();
                        productionList.add(production);
                        setOfProductions.put(nonTerminal, productionList);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<String> parseLine(String line) {
        String[] parts = line.split("\\s+");
        List<String> symbols = new ArrayList<>();
        for (String part : parts) {
            symbols.add(part.trim());
        }
        return symbols;
    }

    public List<String> getSetOfNonterminals(){
        return setOfNonTerminals;
    }

    public List<String> getSetOfTerminals(){
        return setOfTerminals;
    }

    public HashMap<String, List<String>> getSetOfProductions() {
        return setOfProductions;
    }

    public String getStartingSymbol(){
        return startingSymbol;
    }

    public List<String> getProductionsOfNonterminal(String nonterminal){
        return setOfProductions.get(nonterminal);
    }

    public boolean checkCFG(){
        for(String nonterminal: setOfNonTerminals){
            if(setOfProductions.get(nonterminal) == null)
                return false;
        }

        return true;
    }

    public static void main(String[] args) {
        //read from resources
        Grammar grammarReader = new Grammar("src/main/resources/g1.txt");
        grammarReader.readGrammarFile();

        // Access the variables
        System.out.println("Non-terminals: " + grammarReader.getSetOfNonterminals());
        System.out.println("Terminals: " + grammarReader.getSetOfTerminals());
        System.out.println("Starting symbol: " + grammarReader.getStartingSymbol());
        System.out.println("Productions: " + grammarReader.getSetOfProductions());

        if(grammarReader.checkCFG())
            System.out.println("The grammar is a CFG");
        else System.out.println("The grammar is not a CFG");

        System.out.println("Exit: 0");
        while(true){
            Scanner scanner = new Scanner(System.in);
            System.out.println("Please enter a non-terminal: ");

            String nonterminal = scanner.nextLine().trim();
            if(Objects.equals(nonterminal, "0"))
                break;

            System.out.println("The productions for " + nonterminal + " are: " + grammarReader.getProductionsOfNonterminal(nonterminal));
        }

    }
}
