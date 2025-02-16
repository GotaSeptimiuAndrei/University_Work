package flcd;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class ParserOutput {
    List<String> alphaList = new ArrayList<>();
    Grammar grammar;
    Stack<String> alpha;
    List<TableRow> tree = new ArrayList<>();

    public ParserOutput(Grammar grammar, Stack<String> alpha, String fileName){
        this.grammar = grammar;
        this.alpha = alpha;

        getAlphaAsList();
        var productions = getProductionsString();
        getParsingTable(productions);

        writeTableToFile(fileName);
    }

    public void writeTableToFile(String fileName){
        try
        {
            File file = new File(fileName);
            FileWriter fileWriter = new FileWriter(file);
            BufferedWriter writer = new BufferedWriter(fileWriter);

            writer.write(String.format("%-7s%-15s%-7s%-7s\n", "Index", "Symbol", "Parent", "Right Sibling"));
            tree.forEach(r -> {
                try {
                    writer.write(String.valueOf(r));
                    writer.write("\n");
                } catch (IOException exception) {
                    exception.printStackTrace();
                }
            });
            writer.close();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
    }

    public void getAlphaAsList(){
        while(! alpha.empty()){
            String element = alpha.pop();
            alphaList.add(element);
        }
        Collections.reverse(alphaList);
    }

    public List<Map.Entry<String, List<String>>> getProductionsString(){
        List<Map.Entry<String, List<String>>> productions = new ArrayList<>();

        for(String element: alphaList){
            if(! grammar.getTerminals().contains(element)){
                String[] nonTerminalAndProductionNumber = element.split(" ");
                String currentNonTerminal = nonTerminalAndProductionNumber[0];
                int productionNumber = Integer.parseInt(nonTerminalAndProductionNumber[1]);
                List<String> usedProduction = grammar.getProductionsForNonTerminal(currentNonTerminal).get(productionNumber);

                productions.add(new AbstractMap.SimpleEntry<>(currentNonTerminal, usedProduction));
            }
        }

        return productions;
    }

    Integer currentProduction = 0;
    Integer rowIndex = 1;

    public void getParsingTable(List<Map.Entry<String, List<String>>> productions){

        tree.add(new TableRow(0, grammar.getStartingSymbol(), -1, -1));

        buildTreeRec(productions, 0);

        tree.forEach(System.out::println);
    }

    public void buildTreeRec(List<Map.Entry<String, List<String>>> productions, int parent){

        var usedProduction = productions.get(currentProduction);

        List<String> rhs = usedProduction.getValue();
        List<TableRow> auxRows = new ArrayList<>();

        for(int i = 0; i < rhs.size(); i++){
            TableRow row = new TableRow();
            row.setIndex(rowIndex);
            rowIndex++;
            row.setSymbol(rhs.get(i));
            row.setParent(parent);

            if(i < rhs.size() - 1){
                row.setRightSibling(rowIndex);
            }
            else {
                row.setRightSibling(-1);
            }
            auxRows.add(row);
        }

        tree.addAll(auxRows);

        for(TableRow row: auxRows){
            if(grammar.getNonTerminals().contains(row.getSymbol())){
                currentProduction = currentProduction + 1;
                buildTreeRec(productions, row.getIndex());
            }
        }

    }
}
