package com.axis.exception;

public class EmailJaCadastradoException extends RuntimeException {
    public EmailJaCadastradoException(String email) {
        super("Email já está cadastrado: " + email);
    }
}
