package com.mamoorie.mytraview.preferences.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.mamoorie.mytraview.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtTokenProvider {
	
    final static String SECRET_KEY = "dlrjqjsdurgksmstkfkaqkqhdlazz";

    public String makeJwtToken(User user) {
        Date revalidated = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));


        return Jwts.builder().signWith(SignatureAlgorithm.HS512, String.valueOf(SECRET_KEY)).setSubject(user.getEmail())
                .setIssuer("mytraview app").setIssuedAt(new Date()).setExpiration(revalidated).compact();
    }


    public String validateAndGetEmail(String token) {

        Claims claims = Jwts.parser().setSigningKey(String.valueOf(SECRET_KEY)).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }
}