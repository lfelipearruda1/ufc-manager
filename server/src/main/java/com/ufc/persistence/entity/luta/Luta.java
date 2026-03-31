package com.ufc.persistence.entity.luta;
 
import com.ufc.persistence.entity.cinturao.Cinturao;
import com.ufc.persistence.entity.evento.CardPpv;
import com.ufc.persistence.entity.evento.FightCard;
import com.ufc.persistence.entity.lutador.Lutador;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
 
@Entity
@Table(name = "luta")
public class Luta {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_luta")
    private Long idLuta;
 
    @Column(nullable = false, length = 100)
    private String metodo;
 
    @Column(nullable = false, length = 100)
    private String resultado;
 
    @Column(name = "quant_rounds", nullable = false)
    private Integer quantRounds;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_card")
    private FightCard card;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_card_ppv")
    private CardPpv cardPpv;
 
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_visibilidade", nullable = false)
    private VisibilidadeLuta visibilidade;
 
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_desafiante", nullable = false)
    private Lutador desafiante;
 
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_desafiado", nullable = false)
    private Lutador desafiado;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cinturao")
    private Cinturao cinturao;
 
    public Luta() {}
 
    public Long getIdLuta() { return idLuta; }
    public void setIdLuta(Long idLuta) { this.idLuta = idLuta; }
 
    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }
 
    public String getResultado() { return resultado; }
    public void setResultado(String resultado) { this.resultado = resultado; }
 
    public Integer getQuantRounds() { return quantRounds; }
    public void setQuantRounds(Integer quantRounds) { this.quantRounds = quantRounds; }
 
    public FightCard getCard() { return card; }
    public void setCard(FightCard card) { this.card = card; }
 
    public CardPpv getCardPpv() { return cardPpv; }
    public void setCardPpv(CardPpv cardPpv) { this.cardPpv = cardPpv; }
 
    public VisibilidadeLuta getVisibilidade() { return visibilidade; }
    public void setVisibilidade(VisibilidadeLuta visibilidade) { this.visibilidade = visibilidade; }
 
    public Lutador getDesafiante() { return desafiante; }
    public void setDesafiante(Lutador desafiante) { this.desafiante = desafiante; }
 
    public Lutador getDesafiado() { return desafiado; }
    public void setDesafiado(Lutador desafiado) { this.desafiado = desafiado; }
 
    public Cinturao getCinturao() { return cinturao; }
    public void setCinturao(Cinturao cinturao) { this.cinturao = cinturao; }
}
 