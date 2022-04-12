package com.hms.inventory;

import com.hms.inventory.Model.Inventory;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InventoryApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@Order(1)
	 void getAllProductsTest() throws MalformedURLException {
		ResponseEntity<?> response = restTemplate.getForEntity(new URL("http://localhost:1200/inventory/get").toString(),String.class);
		System.out.println(response.getBody());
		assertEquals(HttpStatus.OK,response.getStatusCode());
	}

	@Test
	@Order(2)
	 void addProductTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Inventory inventory = new Inventory();
//		inventory.setPid(new Random().nextInt(1003));
		inventory.setPid(6);
		inventory.setPname("bulbs");
		inventory.setPquantity(10);


		HttpEntity<Inventory> requestEntity = new HttpEntity<>(inventory, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/inventory/add").toString(),requestEntity,Inventory.class);

		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	@Order(3)
	 void updateProductTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Inventory inventory = new Inventory();
		inventory.setPname("Tubes");

		HttpEntity<Inventory> requestEntity = new HttpEntity<>(inventory, headers);
		Map<String,String> par=new HashMap<String, String>();
		par.put("pid","6");

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/inventory/update/{pid}").toString(),HttpMethod.PUT,requestEntity,String.class,par);

		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	@Order(4)
	 void deleteProductTest() throws MalformedURLException {
		Map<String,String> par=new HashMap<String, String>();
		par.put("pid","1");
		HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Inventory> entity= new HttpEntity<Inventory>(httpHeaders);

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/inventory/delete/{pid}").toString(),HttpMethod.DELETE,entity,String.class,par);
		assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}
}
