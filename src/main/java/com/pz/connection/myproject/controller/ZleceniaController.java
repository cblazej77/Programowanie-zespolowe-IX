package com.pz.connection.myproject.controller;

import com.pz.connection.myproject.Repository.OrderRepository;
import com.pz.connection.myproject.entity.User;
import com.pz.connection.myproject.entity.Zlecenia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.List;

@RestController
public class ZleceniaController {

    @Autowired
    OrderRepository OrderRepo;

    @GetMapping("/Order/NrZlecenia")
    public ResponseEntity<List<Zlecenia>> getZleceniaByNrZlecenia(@RequestParam Long NrZlecenia){
        return new ResponseEntity<List<Zlecenia>>(OrderRepo.findZleceniaByNrZlecenia(NrZlecenia), HttpStatus.OK);
    }

    @GetMapping("/Order/Nazwa")
    public ResponseEntity<List<Zlecenia>> getZleceniaByNazwa(@RequestParam String Nazwa){
        return new ResponseEntity<List<Zlecenia>>(OrderRepo.findZleceniasByNazwaOrderByDataPublikacjiAsc(Nazwa), HttpStatus.OK);
    }

    @GetMapping("/Order/DataPublikacjiEqual")
    public ResponseEntity<List<Zlecenia>> getZleceniaByDataPublikacjiEqual(@RequestParam SimpleDateFormat DataPublikacji){
        return new ResponseEntity<List<Zlecenia>>(OrderRepo.findZleceniasByDataPublikacjiEqualsOrderByNazwaAsc(DataPublikacji),
                HttpStatus.OK);
    }

    @GetMapping("/Order/DataPublikacjiBefore")
    public ResponseEntity<List<Zlecenia>> getZleceniaByDataPublikacjiBefore(@RequestParam SimpleDateFormat DataPublikacji){
        return new ResponseEntity<>(OrderRepo.findZleceniasByDataPublikacjiBeforeOrderByNazwaAsc(DataPublikacji), HttpStatus.OK);
    }

    @GetMapping("/Order/DataPublikacjiAfter")
    public ResponseEntity<List<Zlecenia>> getZleceniaByDataPublikacjiAfter(@RequestParam SimpleDateFormat DataPublikacji){
        return new ResponseEntity<>(OrderRepo.findZleceniasByDataPublikacjiAfterOrderByNazwaAsc(DataPublikacji), HttpStatus.OK);
    }

    @GetMapping("/Order/Wymagania")
    public ResponseEntity<List<Zlecenia>> getZleceniaByWymagania(@RequestParam String Wymagania){
        return new ResponseEntity<>(OrderRepo.findZleceniasByWymaganiaContainsOrderByNazwaAsc(Wymagania), HttpStatus.OK);
    }

    @GetMapping("Order/Jezyk")
    public ResponseEntity<List<Zlecenia>> getZleceniaByJezyk(@RequestParam String Jezyk){
        return new ResponseEntity<>(OrderRepo.findZleceniasByJezykOrderByNazwaAsc(Jezyk), HttpStatus.OK);
    }
}
