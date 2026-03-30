package com.ufc.persistence;

import com.ufc.persistence.entity.evento.FightCard;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<FightCard, Long> {

    Optional<FightCard> findFirstByOrderByDataEventoDesc();
}
