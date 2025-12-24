package com.axis.config;

import com.axis.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) 
            .csrf(csrf -> csrf.disable()) 
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
            )
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/health").permitAll()
                    .requestMatchers("/api/lgpd/**").permitAll()
                    .requestMatchers("/api/cep/**").permitAll()

                    
                    .requestMatchers("/api/questionario-profissional").permitAll()
                    .requestMatchers("/api/profissionais/informacoes-pessoais").permitAll()
                    .requestMatchers("/api/profissionais/cadastro-completo").permitAll()
                    .requestMatchers("/api/profissionais/salvar-progresso").permitAll()
                    .requestMatchers("/api/profissionais/recuperar/**").permitAll()

                    
                    .requestMatchers("/api/questionario-paciente").permitAll()
                    .requestMatchers("/api/pacientes/completar-questionario").permitAll()
                    .requestMatchers("/api/pacientes/salvar-progresso").permitAll()
                    .requestMatchers("/api/pacientes/recuperar/**").permitAll()

                    
                    .requestMatchers("/api/admin/**").hasAnyRole("ADMIN")

                    
                    .anyRequest().authenticated()
            );

        
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "https://portalaxis.com.br"
        ));

        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        
        configuration.setAllowedHeaders(Arrays.asList("*"));

        
        configuration.setAllowCredentials(true);

        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
