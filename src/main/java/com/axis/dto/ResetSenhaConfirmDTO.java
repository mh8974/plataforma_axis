package com.axis.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetSenhaConfirmDTO {

    @NotBlank(message = "Token é obrigatório")
    private String token;

    @NotBlank(message = "Nova senha é obrigatória")
    @Size(min = 8, max = 128, message = "Senha deve ter entre 8 e 128 caracteres")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        message = "Senha deve conter: maiúsculas, minúsculas, números e caracteres especiais (@$!%*?&)"
    )
    private String novaSenha;

    @NotBlank(message = "Confirmação de senha é obrigatória")
    private String confirmarSenha;
}
