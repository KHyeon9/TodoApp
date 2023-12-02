package com.todoapp.rest.webservices.TodoApp.helloworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	
	@GetMapping(path = "/basicauth")
	// 인증을 위한 테스트 url
	public String basicAuthCheck() {
		// 로그인 시 아이디와 패스워드를 받아 토큰을 생성 및 요청
		// 틀린 아이디와 비밀번호일 경우 토큰이 유요하지 않아서 인증 실패를 리턴
		return "Success";
	}

	@GetMapping(path = "/hello-world")
	public String helloworld() {
		return "Hello World v2";
	}
	
	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World Bean");
	}
	
	@GetMapping(path = "/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World, %s", name)); 
	}	
}
