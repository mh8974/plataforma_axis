package com.axis.controller;

import com.axis.dto.TerapeutaDTO;
import com.axis.dto.TerapeutaDetalhadoDTO;
import com.axis.dto.PageResponse;
import com.axis.model.StatusCadastro;
import com.axis.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/admin/terapeutas")
public class AdminController {

    @Autowired
    private AdminService adminService;

    
    @GetMapping
    public ResponseEntity<List<TerapeutaDTO>> listarTerapeutas(
            @RequestParam(required = false) String status) {

        List<TerapeutaDTO> terapeutas;

        if (status == null || status.isEmpty()) {
            
            terapeutas = adminService.listarTodosTerapeutas();
        } else {
            
            try {
                StatusCadastro statusEnum = StatusCadastro.valueOf(status.toUpperCase());
                terapeutas = adminService.listarTerapeutasPorStatus(statusEnum);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        }

        return ResponseEntity.ok(terapeutas);
    }

    
    @GetMapping("/paginado")
    public ResponseEntity<PageResponse<TerapeutaDTO>> listarTerapeutasPaginado(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String busca,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDir,
            @RequestParam(required = false) String statusPerfil) {

        PageResponse<TerapeutaDTO> response = adminService.listarTerapeutasPaginado(page, size, status, busca, sortBy, sortDir, statusPerfil);
        return ResponseEntity.ok(response);
    }

    
    @PostMapping("/{id}/aprovar")
    public ResponseEntity<TerapeutaDTO> aprovarTerapeuta(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Long adminId;
        try {
            adminId = Long.parseLong(body.get("adminId"));
        } catch (NumberFormatException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }

        String feedback = body.get("feedback");

        if (feedback == null || feedback.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        TerapeutaDTO terapeutaAprovado = adminService.aprovarTerapeuta(id, adminId, feedback);
        return ResponseEntity.ok(terapeutaAprovado);
    }

    
    @PutMapping("/{id}/feedback")
    public ResponseEntity<TerapeutaDTO> atualizarFeedback(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Long adminId;
        try {
            adminId = Long.parseLong(body.get("adminId"));
        } catch (NumberFormatException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }

        String feedback = body.get("feedback");

        if (feedback == null || feedback.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        TerapeutaDTO terapeutaAtualizado = adminService.atualizarFeedbackEntrevista(id, adminId, feedback);
        return ResponseEntity.ok(terapeutaAtualizado);
    }

    
    @PostMapping("/{id}/reprovar")
    public ResponseEntity<TerapeutaDTO> reprovarTerapeuta(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Long adminId;
        try {
            adminId = Long.parseLong(body.get("adminId"));
        } catch (NumberFormatException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }

        String motivo = body.get("motivo");

        if (motivo == null || motivo.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        TerapeutaDTO terapeutaReprovado = adminService.reprovarTerapeuta(id, adminId, motivo);
        return ResponseEntity.ok(terapeutaReprovado);
    }

    
    @GetMapping("/pendentes")
    public ResponseEntity<List<TerapeutaDTO>> listarPendentes() {
        List<TerapeutaDTO> terapeutasPendentes = adminService.listarTerapeutasPendentes();
        return ResponseEntity.ok(terapeutasPendentes);
    }

    
    @GetMapping("/{id}/detalhes")
    public ResponseEntity<TerapeutaDetalhadoDTO> buscarDetalhes(@PathVariable Long id) {
        TerapeutaDetalhadoDTO detalhes = adminService.buscarTerapeutaDetalhado(id);
        return ResponseEntity.ok(detalhes);
    }
}
