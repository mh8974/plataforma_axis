package com.axis.exception;

public class CrpJaCadastradoException extends RuntimeException {
    public CrpJaCadastradoException(String crp) {
        super("CRP já está cadastrado");
    }
}
