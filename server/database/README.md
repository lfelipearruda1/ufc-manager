# Banco de dados (DDL em SQL)

Toda **criação de tabelas, colunas, FKs e constraints** fica aqui em SQL. O Java **não** gera schema: o [Flyway](https://flywaydb.org/) aplica estes scripts na subida da API; o JPA só **valida** (`ddl-auto=validate`) que as entidades batem com o que já existe.

## Onde está o SQL

| Caminho | Uso |
|---------|-----|
| [`migrations/V1__schema.sql`](migrations/V1__schema.sql) | Script versionado (novas versões: `V2__....sql`, etc.). |

Cópia em tempo de build: o Maven copia `database/migrations/*.sql` para o classpath em `db/migration/`, onde o Flyway procura.

## Como rodar o SQL manualmente (Postico, pgAdmin, `psql`)

1. Conecte no banco (ex.: `ufc_manager` no PostgreSQL local).
2. Abra o arquivo `migrations/V1__schema.sql` **neste repositório** (é o mesmo conteúdo que o Flyway usa).
3. Execute o script inteiro **uma vez** em um banco vazio (ou apague as tabelas antes, se for recomeçar).

**Atenção:** se a API já rodou com Flyway, o histórico fica em `flyway_schema_history`. Para só “ver” o SQL na disciplina, use uma base de teste ou um banco novo — evite duplicar migrações na mesma base em que o Flyway já aplicou `V1`.

## Relação com o código Java

- **`com.ufc.persistence.entity.*`** — classes JPA que **espelham** as tabelas definidas neste SQL.
- **`com.ufc.persistence`** — repositórios Spring Data (consultas).
- **`com.ufc.module.*`** — regras de negócio / casos de uso (ex.: `module.home` para o resumo da página inicial).

Alterou tabela ou coluna? **Altere o SQL** (nova migração `V2__...sql`) e depois ajuste as entidades Java para coincidir.
