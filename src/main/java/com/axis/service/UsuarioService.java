package com.axis.service;

import com.axis.dto.UsuarioDTO;
import com.axis.dto.QuestionarioInicialDTO;
import com.axis.model.Usuario;
import com.axis.model.Role;
import com.axis.repository.UsuarioRepository;
import com.axis.repository.TerapeutaRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TerapeutaRepository terapeutaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public Usuario criarUsuario(Usuario usuario, String senha) {
        
        if (emailExiste(usuario.getEmail())) {
            throw new ResourceNotFoundException("Email já cadastrado: " + usuario.getEmail());
        }
        
        
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuario.getNome());
        novoUsuario.setEmail(usuario.getEmail());
        novoUsuario.setTipo(usuario.getTipo() != null ? usuario.getTipo() : Role.PACIENTE);
        
        
        if (novoUsuario.getDataCriacao() == null) {
            novoUsuario.setDataCriacao(LocalDateTime.now());
        }
        if (novoUsuario.getDataAtualizacao() == null) {
            novoUsuario.setDataAtualizacao(LocalDateTime.now());
        }
        if (novoUsuario.getAtivo() == null) {
            novoUsuario.setAtivo(true);
        }
        
        
        if (senha == null || senha.isEmpty()) {
            throw new IllegalArgumentException("Senha não pode ser nula ou vazia");
        }
        String senhaCodificada = passwordEncoder.encode(senha);
        novoUsuario.setSenhaHash(senhaCodificada);
        
        return usuarioRepository.save(novoUsuario);
    }

    
    public Usuario obterUsuarioPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));
    }

    
    public List<UsuarioDTO> listarTodosUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = obterUsuarioPorId(id);
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setTipo(usuarioAtualizado.getTipo());
        usuario.setAtivo(usuarioAtualizado.getAtivo());
        usuario.setDataAtualizacao(java.time.LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    
    public void deletarUsuario(Long id) {
        Usuario usuario = obterUsuarioPorId(id);
        usuarioRepository.delete(usuario);
    }

    
    public boolean emailExiste(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    
    public UsuarioDTO criarUsuarioProfissional(QuestionarioInicialDTO request) {
        
        if (emailExiste(request.getEmail())) {
            throw new com.axis.exception.EmailJaCadastradoException(request.getEmail());
        }

        
        String cpfLimpo = request.getCpf().replaceAll("[^0-9]", "");
        if (cpfExisteEmUsuarios(cpfLimpo)) {
            throw new com.axis.exception.CpfJaCadastradoException(cpfLimpo);
        }

        
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNomeCompleto());
        usuario.setEmail(request.getEmail());
        usuario.setTipo(Role.TERAPEUTA); 
        usuario.setTelefone(request.getTelefone());
        usuario.setCpf(cpfLimpo);
        usuario.setAtivo(true);
        usuario.setStatusPerfil("INCOMPLETO"); 
        usuario.setDataCriacao(LocalDateTime.now());
        usuario.setDataAtualizacao(LocalDateTime.now());

        
        String senhaCodificada = passwordEncoder.encode(request.getSenha());
        usuario.setSenhaHash(senhaCodificada);

        
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        
        return converterParaDTO(usuarioSalvo);
    }

    
    public UsuarioDTO criarUsuarioPaciente(QuestionarioInicialDTO request) {
        
        if (emailExiste(request.getEmail())) {
            throw new com.axis.exception.EmailJaCadastradoException(request.getEmail());
        }

        
        String cpfLimpo = request.getCpf().replaceAll("[^0-9]", "");
        if (cpfExisteEmUsuarios(cpfLimpo)) {
            throw new com.axis.exception.CpfJaCadastradoException(cpfLimpo);
        }

        
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNomeCompleto());
        usuario.setEmail(request.getEmail());
        usuario.setTipo(Role.PACIENTE); 
        usuario.setTelefone(request.getTelefone());
        usuario.setCpf(cpfLimpo);
        usuario.setAtivo(true);
        usuario.setStatusPerfil("INCOMPLETO"); 
        usuario.setDataCriacao(LocalDateTime.now());
        usuario.setDataAtualizacao(LocalDateTime.now());

        
        String senhaCodificada = passwordEncoder.encode(request.getSenha());
        usuario.setSenhaHash(senhaCodificada);

        
        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        
        return converterParaDTO(usuarioSalvo);
    }

    
    private boolean cpfExisteEmUsuarios(String cpf) {
        return usuarioRepository.findByCpf(cpf).isPresent();
    }

    
    public UsuarioDTO converterParaDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                null, 
                usuario.getTipo(),
                usuario.getAtivo()
        );
        dto.setCpf(usuario.getCpf());
        return dto;
    }
}