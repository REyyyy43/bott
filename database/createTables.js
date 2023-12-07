const db = require('.');

const CreateUsers = () => {
  const deleteStmt = db.prepare(`
  DROP TABLE IF EXISTS users
  `);
  deleteStmt.run();
  console.log('Tabla de usuarios eliminada');
  const stmt = db.prepare(`
  CREATE TABLE users (
    user_id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    age INTERGER
  )
  `);
  stmt.run();
  console.log('Tabla de usuarios creada');
};

const CreateTables = () => {
  CreateUsers();
};
CreateTables();
