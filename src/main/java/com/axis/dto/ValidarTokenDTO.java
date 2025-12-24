package com.axis.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidarTokenDTO {

    @NotBlank(message = "Token é obrigatório")
    private String token;
}
