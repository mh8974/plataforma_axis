package com.axis.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/api/lgpd")
@CrossOrigin(origins = "*") 
public class LgpdController {

    private static final String LGPD_DIR = "LGPD/";

    
    @GetMapping("/termos")
    public ResponseEntity<String> getTermosUso() {
        try {
            String content = readFileFromLgpdDir("TermoUso.txt");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao carregar Termos de Uso: " + e.getMessage());
        }
    }

    
    @GetMapping("/privacidade")
    public ResponseEntity<String> getPoliticaPrivacidade() {
        try {
            String content = readFileFromLgpdDir("PolPrivacidade.txt");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao carregar Política de Privacidade: " + e.getMessage());
        }
    }

    
    private String readFileFromLgpdDir(String filename) throws IOException {
        
        String[] possiblePaths = {
            LGPD_DIR + filename,                    
            "../" + LGPD_DIR + filename,            
            "../../" + LGPD_DIR + filename,         
            "./" + LGPD_DIR + filename              
        };

        
        for (String pathStr : possiblePaths) {
            try {
                Path filePath = Paths.get(pathStr);
                if (Files.exists(filePath)) {
                    return Files.readString(filePath, StandardCharsets.UTF_8);
                }
            } catch (Exception e) {
                
            }
        }

        
        try {
            Resource resource = new ClassPathResource(LGPD_DIR + filename);
            if (resource.exists()) {
                return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            
        }

        
        try {
            String workingDir = System.getProperty("user.dir");
            Path absolutePath = Paths.get(workingDir, LGPD_DIR + filename);
            if (Files.exists(absolutePath)) {
                return Files.readString(absolutePath, StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            
        }

        throw new IOException("Arquivo não encontrado: " + filename + ". Tentado em múltiplos caminhos.");
    }
}
