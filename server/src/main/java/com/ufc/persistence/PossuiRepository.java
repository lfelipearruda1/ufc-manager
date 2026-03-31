package com.ufc.persistence;

import com.ufc.persistence.entity.luta.Possui;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PossuiRepository extends JpaRepository<Possui, Long> {

    @Query(
            """
            SELECT p FROM Possui p
            JOIN FETCH p.desafiante d
            JOIN FETCH d.divisao
            JOIN FETCH p.desafiado d2
            JOIN FETCH d2.divisao
            LEFT JOIN FETCH p.cinturao
            JOIN FETCH p.luta l
            WHERE l.card.idCard = :idCard
            ORDER BY l.idLuta DESC
            """)
    List<Possui> findDetalhesPorCard(@Param("idCard") Long idCard);

    @Query(
            """
            SELECT p FROM Possui p
            JOIN FETCH p.desafiante d
            JOIN FETCH d.divisao
            JOIN FETCH p.desafiado d2
            JOIN FETCH d2.divisao
            LEFT JOIN FETCH p.cinturao
            JOIN FETCH p.luta l
            WHERE l.cardPpv.idCardPpv = :idPpv
            ORDER BY l.idLuta DESC
            """)
    List<Possui> findDetalhesPorPpv(@Param("idPpv") Long idPpv);
}
