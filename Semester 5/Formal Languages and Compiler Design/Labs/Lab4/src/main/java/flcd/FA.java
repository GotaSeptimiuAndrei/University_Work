package flcd;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;

public class FA {
    private List<String> states;
    private List<String> alphabet;
    private List<Transition> transitions;
    private String initialState;
    private List<String> outputStates;
    private String filename;

    public FA(String filename) {
        this.filename = filename;
        this.states = new ArrayList<>();
        this.alphabet = new ArrayList<>();
        this.transitions = new ArrayList<>();
        this.initialState = "";
        this.outputStates = new ArrayList<>();
        try {
            init();
        } catch (Exception e) {
            System.out.println("Error when initializingFA");
        }
    }

    private void init() throws Exception {
        var regex = Pattern.compile("^([a-z_]*)=");
        for (String line: Files.readAllLines(Paths.get(filename))) {
            var matcher = regex.matcher(line);
            var match = matcher.find();
            if (matcher.group(0) == null) {
                throw new Exception("Invalid line: " + line);
            }
            switch (matcher.group(0)) {
                case "states=":
                    var statesWithCurlyBrackets = line.substring(line.indexOf("=") + 1);
                    var states = statesWithCurlyBrackets.substring(1, statesWithCurlyBrackets.length() - 1).trim();
                    this.states = List.of(states.split(", *"));
                    break;
                case "alphabet=":
                    var alphabetWithCurlyBrackets = line.substring(line.indexOf("=") + 1);
                    var alphabet = alphabetWithCurlyBrackets.substring(1, alphabetWithCurlyBrackets.length() - 1).trim();
                    this.alphabet = List.of(alphabet.split(", *"));
                    break;
                case "out_states=":
                    var outputStatesWithCurlyBrackets = line.substring(line.indexOf("=") + 1);
                    var outputStates = outputStatesWithCurlyBrackets.substring(1, outputStatesWithCurlyBrackets.length() - 1).trim();
                    this.outputStates = List.of(outputStates.split(", *"));
                    break;
                case "initial_state=":
                    this.initialState = line.substring(line.indexOf("=") + 1).trim();
                    break;
                case "transitions=":
                    var transitionsWithCurlyBrackets = line.substring(line.indexOf("=") + 1);
                    var transitions = transitionsWithCurlyBrackets.substring(1, transitionsWithCurlyBrackets.length() - 1).trim();
                    var transitionsList = List.of(transitions.split("; *"));
                    for (String transition : transitionsList) {
                        if (transition.isBlank() || !transition.startsWith("(") || !transition.endsWith(")")) {
                            throw new Exception("Invalid transition format: " + transition);
                        }

                        var transitionWithoutParentheses = transition.substring(1, transition.length() - 1).trim();
                        var individualValues = List.of(transitionWithoutParentheses.split(", *"));

                        if (individualValues.size() != 3 || individualValues.get(0).isBlank() || individualValues.get(1).isBlank()) {
                            throw new Exception("Invalid transition format: " + transition);
                        }

                        String label = individualValues.get(2);
                        if (label.isBlank()) {
                            throw new Exception("Transition missing label: " + transition);
                        }

                        this.transitions.add(new Transition(individualValues.get(0), individualValues.get(1), label));
                    }
                    break;

                default:
                    throw new Exception("Invalid line in file");
            }
        }
    }


    private void printListOfString(String listname, List<String> list) {
        System.out.print(listname + " = {");
        for (int i = 0; i < list.size(); i++) {
            if (i != list.size() - 1) {
                System.out.print(list.get(i) + ", ");
            } else {
                System.out.print(list.get(i));
            }
        }
        System.out.println("}");
    }

    public void printStates() {
        printListOfString("states", states);
    }

    public void printAlphabet() {
        printListOfString("alphabet", alphabet);
    }

    public void printOutputStates() {
        printListOfString("out_states", outputStates);
    }

    public void printInitialState() {
        System.out.println("initial_state = " + initialState);
    }

    public void printTransitions() {
        System.out.print("transitions = {");
        for (int i = 0; i < transitions.size(); i++) {
            if (i != transitions.size() - 1) {
                System.out.print("(" + transitions.get(i).getFrom() + ", " + transitions.get(i).getTo() + ", " + transitions.get(i).getLabel() + "); ");
            } else {
                System.out.print("(" + transitions.get(i).getFrom() + ", " + transitions.get(i).getTo() + ", " + transitions.get(i).getLabel() + ")");
            }
        }
        System.out.println("}");
    }

    public boolean checkAccepted(String word) {
        List<String> wordAsList = List.of(word.split(""));
        Set<String> currentStates = epsilonClosure(initialState);

        for (String c : wordAsList) {
            Set<String> nextStates = new HashSet<>();

            for (String state : currentStates) {
                for (Transition transition : transitions) {
                    if (transition.getFrom().equals(state) && transition.getLabel().equals(c)) {
                        nextStates.addAll(epsilonClosure(transition.getTo()));
                    }
                }
            }

            if (nextStates.isEmpty()) {
                return false; // No valid transition for this character
            }

            currentStates = nextStates;
        }

        // Check if any current state is an output state
        for (String state : currentStates) {
            if (outputStates.contains(state)) {
                return true;
            }
        }

        return false;
    }


    public boolean isDeterministic() {
        Map<String, Set<String>> transitionMap = new HashMap<>();
        for (Transition transition : transitions) {
            String key = transition.getFrom() + "_" + transition.getLabel();
            transitionMap.putIfAbsent(key, new HashSet<>());
            transitionMap.get(key).add(transition.getTo());
        }

        for (Map.Entry<String, Set<String>> entry : transitionMap.entrySet()) {
            if (entry.getValue().size() > 1) {
                return false; // Non-deterministic if multiple transitions exist for the same (state, label)
            }
        }
        return true; // All transitions are deterministic
    }

    private Set<String> epsilonClosure(String state) {
        Set<String> closure = new HashSet<>();
        Stack<String> stack = new Stack<>();
        stack.push(state);

        while (!stack.isEmpty()) {
            String currentState = stack.pop();
            closure.add(currentState);
            for (Transition transition : transitions) {
                if (transition.getFrom().equals(currentState) && transition.getLabel().equals("ε") && !closure.contains(transition.getTo())) {
                    stack.push(transition.getTo());
                }
            }
        }

        return closure;
    }


}
