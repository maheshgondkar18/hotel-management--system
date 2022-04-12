package com.guestservice;

import com.guestservice.Model.Guest;
import com.guestservice.Repo.GuestRepo;
import com.guestservice.Service.GuestService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GuestServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@LocalServerPort
	private int port;

	private GuestService guestService;


	@Autowired
	private TestRestTemplate restTemplate;

	@Mock
	private GuestRepo guestRepo;


	@BeforeEach
	public void setup(){
		this.guestService = new GuestService(this.guestRepo);
	}
	@Test
	public void main() {
		GuestServiceApplication.main(new String[] {});
	}
	@Test
	public void getAllGuest(){
		guestService.getAllGuest();
		verify(guestRepo).findAll();
	}
	@Test
	public void addNewGuestTest(){
		Guest guest = new Guest("1","Mahesh Gondkar","Shirdi","mg@gmail.com",70203550,"male",1010);
		ResponseEntity response =new ResponseEntity(guest,HttpStatus.OK);

		when(guestRepo.save(guest)).thenReturn(guest);
		ResponseEntity<?> result = guestService.addGuest(guest);

		Assertions.assertEquals(response,result);
	}
	@Test
	@Order(1)
	public void getAllGuestTest() throws MalformedURLException {
		ResponseEntity<?> response = restTemplate.getForEntity(new URL("http://localhost:1118/guest/get").toString(),String.class);
		System.out.println(response.getBody());
		assertEquals(HttpStatus.OK,response.getStatusCode());
	}

	@Test
	@Order(2)
	public void addGuestTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Guest guest = new Guest();
		guest.setGid("107");
		guest.setName("kk");
		guest.setAddress("Shirdi");
		guest.setEmail("sai@gmail.com");
		guest.setPhonenumber(647813480);
		guest.setGender("Male");
		guest.setRoomno(106);

		HttpEntity<Guest> requestEntity = new HttpEntity<>(guest, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/guest/add").toString(),requestEntity,Guest.class);

		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}
	@Test
	@Order(3)
	public void addNewGuestWithDuplicateGidTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Guest guest = new Guest();
		guest.setGid("107");
		guest.setName("kk");
		guest.setAddress("Shirdi");
		guest.setEmail("sai@gmail.com");
		guest.setPhonenumber(647813480);
		guest.setGender("Male");
		guest.setRoomno(106);

		HttpEntity<Guest> requestEntity = new HttpEntity<>(guest, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/guest/add").toString(),requestEntity,Guest.class);

		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	@Order(4)
	public void updateStaffTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Guest guest = new Guest();
		guest.setAddress("Kop");

		HttpEntity<Guest> requestEntity = new HttpEntity<>(guest, headers);
		Map<String,String> par=new HashMap<String, String>();
		par.put("gid","107");

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/guest/update/{gid}").toString(),HttpMethod.PATCH,requestEntity,String.class,par);

		assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	@Order(5)
	public void deleteGuestTest() throws MalformedURLException {
		Map<String,String> par=new HashMap<String, String>();
		par.put("gid","107");
		HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Guest> entity= new HttpEntity<Guest>(httpHeaders);

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/guest/delete/{gid}").toString(),HttpMethod.DELETE,entity,String.class,par);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

}
