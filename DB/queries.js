const CREATE = `
        CREATE SCHEMA IF NOT EXISTS test_schema;
            CREATE TABLE IF NOT EXISTS test_schema.books (
                id SERIAL PRIMARY KEY,
                title VARCHAR (50) UNIQUE,
                author VARCHAR (50) UNIQUE,
                description VARCHAR ( 50 ) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
`;
const FETCH_ALL = `select * from test_schema.books;`;

module.exports = { CREATE, FETCH_ALL };
