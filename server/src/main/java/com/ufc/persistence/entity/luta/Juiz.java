package com.ufc.persistence.entity.luta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "juiz")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Juiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_juiz")
    private Long idJuiz;

    @Column(name = "nome_juiz", nullable = false, length = 100)
    private String nomeJuiz;
}
