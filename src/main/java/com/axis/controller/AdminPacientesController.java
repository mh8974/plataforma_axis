package com.axis.controller;

import com.axis.dto.PacienteDTO;
import com.axis.dto.PacienteDetalhadoDTO;
import com.axis.dto.PageResponse;
import com.axis.service.AdminPacientesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/admin/pacientes")
@PreAuthorize("hasRole('ADMINISTRADOR')")
public class AdminPacientesController {

    @Autowired
    private AdminPacientesService adminPacientesService;

    
    @GetMapping("/paginado")
    public ResponseEntity<PageResponse<PacienteDTO>> listarPacientesPaginado(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String busca,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir,
            @RequestParam(required = false) String statusPerfil) {

        PageResponse<PacienteDTO> response = adminPacientesService.listarPacientesPaginado(
                page, size, busca, sortBy, sortDir, statusPerfil
        );
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("/{id}/detalhes")
    public ResponseEntity<PacienteDetalhadoDTO> buscarDetalhesPaciente(@PathVariable Long id) {
        PacienteDetalhadoDTO detalhes = adminPacientesService.buscarDetalhesPaciente(id);
        return ResponseEntity.ok(detalhes);
    }

    
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> obterEstatisticas() {
        Map<String, Object> estatisticas = adminPacientesService.obterEstatisticas();
        return ResponseEntity.ok(estatisticas);
    }
}
