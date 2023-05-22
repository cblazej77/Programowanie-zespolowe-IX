package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.CommissionFilterRequest;
import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import com.pz.designmatch.service.CommissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
public class CommissionController {

    private final CommissionService commissionService;

    @Autowired
    public CommissionController(CommissionService commissionService) {
        this.commissionService = commissionService;
    }

    @GetMapping(value = "/public/api/commission/getById/{id}", produces = apiVersionAccept)
    public ResponseEntity<CommissionResponse> getCommissionById(@PathVariable("id") Long id) {
        CommissionResponse commission = commissionService.getCommissionById(id);
        return ResponseEntity.ok(commission);
    }

    @PostMapping(value = "/public/api/commission/filter", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<Page<CommissionResponse>> filterCommissions(@RequestBody CommissionFilterRequest filterRequest,
                                                                      @RequestParam(defaultValue = "0", name = "page") int page,
                                                                      @RequestParam(defaultValue = "10", name = "size") int size) {
        Page<CommissionResponse> filteredCommissions = commissionService.filterCommissions(filterRequest, PageRequest.of(page, size));
        return ResponseEntity.ok(filteredCommissions);
    }


    @PostMapping(value = "/api/commission/create", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CommissionResponse> createCommission(@RequestBody CommissionRequest commission) {
        CommissionResponse createdCommission = commissionService.createCommission(commission);
        return ResponseEntity.ok(createdCommission);
    }

    @PutMapping(value = "/api/commission/updateById/{id}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CommissionResponse> updateCommissionById(@PathVariable("id") Long id, @RequestBody CommissionRequest commission) {
        CommissionResponse updatedCommission = commissionService.updateCommissionById(id, commission);
        return ResponseEntity.ok(updatedCommission);
    }

    @PutMapping(value = "/api/commission/setCompletedById/{id}", produces = apiVersionAccept)
    public ResponseEntity<CommissionResponse> setCompletedCommissionById(@PathVariable("id") Long id) {
        CommissionResponse completedCommission = commissionService.setCommissionCompletedById(id);
        return ResponseEntity.ok(completedCommission);
    }

    @GetMapping(value = "/public/api/commission/getAllCommissionFirmByUsername/{username}", produces = apiVersionAccept)
    public ResponseEntity<List<CommissionResponse>> getCommissionsByUsername(@PathVariable("username") String username) {
        List<CommissionResponse> commissionsResponse = commissionService.getCommissionsByUsername(username);
        return ResponseEntity.ok(commissionsResponse);
    }

    @DeleteMapping(value = "/public/api/deleteCommission/{id}", produces = apiVersionAccept)
    public ResponseEntity<String> deleteCommission(@PathVariable("id") Long id) {
        commissionService.deleteCommissionById(id);
        return ResponseEntity.ok().body("Zlecenie usunięte");
    }

}