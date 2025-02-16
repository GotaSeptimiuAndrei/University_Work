% 7. A player wants to choose the predictions for 4 games. The predictions can be 1, X, 2. Write a predicate
%   to generate all possible variants considering that: last prediction can’t be 2 and no more than two
%   possible predictions X.


prediction(1).
prediction(2).
prediction('X').


% allCombinations(n,i,c) = 
% = c, if i = n
% = allCombinations(n, i + 1, prediction(X) U c), otherwise

% allCombination(N:number, I:number, C: accumulator list, R: result list)
% (i,i,i,o)

allCombinations(N,N,C,C):-!. % de ce nu mergea fara ! ??????/
allCombinations(N,I,C,R):-
    prediction(X),
    NI is I + 1,
    allCombinations(N,NI,[X|C],R).


% checkPrediction(l1l2...ln, countX, last) = 
% = true, if n = 0 and countX <= 2 and last != 1
% = checkPrediction(l2...ln, countX + 1, last), if l1 == 'X'
% = checkPrediction(l2...ln, countX + 1, 1), if l1 == 2
% = checkPrediction(l2...ln, countX, last), if l1 != 2 and l1 != 'X'
% = false, otherwise


% checkPrediction(L:list, C:number, F:number)
% (i,i,o)

checkPrediction([],C,0):-
    C =< 2,
 	!.
checkPrediction([H],C,_):-
    H == 2,
    !,
    checkPrediction([],C,1).
checkPrediction([H|T],C,F):-
    H == 'X',
    C1 is C + 1,
    !,
    checkPrediction(T,C1,F).
checkPrediction([_|T],C,F):-
    checkPrediction(T,C,F).

% oneSol(R:list)
% (o)

oneSol(R):-
    allCombinations(4,0,[],R),
    checkPrediction(R,0,0).

allSols(R):-
    findall(RPartial, oneSol(RPartial),R).