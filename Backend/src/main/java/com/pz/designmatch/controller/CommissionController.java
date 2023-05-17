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

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
@RequestMapping("/api/commission")
public class CommissionController {

    private final CommissionService commissionService;

    @Autowired
    public CommissionController(CommissionService commissionService) {
        this.commissionService = commissionService;
    }

    @GetMapping(value = "/get/{id}", produces = apiVersionAccept)
    public ResponseEntity<CommissionResponse> getCommission(@PathVariable("id") Long id) {
        CommissionResponse commission = commissionService.getCommission(id);
        return ResponseEntity.ok(commission);
    }

    @PostMapping(value = "/create", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CommissionResponse> createCommission(@RequestBody CommissionRequest commission) {
        CommissionResponse createdCommission = commissionService.createCommission(commission);
        return ResponseEntity.ok(createdCommission);
    }

    @PutMapping(value = "/update/{id}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CommissionResponse> updateCommission(@PathVariable("id") Long id, @RequestBody CommissionRequest commission) {
        CommissionResponse updatedCommission = commissionService.updateCommission(id, commission);
        return ResponseEntity.ok(updatedCommission);
    }

    @PutMapping(value = "/setCompleted/{id}", produces = apiVersionAccept)
    public ResponseEntity<CommissionResponse> setCompletedCommission(@PathVariable("id") Long id) {
        CommissionResponse completedCommission = commissionService.setCommissionCompleted(id);
        return ResponseEntity.ok(completedCommission);
    }

    @PostMapping(value = "/filter", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<Page<CommissionResponse>> filterCommissions(@RequestBody CommissionFilterRequest filterRequest,
                                                                      @RequestParam(defaultValue = "0", name = "page") int page,
                                                                      @RequestParam(defaultValue = "10", name = "size") int size) {
        Page<CommissionResponse> filteredCommissions = commissionService.filterCommissions(filterRequest, PageRequest.of(page, size));
        return ResponseEntity.ok(filteredCommissions);
    }
}
