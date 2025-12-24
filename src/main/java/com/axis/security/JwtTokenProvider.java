package com.axis.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    
    public String generateToken(Authentication authentication, Long userId, String userType) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("userId", userId)
                .claim("userType", userType)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    
    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.get("userId").toString());
    }

    
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .build()
                .parseClaimsJws(authToken);
            
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            
            ex.printStackTrace();
        }
        return false;
    }
}