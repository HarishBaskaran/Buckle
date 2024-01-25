package coe.smartapi.deleteWhenEverYouWant;

import org.apache.commons.logging.impl.WeakHashtable;
import org.hibernate.Transaction;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Stream;

public sealed class FinalSealedClass permits Subclass1, Subclass2 {
    public static void main(String[] args) {

    }
}

final class Subclass1 extends FinalSealedClass {

}

final class Subclass2 extends FinalSealedClass {

}

/*

 */
