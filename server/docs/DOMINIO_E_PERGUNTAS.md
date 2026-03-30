# Domínio UFC Manager — perguntas em aberto e defaults de implementação

Este arquivo registra o que **ainda precisa de resposta do grupo/professor** e o que já foi **assumido no código** (DDL em `src/main/resources/db/migration/`) para o projeto poder avançar.

## Já decidido (confirmado antes do DDL)

- **Card** e **CardPPV** são **tabelas separadas** (sem unificar em um único “Evento”).
- **Luta** tem **`id_luta`** como PK; **Possui** referencia essa PK.

## Defaults aplicados no banco (revisar com o grupo)

| Tema | Decisão no DDL | Se divergir do enunciado |
|------|----------------|---------------------------|
| **Luta em Card vs PPV** | `luta.id_card` e `luta.id_card_ppv` são opcionais, com **CHECK**: exatamente um dos dois preenchido (XOR). | Ajustar constraint ou modelo. |
| **CardPPV e cinturões** | Tabela N:N **`card_ppv_cinturao`** (vários cinturões por PPV). Não há `id_cinturao` único em `card_ppv`. | Se o professor exigir 1 FK só, remover N:N e recolocar coluna única. |
| **Receita PPV** | Coluna **`receita_total`** (valor armazenado). | Renomear para `receita` ou calcular só em aplicação. |
| **Data de evento** | Tipo **`DATE`** (`data_evento`), não `VARCHAR(10)`. | Migrar para string se o modelo exigir literalmente VARCHAR. |
| **Treinador ↔ Lutador** | **1:1** (`treinador.id_lutador` **UNIQUE**). | Para N:N, remover UNIQUE e criar tabela de associação. |
| **Lutador_Lutador** | PK surrogate + **CHECK** `id_lutador1 < id_lutador2` + **UNIQUE** no par (evita duplicata A–B / B–A). | Ajustar se o negócio exigir ordem semântica (desafiante/desafiado) nesta tabela. |

## Perguntas pendentes (copiar respostas quando definidas)

### Regras de negócio

1. Peso do lutador deve ficar sempre entre `peso_min` e `peso_max` da divisão, ou permitir catchweight?
2. Formato e validação do **cartel** (ex.: `10-2-0`)?
3. Pode haver mais de um cinturão “Regular” na mesma divisão (interino + regular)?
4. Domínio de **resultado** da luta (empate, vitória A/B, NC) e efeito em cinturão disputado.
5. Lista fechada de **método** (incluir NC, no contest?).

### Cardinalidade e integridade

6. Treinador: confirmar **um treinador por lutador** vs vários (mudaria o modelo).
7. **Lutador_Lutador**: propósito exato (histórico, ranking, confronto direto)?
8. **Possui**: sempre **1 linha por luta** (modelo atual) ou permitir várias linhas por `id_luta`?

### Eventos

9. Confirmar XOR Card/CardPPV em **Luta** (implementado).
10. Evento pode migrar de Card para CardPPV (mesmo evento real)?

### Finanças

11. **receita_total**: digitada, calculada (`preco_ppv * quant_pagantes`), ou ambas?
12. Card PPV sem cinturão na N:N é permitido?

### Aplicação

13. Escopo: só CRUD ou relatórios (ranking, histórico)?
14. Autenticação na primeira entrega? (ver `docs/TECNOLOGIA.md`.)
15. Telas prioritárias no front.

### Acadêmico

16. SGBD obrigatório para entrega (script em qual dialeto)?
17. Exigências de diagrama ER, 3FN, dados de exemplo?
