package execises.ex2;

import java.util.ArrayList;

/*
Compute the most specific signatures for the class A main methods (method1 and method2)
such that the entire program is correct.
If it is not possible to find the types justify your answer.
Discuss line by line the correctness of the above program.
 */

public class App {

    static A method1(ArrayList<? extends A> list) {
        if (list.isEmpty()) return null;
        else return list.get(0);
    }

    static void method2(ArrayList<? super C> list, C elem) {

        list.add(elem);
    }

    static void method3(C elem) {
        ArrayList<A> listA = new ArrayList<A>();
        listA.add(new A());
        ArrayList<B> listB = new ArrayList<B>();
        listB.add(new B());
        ArrayList<C> listC = new ArrayList<C>();
        listC.add(new C());

        System.out.println(method1(listA));
        System.out.println(method1(listB));
        System.out.println(method1(listC));

        method2(listA, elem); System.out.println(listA);
        method2(listB, elem); System.out.println(listB);
        method2(listC, elem); System.out.println(listC);
    }

    public static void main(String[] v){
        method3(new C());
    }
}
