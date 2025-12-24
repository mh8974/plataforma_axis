package com.axis.controller;

import com.axis.dto.TerapeutaDTO;
import com.axis.dto.TerapeutaRequestDTO;
import com.axis.model.Terapeuta;
import com.axis.service.TerapeutaService;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/terapeutas")
public class TerapeutaController {
    @Autowired
    private TerapeutaService terapeutaService;

    
    @PostMapping
    public ResponseEntity<TerapeutaDTO> criarTerapeuta(@Valid @RequestBody TerapeutaRequestDTO request) {
        TerapeutaDTO novoTerapeuta = terapeutaService.criarTerapeuta(request);
        return new ResponseEntity<>(novoTerapeuta, HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<TerapeutaDTO> obterTerapeutaPorId(@PathVariable Long id) {
        Terapeuta terapeuta = terapeutaService.obterTerapeutaPorId(id);
        TerapeutaDTO terapeutaDTO = terapeutaService.converterParaDTO(terapeuta);
        return new ResponseEntity<>(terapeutaDTO, HttpStatus.OK);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<TerapeutaDTO> atualizarTerapeuta(@PathVariable Long id, @RequestBody Terapeuta terapeutaAtualizado) {
        
        Terapeuta terapeuta = terapeutaService.atualizarTerapeuta(id, terapeutaAtualizado);
        TerapeutaDTO terapeutaDTO = terapeutaService.converterParaDTO(terapeuta);
        return new ResponseEntity<>(terapeutaDTO, HttpStatus.OK);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTerapeuta(@PathVariable Long id) {
        terapeutaService.deletarTerapeuta(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}