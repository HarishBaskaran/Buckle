package coe.smartapi.deleteWhenEverYouWant;

import javax.sound.sampled.AudioInputStream;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FilterInputStream;
import java.io.*;
import java.nio.file.Files;

sealed interface ArithmeticOperation {
    non-sealed interface Addition extends ArithmeticOperation {
        int addition(int num1, int num2);
    }
    non-sealed interface Subtraction extends ArithmeticOperation {
        int subtraction(int num1, int num2);
    }
}

public interface runner {

    final class arithmeticOperationRunner implements
            ArithmeticOperation.Addition, ArithmeticOperation.Subtraction {
        Reader
        @Override
        public int addition(int num1, int num2) {
            return num1 + num2;
        }

        @Override
        public int subtraction(int num1, int num2) {
            return num1 > num2 ? num1-num2 : num2-num1 ;
        }
    }
    PushbackInputStream
    static void main(String[] args) {
        arithmeticOperationRunner object = new arithmeticOperationRunner();
        System.out.println(object.addition(1, 3));
        System.out.println(object.subtraction(1, 3));
    }

}

/*
    AudioInputStream, ByteArrayInputStream, FileInputStream,
    FilterInputStream, InputStream, ObjectInputStream,
    PipedInputStream, SequenceInputStream, StringBufferInputStream

 */
