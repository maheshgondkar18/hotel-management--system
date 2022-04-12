package com.hms.reservationservice;

import com.hms.reservationservice.model.Reservation;
import com.hms.reservationservice.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
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
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ReservationServiceApplicationTests {

	@LocalServerPort
	private int port;

	@InjectMocks
	Reservation reservation = new Reservation();

	@Mock
	ReservationService rservice;

	@Autowired
	private TestRestTemplate restTemplate;




	@Test
	public void getAllReservationTest() throws MalformedURLException {
		ResponseEntity<?> response = restTemplate.getForEntity(new URL("http://localhost:1113/reservation/all").toString(),String.class);
		System.out.println(response.getBody());
		assertEquals(HttpStatus.OK,response.getStatusCode());
	}

	@Test
	public void makeReservationTest() throws MalformedURLException {



//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//
//		Reservation reservation = new Reservation();
//		reservation.setId("101");
//		reservation.setCheckIn(2022-03-24);
//		reservation.setCheckOut(10);
//		reservation.setTotalAdults(3);
//		reservation.setTotalChildren(2);
//		reservation.setTotalGuest(5);
//
//		HttpEntity<Reservation> requestEntity = new HttpEntity<>(reservation, headers);
//
//		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/reservation/").toString(),requestEntity,Reservation.class);
//
//		assertEquals(HttpStatus.OK,response.getStatusCode());
//		System.out.println("Status Code: " + response.getStatusCode());
	}
//	@Test
//	public void addNewStaffWithDuplicateEmpCodeTest() throws MalformedURLException {
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//
//		Staff staff = new Staff();
//		staff.setEmployeeCode(1001);
//		staff.setEmployeeAddress("Shirdi");
//		staff.setEmployeeAge(10);
//		staff.setEmployeeEmail("sai@gmail.com");
//		staff.setEmployeeName("Sai");
//		staff.setEmployeeNIC("10000");
//		staff.setEmployeeOccupation("Student");
//		staff.setEmployeeSalary(1000.0f);
//
//		HttpEntity<Staff> requestEntity = new HttpEntity<>(staff, headers);
//
//		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/staff/add").toString(),requestEntity,Staff.class);
//
//		assertEquals(HttpStatus.CONFLICT,response.getStatusCode());
//		System.out.println("Status Code: " + response.getStatusCode());
//	}
//

//
	@Test
	public void deletereservationTest() throws MalformedURLException {
		Map<String,String> par=new HashMap<String, String>();
		par.put("id","101");
		HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Reservation> entity= new HttpEntity<Reservation>(httpHeaders);

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/reservation/delete/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}
//	@Test
//	public void deleteStaffWithInvalidTest() throws MalformedURLException {
//		Map<String,String> par=new HashMap<String, String>();
//		par.put("id","1");
//		HttpHeaders httpHeaders= new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//		HttpEntity<Staff> entity= new HttpEntity<Staff>(httpHeaders);
//
//		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/staff/delete/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
//		assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
//		System.out.println("Status Code: " + response.getStatusCode());
//	}




}
