package com.hms.AuthService;

import com.hms.AuthService.repository.UserRepo;
import com.hms.AuthService.request.LoginRequest;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.net.URL;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthServiceApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void getAuthServiceStatus() throws Exception {
		ResponseEntity<String> response = restTemplate.getForEntity(new URL("http://localhost:" + port + "/auth/").toString(), String.class);
		assertEquals("Auth-Service is running", response.getBody());
	}

	@Test
	public void testLoginWithValidCredentials() throws Exception {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		LoginRequest loginRequest = new LoginRequest();
		loginRequest.setUsername("man@gmail.com");
		loginRequest.setPassword("123");

		HttpEntity<LoginRequest> requestEntity = new HttpEntity<>(loginRequest, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/auth/login").toString(),requestEntity,LoginRequest.class);

		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	public void testLoginWithInValidCredentials() throws Exception {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		LoginRequest loginRequest = new LoginRequest();
		loginRequest.setUsername("man@gmail.com");
		loginRequest.setPassword("1234");

		HttpEntity<LoginRequest> requestEntity = new HttpEntity<>(loginRequest, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/auth/login").toString(),requestEntity,LoginRequest.class);

		assertEquals(HttpStatus.UNAUTHORIZED,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

}
