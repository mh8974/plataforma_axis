package com.axis.service;

import com.axis.dto.LoginDTO;
import com.axis.model.Usuario;
import com.axis.repository.UsuarioRepository;
import com.axis.exception.BadRequestException;
import com.axis.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    
    public String authenticateUser(LoginDTO loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getSenha()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        
        Usuario usuario = usuarioRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new BadRequestException("Usuário não encontrado"));

        
        return jwtTokenProvider.generateToken(authentication, usuario.getId(), usuario.getTipo().name());
    }

    
    public Usuario authenticateAndGetUser(LoginDTO loginDto) {
        
        Usuario usuario = usuarioRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new com.axis.exception.ResourceNotFoundException("Usuário não encontrado"));

        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getSenha()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            return usuario;
        } catch (org.springframework.security.core.AuthenticationException e) {
            
            throw new BadRequestException("A senha que você digitou está incorreta");
        }
    }
}