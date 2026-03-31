package com.ufc.persistence;

import com.ufc.persistence.entity.luta.Juiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JuizRepository extends JpaRepository<Juiz, Long> {}
