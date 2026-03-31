package com.ufc.persistence;

import com.ufc.persistence.entity.lutador.Lutador;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LutadorRepository extends JpaRepository<Lutador, Long> {

    List<Lutador> findAllByOrderByNomeAsc();

    List<Lutador> findByDivisao_IdDivisaoOrderByNomeAsc(Long idDivisao);

    @Query(
            """
            SELECT d.nomeDivisao, COUNT(l)
            FROM Lutador l JOIN l.divisao d
            GROUP BY d.idDivisao, d.nomeDivisao
            ORDER BY d.nomeDivisao
            """)
    List<Object[]> countLutadoresGroupedByDivisaoNome();
}
