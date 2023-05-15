package com.pz.designmatch.comissions;

import com.pz.designmatch.exception.CommissionNotFound;
import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.repository.CommissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.tags.form.TagWriter;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/commission")
public class commissionController {
    private final commissionService commissionService;
    public static final String apiVersionAccept = "application/json";

    @Autowired
    private CommissionRepository commissionRepository;

    public commissionController(com.pz.designmatch.comissions.commissionService commissionService, CommissionRepository commissionRepository) {
        this.commissionService = commissionService;
        this.commissionRepository = commissionRepository;
    }

    @PutMapping (value = "/UpdateCommission", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<commissionDto> createCommission(@RequestParam String title, @RequestBody commissionDto commissionDto) {
        try {
            commissionDto updateComm = commissionService.UpdateOrCreateCommissionByTitle(title, commissionDto);
            return ResponseEntity.ok(updateComm);
        } catch (Exception ex) {
            throw new RuntimeException("Internal server error (updating)");
        }
    }
    @PostMapping(value = "/CreateCommission", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<commissionDto> updateCommission(@RequestBody commissionDto commissionDto){
        try{
            commissionDto newComm = commissionService.CreateCommission(commissionDto);
            return ResponseEntity.ok(newComm);
        } catch (Exception ex){
            throw new RuntimeException("Internal server error (creation)");
        }
    }

    @GetMapping(value = "/getCommissions", produces = apiVersionAccept)
    public ResponseEntity<commissionDto> getCommissionByTitle(@RequestParam Long id){
        commissionDto commission = commissionService.getCommissionDtoByID(id);
        return ResponseEntity.status(HttpStatus.OK.value()).body(commission);
    }

    @PutMapping(value = "/setComplited", produces = apiVersionAccept)
    public ResponseEntity<commissionDto> setComplitedCommission(@RequestParam Long id){
        commissionDto commissionCompleted = commissionService.setCommissionComplited(id);
        return ResponseEntity.status(HttpStatus.OK.value()).body(commissionCompleted);
    }

//    @PostMapping(value = "/filterCommissions", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<Page<commissionDto>> filterCommissions(@RequestBody commissionDto commissionDto,
//                                                                @RequestParam(defaultValue = "0", name = "page") int page,
//                                                                @RequestParam(defaultValue = "10", name = "size") int size){
//        Specification<Commission> specification = Specification.where(null);
//    }

}
