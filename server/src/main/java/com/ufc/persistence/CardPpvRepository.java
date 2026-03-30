package com.ufc.persistence;

import com.ufc.persistence.entity.evento.CardPpv;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardPpvRepository extends JpaRepository<CardPpv, Long> {

    Optional<CardPpv> findFirstByOrderByDataEventoDesc();
}
