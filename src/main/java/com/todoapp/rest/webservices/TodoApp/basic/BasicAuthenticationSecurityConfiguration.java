package com.todoapp.rest.webservices.TodoApp.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class BasicAuthenticationSecurityConfiguration {
    // Filter Chain 설정
    // 모든 인증 요청을 인증하게 되는데
    // 모든 요청에 대한 기본적인 인증을 사용함
    // CSRF 비활성화 -> Session이 전혀 없도록 하기 위해서
    // Session이 있으려면 반드시 CSRF 활성화
    // 즉 Stateless REST API를 만들려고 하는 것
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 프리플라이트 요청에 대한 액세스 허용
                                .anyRequest().authenticated()
                ) // 모든 http 요청이 인증되야 한다.
                .httpBasic(Customizer.withDefaults()) // http 기본 인증을 설정해서 기본 인증으로 설정한다.
                .sessionManagement(                   // 홈페이지 접속하면 인증 로그인 창이 뜨게 된다.
                        session -> session.sessionCreationPolicy
                                (SessionCreationPolicy.STATELESS)) // 상태가 없는 세션을 만듭니다.
                .csrf().disable() // CSRF 비활성화한다.
                .build();

    }
}
