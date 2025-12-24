package com.axis.controller;

import com.axis.dto.CepConsultaResponseDTO;
import com.axis.service.CepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;


@RestController
@RequestMapping("/api/cep")
@CrossOrigin(origins = "*")
public class CepController {

    @Autowired
    private CepService cepService;

    
    @GetMapping("/consultar")
    public ResponseEntity<CepConsultaResponseDTO> consultarCep(
        @RequestParam String cep,
        @RequestParam(required = false) String modalidade,
        @RequestParam(required = false) BigDecimal latitudeGPS,
        @RequestParam(required = false) BigDecimal longitudeGPS
    ) {
        
        CepConsultaResponseDTO resultado = cepService.buscarOuCriarCep(
            cep,
            modalidade,
            latitudeGPS,
            longitudeGPS
        );

        return ResponseEntity.ok(resultado);
    }
}
