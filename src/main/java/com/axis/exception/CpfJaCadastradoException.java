package com.axis.exception;

public class CpfJaCadastradoException extends RuntimeException {
    public CpfJaCadastradoException(String cpf) {
        super("CPF já está cadastrado");
    }
}
