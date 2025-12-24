package com.axis.security;

import com.axis.model.Usuario;
import com.axis.repository.UsuarioRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getSenhaHash(),
                getAuthorities(usuario)
        );
    }

    @Transactional
    public UserDetails loadUserById(Long id) throws ResourceNotFoundException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        return new org.springframework.security.core.userdetails.User(
                usuario.getEmail(),
                usuario.getSenhaHash(),
                getAuthorities(usuario)
        );
    }

    private List<GrantedAuthority> getAuthorities(Usuario usuario) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        
        if (usuario.getTipo() != null) {
            String tipo = usuario.getTipo().toString();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + tipo));

            
            if ("ADMINISTRADOR".equals(tipo)) {
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            }

            
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            
        }

        return authorities;
    }
}