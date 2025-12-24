package com.axis.controller;

import com.axis.dto.PacienteDTO;
import com.axis.dto.PacienteRequestDTO;
import com.axis.model.Paciente;
import com.axis.service.PacienteService;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {
    @Autowired
    private PacienteService pacienteService;

    
    @PostMapping
    public ResponseEntity<PacienteDTO> criarPaciente(@Valid @RequestBody PacienteRequestDTO request) {
        PacienteDTO novoPaciente = pacienteService.criarPaciente(request);
        return new ResponseEntity<>(novoPaciente, HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<PacienteDTO> obterPacientePorId(@PathVariable Long id) {
        Paciente paciente = pacienteService.obterPacientePorId(id);
        PacienteDTO pacienteDTO = pacienteService.converterParaDTO(paciente);
        return new ResponseEntity<>(pacienteDTO, HttpStatus.OK);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<PacienteDTO> atualizarPaciente(@PathVariable Long id, @Valid @RequestBody PacienteRequestDTO request) {
        PacienteDTO paciente = pacienteService.atualizarPaciente(id, request);
        return new ResponseEntity<>(paciente, HttpStatus.OK);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPaciente(@PathVariable Long id) {
        pacienteService.deletarPaciente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}