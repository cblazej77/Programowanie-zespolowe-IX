package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.CommissionFilterRequest;
import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommissionService {

    CommissionResponse getCommissionById(Long id);

    CommissionResponse createCommission(CommissionRequest commissionRequest);

    CommissionResponse updateCommissionById(Long id, CommissionRequest commissionRequest) throws EntityNotFoundException;

    CommissionResponse setCommissionCompletedById(Long id) throws EntityNotFoundException;

    Page<CommissionResponse> filterCommissions(CommissionFilterRequest filterRequest, Pageable pageable);
}
