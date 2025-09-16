package com.selectoverseas.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // disable CSRF for Postman testing
            .authorizeHttpRequests()
            .anyRequest().permitAll();  // allow all endpoints
        return http.build();
    }
}
