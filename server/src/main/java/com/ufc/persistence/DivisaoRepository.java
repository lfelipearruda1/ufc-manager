package com.ufc.persistence;

import com.ufc.persistence.entity.divisao.Divisao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisaoRepository extends JpaRepository<Divisao, Long> {

    List<Divisao> findAllByOrderByNomeDivisaoAsc();
}
