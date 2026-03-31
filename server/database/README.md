# Banco de dados e migrações

Este diretório concentra o **modelo relacional** do UFC Manager: divisões, lutadores, eventos, lutas no card, juízes, cinturões e demais vínculos descritos no trabalho de banco de dados.

## Papel no projeto

- O **esquema** (tabelas, chaves, restrições, índices) é definido **só em SQL**, em arquivos numerados e aplicados em ordem.
- **Não há dados de exemplo** dentro das migrações — apenas estrutura. Quem usa o sistema preenche o banco via ferramentas cliente, scripts próprios ou pelos fluxos que a API expuser.
- Ao subir a aplicação, o **Flyway** aplica automaticamente o que falta em `migrations/`. Em ambiente de desenvolvimento com outro banco (por exemplo H2 nos testes), a mesma sequência de scripts garante que todos vejam o mesmo modelo.

## Onde estão os arquivos

Os scripts ficam em **`migrations/`**, na ordem **V1 → V13** (cada versão é um passo; não reescreva versões antigas já aplicadas em produção). Novas mudanças de modelo devem vir como **V14, V15…** com um nome descritivo.

Um resumo do que cada arquivo cobre:

| Arquivo | Conteúdo principal |
|---------|---------------------|
| `V1__divisao.sql` | Divisões de peso |
| `V2__lutador.sql` | Lutadores |
| `V3__lutador_lutador.sql` | Relação entre lutadores |
| `V4__treinador.sql` | Treinadores |
| `V5__cinturao.sql` | Cinturões |
| `V6__card.sql` | Fight Night (`card`) |
| `V7__card_ppv.sql` | PPV |
| `V8__card_ppv_cinturao.sql` | Cinturões disputados em PPV |
| `V9__juiz.sql` | Juízes |
| `V10__visibilidade_luta.sql` | Visibilidade da luta no card |
| `V11__luta.sql` | Lutas (ligadas a um tipo de evento) |
| `V12__possui.sql` | Desafiante / desafiado / cinturão por luta |
| `V13__indices.sql` | Índices auxiliares |

## Rodar o SQL à mão (pgAdmin, Postico, `psql`…)

Num **banco vazio**, execute os arquivos **na ordem V1…V13**. Se a API já tiver rodado o Flyway nesse banco, o histórico fica na tabela `flyway_schema_history` — não reaplique tudo em cima sem saber o que já foi aplicado.

Se aparecer erro de **versão duplicada** ao compilar ou subir a API, costuma ser lixo de build antigo: limpe a pasta de saída do Maven (`mvn clean`) e tente de novo.

## Alterações futuras no modelo

Sempre que precisar mudar tabelas ou colunas, **acrescente uma nova migração** (próximo número V…) em vez de editar scripts já usados em ambientes reais. Depois, alinhe a aplicação para usar o novo esquema.

Para o quadro geral do produto e como subir API + site, veja o **`README.md` na raiz do repositório**.
