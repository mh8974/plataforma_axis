package com.axis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetSenhaRequestDTO {

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;
}
