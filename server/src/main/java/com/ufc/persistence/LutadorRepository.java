package com.ufc.persistence;

import com.ufc.persistence.entity.lutador.Lutador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LutadorRepository extends JpaRepository<Lutador, Long> {}
