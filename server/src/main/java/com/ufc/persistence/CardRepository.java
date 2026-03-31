package com.ufc.persistence;

import com.ufc.persistence.entity.evento.FightCard;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<FightCard, Long> {

    Optional<FightCard> findFirstByOrderByDataEventoDesc();

    List<FightCard> findByDataEventoGreaterThanEqualOrderByDataEventoAsc(LocalDate data);
}
