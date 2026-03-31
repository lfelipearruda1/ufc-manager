# Banco de dados e migrações

Este diretório concentra o **modelo relacional** do UFC Manager: divisões, lutadores, eventos, lutas no card, cinturões e demais vínculos descritos no trabalho de banco de dados.

## Papel no projeto

- O **esquema** (tabelas, chaves, restrições, índices) é definido **só em SQL**, em arquivos numerados e aplicados em ordem.
- **Não há dados de exemplo** dentro das migrações — apenas estrutura. Quem usa o sistema preenche o banco via ferramentas cliente, scripts próprios ou pelos fluxos que a API expuser.
- Ao subir a aplicação, o **Flyway** aplica automaticamente o que falta em `migrations/`. Em ambiente de desenvolvimento com outro banco (por exemplo H2 nos testes), a mesma sequência de scripts garante que todos vejam o mesmo modelo.

## Onde estão os arquivos

Os scripts ficam em **`migrations/`**.

Um resumo do que cada arquivo cobre:

| Arquivo | Conteúdo principal |
|---------|---------------------|
| `V1__criar_tabelas.sql` | Cria todas as tabelas |
| `V2__inseir_dados.sql` | Insere dados de alimentação ao banco de dados |

## Rodar o SQL à mão (pgAdmin, Postico, `psql`…)

Num **banco vazio**, execute os arquivos **na ordem V1…V13**. Se a API já tiver rodado o Flyway nesse banco, o histórico fica na tabela `flyway_schema_history` — não reaplique tudo em cima sem saber o que já foi aplicado.

Se aparecer erro de **versão duplicada** ao compilar ou subir a API, costuma ser lixo de build antigo: limpe a pasta de saída do Maven (`mvn clean`) e tente de novo.

Para o quadro geral do produto e como subir API + site, veja o **`README.md` na raiz do repositório**.
