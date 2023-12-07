const db = require('.');

const CreateUsers = () => {
  const deleteStmt = db.prepare(`
  DROP TABLE IF EXISTS users
  `);
  deleteStmt.run();
  console.log('Tabla de usuarios eliminada');
  const stmt = db.prepare(`
  CREATE TABLE users (
    user_id TEXT,
    title TEXT NOT NULL,
    description TEXT 
  )
  `);
  stmt.run();
  console.log('Tabla de usuarios creada');
};

const CreateTables = () => {
  CreateUsers();
};
CreateTables();
