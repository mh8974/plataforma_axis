package com.axis.controller;

import com.axis.dto.UsuarioDTO;
import com.axis.model.Usuario;
import com.axis.model.Role;
import com.axis.service.UsuarioService;
import com.axis.exception.ResourceNotFoundException;
import com.axis.repository.TerapeutaRepository;
import com.axis.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TerapeutaRepository terapeutaRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    
    @PostMapping
    public ResponseEntity<?> criarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            
            if (usuarioService.emailExiste(usuarioDTO.getEmail())) {
                return new ResponseEntity<>("Email já cadastrado: " + usuarioDTO.getEmail(), HttpStatus.BAD_REQUEST);
            }
            
            
            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(usuarioDTO.getNome());
            novoUsuario.setEmail(usuarioDTO.getEmail());
            novoUsuario.setTipo(usuarioDTO.getTipo() != null ? usuarioDTO.getTipo() : Role.PACIENTE);
            
            
            Usuario usuarioCriado = usuarioService.criarUsuario(novoUsuario, usuarioDTO.getSenha());
            return new ResponseEntity<>(usuarioCriado, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao criar usuário: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obterUsuarioPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obterUsuarioPorId(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarTodosUsuarios() {
        List<UsuarioDTO> usuarios = usuarioService.listarTodosUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuario = usuarioService.atualizarUsuario(id, usuarioAtualizado);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        usuarioService.deletarUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    
    @GetMapping("/{id}/status-cadastro")
    public ResponseEntity<?> getStatusCadastro(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.obterUsuarioPorId(id);

            Map<String, Object> status = new HashMap<>();
            status.put("statusPerfil", usuario.getStatusPerfil());
            status.put("tipo", usuario.getTipo().name());

            
            if (usuario.getTipo().name().equals("TERAPEUTA")) {
                boolean possuiPerfil = terapeutaRepository.existsByUsuarioId(id);
                status.put("possuiPerfilEspecifico", possuiPerfil);
                status.put("proximaEtapa", possuiPerfil ? null : "/profissional/informacoes-pessoais");
            } else if (usuario.getTipo().name().equals("PACIENTE")) {
                boolean possuiPerfil = pacienteRepository.existsByUsuarioId(id);
                status.put("possuiPerfilEspecifico", possuiPerfil);
                status.put("proximaEtapa", possuiPerfil ? null : "/paciente/informacoes-pessoais");
            } else {
                
                status.put("possuiPerfilEspecifico", true);
                status.put("proximaEtapa", null);
            }

            return ResponseEntity.ok(status);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao buscar status do cadastro: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}