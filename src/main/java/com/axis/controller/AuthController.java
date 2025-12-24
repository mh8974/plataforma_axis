package com.axis.controller;

import com.axis.dto.LoginDTO;
import com.axis.dto.AuthResponseDTO;
import com.axis.dto.UsuarioDTO;
import com.axis.model.Usuario;
import com.axis.service.AuthService;
import com.axis.security.JwtTokenProvider;
import com.axis.exception.ResourceNotFoundException;
import com.axis.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
        try {
            
            Usuario usuario = authService.authenticateAndGetUser(loginDto);

            
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String token = jwtTokenProvider.generateToken(authentication, usuario.getId(), usuario.getTipo().name());

            
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(usuario.getId());
            usuarioDTO.setNome(usuario.getNome());
            usuarioDTO.setEmail(usuario.getEmail());
            usuarioDTO.setTipo(usuario.getTipo());
            usuarioDTO.setAtivo(usuario.getAtivo());
            usuarioDTO.setStatusPerfil(usuario.getStatusPerfil());

            
            AuthResponseDTO response = new AuthResponseDTO(token, usuarioDTO);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", "USER_NOT_FOUND");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (BadRequestException e) {
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", "INVALID_PASSWORD");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro interno no servidor. Tente novamente mais tarde.");
            errorResponse.put("errorType", "INTERNAL_ERROR");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}