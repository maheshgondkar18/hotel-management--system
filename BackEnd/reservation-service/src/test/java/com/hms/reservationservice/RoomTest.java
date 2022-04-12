package com.hms.reservationservice;

import com.hms.reservationservice.model.Room;
import com.hms.reservationservice.repository.RoomRepo;
import com.hms.reservationservice.service.RoomService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class RoomTests {

    @LocalServerPort
    private int port;

	@Autowired
	private RoomService roomService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private RoomRepo roomRepo;


	@Autowired
	private MockMvc mockMvc;




    @Test
    @Order(1)
    public void getAllRoomTest() throws MalformedURLException {
        ResponseEntity<?> response = restTemplate.getForEntity(new URL("http://localhost:1114/room/").toString(),String.class);
        System.out.println(response.getBody());
        assertEquals(HttpStatus.OK,response.getStatusCode());
    }

    @Test
    @Order(2)
    public void addNewRoomTest() throws MalformedURLException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Room room = new Room();
        room.setId("102");
        room.setRoomRates(1200.0f);
        room.setRoomNumber(108);
        room.setRoomSize(3);

        HttpEntity<Room> requestEntity = new HttpEntity<>(room, headers);

        ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/room/").toString(),requestEntity,Room.class);

        assertEquals(HttpStatus.OK,response.getStatusCode());
        System.out.println("Status Code: " + response.getStatusCode());
    }
//    @Test
//    public void addNewStaffWithDuplicateEmpCodeTest() throws MalformedURLException {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        Staff staff = new Staff();
//        staff.setEmployeeCode(1001);
//        staff.setEmployeeAddress("Shirdi");
//        staff.setEmployeeAge(10);
//        staff.setEmployeeEmail("sai@gmail.com");
//        staff.setEmployeeName("Sai");
//        staff.setEmployeeNIC("10000");
//        staff.setEmployeeOccupation("Student");
//        staff.setEmployeeSalary(1000.0f);
//
//        HttpEntity<Staff> requestEntity = new HttpEntity<>(staff, headers);
//
//        ResponseEntity<?> response = restTemplate.postForEntity(new URL("http://localhost:"+ port +"/staff/add").toString(),requestEntity,Staff.class);
//
//        assertEquals(HttpStatus.CONFLICT,response.getStatusCode());
//        System.out.println("Status Code: " + response.getStatusCode());
//    }
//
    @Test
    @Order(3)
    public void updateRoomTest() throws MalformedURLException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Room room = new Room();
        room.setRoomRates(1500.0f);

        HttpEntity<Room> requestEntity = new HttpEntity<>(room, headers);
        Map<String,String> par=new HashMap<String, String>();
        par.put("roomNumber","108");

        ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/update/{roomNumber}").toString(),HttpMethod.PATCH,requestEntity,String.class,par);

        assertEquals(HttpStatus.NOT_FOUND,response.getStatusCode());
        System.out.println("Status Code: " + response.getStatusCode());
    }
//
    @Test
    @Order(4)
    public void deleteRoomTest() throws MalformedURLException {
        Map<String,String> par=new HashMap<String, String>();
        par.put("id","102");
        HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Room> entity= new HttpEntity<Room>(httpHeaders);

        ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/room/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
        assertEquals(HttpStatus.UNPROCESSABLE_ENTITY,response.getStatusCode());
        System.out.println("Status Code: " + response.getStatusCode());
    }
//    @Test
//    public void deleteStaffWithInvalidTest() throws MalformedURLException {
//        Map<String,String> par=new HashMap<String, String>();
//        par.put("id","1");
//        HttpHeaders httpHeaders= new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<Staff> entity= new HttpEntity<Staff>(httpHeaders);
//
//        ResponseEntity<?> response = restTemplate.exchange(new URL("http://localhost:"+ port +"/staff/delete/{id}").toString(),HttpMethod.DELETE,entity,String.class,par);
//        assertEquals(HttpStatus.BAD_REQUEST,response.getStatusCode());
//        System.out.println("Status Code: " + response.getStatusCode());
//    }

//    @Test
//    @Order(6)
//    void addRoom() {
//        Room room=new Room("1",101,1200.0f,3);
//        when(roomRepo.save(room)).thenReturn(room);
//        assertEquals(room,roomService.addRoom(room));
//    }

}
