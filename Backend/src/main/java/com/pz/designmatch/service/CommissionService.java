package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.CommissionFilterRequest;
import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface CommissionService {
    @Transactional(readOnly = true)
    CommissionResponse getCommission(Long id);

    @Transactional
    CommissionResponse createCommission(CommissionRequest commissionRequest);

    @Transactional
    CommissionResponse updateCommission(Long id, CommissionRequest commissionRequest) throws EntityNotFoundException;

    @Transactional
    CommissionResponse setCommissionCompleted(Long id) throws EntityNotFoundException;

    @Transactional(readOnly = true)
    Page<CommissionResponse> filterCommissions(CommissionFilterRequest filterRequest, Pageable pageable);
}
