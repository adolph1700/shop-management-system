package com.project.SMS.exception;

public class IncorrectPasswordException extends RuntimeException{

    public IncorrectPasswordException(String message)
    {
        super(message);
    }
}
