package com.pz.connection.myproject.controller;

import com.pz.connection.myproject.Repository.UserRepositoryU;
import com.pz.connection.myproject.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepositoryU URepo;

    @GetMapping("/User/id")
    public ResponseEntity<List<User>> getUserById(@RequestParam Long id){
        return new ResponseEntity<List<User>>(URepo.findUserById(id), HttpStatus.OK);
    }

    @GetMapping("/User/Name")
    public ResponseEntity<List<User>> getUserByName(@RequestParam String Name) {
        return new ResponseEntity<List<User>>(URepo.findUserByName(Name), HttpStatus.OK);
    }

    @GetMapping("/User/Nickname")
    public ResponseEntity<List<User>> getUserByNickname(@RequestParam String Nickname){
        return new ResponseEntity<List<User>>(URepo.findUserByNickname(Nickname), HttpStatus.OK);
    }

    @GetMapping("/User/LiczbaZrealizowanychZlecenAsc")
    public ResponseEntity<List<User>> getUsersByLiczbaZrealizowanychZlecenAsc(@RequestParam Integer LiczbaZrealizowanychZlecen){
        return new ResponseEntity<List<User>>(URepo.findUsersByLiczbaZrealizowanychZlecenGreaterThanEqualOrderByLiczbaZrealizowanychZlecenAsc(LiczbaZrealizowanychZlecen),
                HttpStatus.OK);
    }

    @GetMapping("/User/LiczbaZrealizowanychZlecenDesc")
    public ResponseEntity<List<User>> getUsersByLiczbaZrealizowanychZlecenDesc(@RequestParam Integer LiczbaZrealizowanychZlecen){
        return new ResponseEntity<List<User>>(URepo.findUsersByLiczbaZrealizowanychZlecenGreaterThanEqualOrderByLiczbaZrealizowanychZlecenDesc(LiczbaZrealizowanychZlecen),
                HttpStatus.OK);
    }

    @GetMapping("/User/Jezyk")
    public ResponseEntity<List<User>> getUsersByJezyk(@RequestParam String Jezyk){
        return new ResponseEntity<List<User>>(URepo.findUsersByJezykOrderByNicknameAsc(Jezyk), HttpStatus.OK);
    }

    @GetMapping("/User/SredniaOcenZaZleceniaAsc")
    public ResponseEntity<List<User>> getUsersBySredniaOcenZaZleceniaAsc(@RequestParam Double SredniaOcenZaZlecenia){
        return new ResponseEntity<List<User>>(URepo.findUsersBySredniaOcenZaZleceniaGreaterThanEqualOrderBySredniaOcenZaZleceniaAsc(SredniaOcenZaZlecenia),
                HttpStatus.OK);
    }

    @GetMapping("/User/SredniaOcenZaZleceniaDesc")
    public ResponseEntity<List<User>> getUsersBySredniaOcenZaZleceniaDesc(@RequestParam Double SredniaOcenZaZlecenia){
        return new ResponseEntity<List<User>>(URepo.findUsersBySredniaOcenZaZleceniaGreaterThanEqualOrderBySredniaOcenZaZleceniaDesc(SredniaOcenZaZlecenia),
                HttpStatus.OK);
    }

    @GetMapping("/User/Umiejetnosci")
    public ResponseEntity<List<User>> getUsersByUmiejetnosci(@RequestParam String Umiejetnosci){
        return new ResponseEntity<List<User>>(URepo.findUsersByUmiejetnosciContainsOrderByNicknameAsc(Umiejetnosci),
                HttpStatus.OK);
    }

}
