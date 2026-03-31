package com.ufc.persistence;

import com.ufc.persistence.entity.luta.Luta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LutaRepository extends JpaRepository<Luta, Long> {

    long countByCardIsNotNull();

    long countByCardPpvIsNotNull();
}
