package com.selectoverseas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.selectoverseas.backend.model.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
}
