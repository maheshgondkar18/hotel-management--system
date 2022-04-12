package com.hms.staff;

import com.hms.staff.model.Staff;
import com.hms.staff.repository.StaffRepo;
import com.hms.staff.service.StaffService;
import com.netflix.discovery.converters.Auto;
import com.sun.tools.javac.Main;
import org.bouncycastle.its.asn1.IValue;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.setRemoveAssertJRelatedElementsFromStackTrace;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(MockitoExtension.class)
class StaffApplicationTests {

	@LocalServerPort
	private int port;

	private StaffService staffService;

	@Autowired
	private TestRestTemplate restTemplate;

	@Mock
	private  StaffRepo staffRepo;

	@BeforeEach
	public void setup(){
		this.staffService = new StaffService(this.staffRepo);
	}
	@Test
	public void main() {
		StaffApplication.main(new String[] {});
	}

	@Test
	public void getStaffPerson(){
		staffService.getAllStaff();
		verify(staffRepo).findAll();
	}
	@Test
	public void addStaffTest(){
		Staff staff = new Staff(1,"Mahesh Gondkar","Shirdi", 450000.00F,"MG101",23,"Engineer","mg@hmail.com");
		ResponseEntity response =new ResponseEntity(staff,HttpStatus.OK);

		when(staffRepo.save(staff)).thenReturn(staff);
		ResponseEntity<?> result = staffService.addStaff(staff);

		Assertions.assertEquals(response,result);
	}

	@Test
	public void getStaffByCodeTest(){
		Staff staff = new Staff(1,"Mahesh Gondkar","Shirdi", 450000.00F,"MG101",23,"Engineer","mg@hmail.com");
		ResponseEntity response =new ResponseEntity(staff,HttpStatus.OK);

		when(staffRepo.findByEmployeeCode(1)).thenReturn(staff);
		ResponseEntity<?> result = staffService.getByEmployeeCode(1);

		Assertions.assertEquals(response,result);
	}
	@Test
	public void updateStaffByEmpCodeTest(){
		Staff staff = new Staff(1,"Mahesh Gondkar","Shirdi", 550000.00F,"MG101",23,"Engineer","mg@hmail.com");
		ResponseEntity response =new ResponseEntity(staff,HttpStatus.OK);

		when(staffRepo.findByEmployeeCode(1)).thenReturn(staff);
		ResponseEntity<?> result = staffService.getByEmployeeCode(1);

		Assertions.assertEquals(response,result);
	}




	@Test
	@Order(1)
	 void getAllStaffTest() throws MalformedURLException {
		ResponseEntity<?> response = restTemplate.getForEntity(new URL("http://localhost:1110/staff/get").toString(),String.class);
		System.out.println(response.getBody());
		assertEquals(HttpStatus.OK,response.getStatusCode());
	}

	@Test
	@Order(2)
	 void addNewStaffTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Staff staff = new Staff();
		staff.setEmployeeCode(9);
		staff.setEmployeeAddress("Shirdi");
		staff.setEmployeeAge(10);
		staff.setEmployeeEmail("sai@gmail.com");
		staff.setEmployeeName("Sai");
		staff.setEmployeeNIC("10000");
		staff.setEmployeeOccupation("Student");
		staff.setEmployeeSalary(1000.0f);

		HttpEntity<Staff> requestEntity = new HttpEntity<>(staff, headers);

		ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/staff/add").toString(),requestEntity,Staff.class);

		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}


	@Test
	@Order(3)
	 void updateStaffTest() throws MalformedURLException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		Staff staff = new Staff();
		staff.setEmployeeAddress("Kop");

		HttpEntity<Staff> requestEntity = new HttpEntity<>(staff, headers);
		Map<String,String> par=new HashMap<String, String>();
		par.put("id","9");

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/staff/update/{id}").toString(),HttpMethod.PATCH,requestEntity,String.class,par);

		assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}

	@Test
	@Order(4)
	 void deleteStaffTest() throws MalformedURLException {
		Map<String,String> par=new HashMap<String, String>();
		par.put("id","9");
		HttpHeaders httpHeaders= new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Staff> entity= new HttpEntity<Staff>(httpHeaders);

		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/staff/delete/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
		assertEquals(HttpStatus.OK,response.getStatusCode());
		System.out.println("Status Code: " + response.getStatusCode());
	}
//	@Test
//	@Order(5)
//	public void deleteStaffWithInvalidTest() throws MalformedURLException {
//		Map<String,String> par=new HashMap<String, String>();
//		par.put("id","1");
//		HttpHeaders httpHeaders= new HttpHeaders();
//		httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//		HttpEntity<Staff> entity= new HttpEntity<Staff>(httpHeaders);
//
//		ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/staff/delete/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
//		assertEquals(HttpStatus.OK,response.getStatusCode());
//		System.out.println("Status Code: " + response.getStatusCode());
//	}



}
