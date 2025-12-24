package com.axis.model;


public enum AcaoResetSenha {
    SOLICITACAO,
    VALIDACAO_TOKEN,
    ALTERACAO_SENHA,
    TENTATIVA_INVALIDA,
    RATE_LIMIT_ATINGIDO,
    TOKEN_EXPIRADO,
    TOKEN_JA_USADO
}
