const conexion = require("../connect/conexion")
const fs = require("fs");
const path = require("path");
module.exports = {
  
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from user`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  
  obtenerId(user_id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from user where user_id = ?`,
        [user_id],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        });
    });
  },

  obtenerUser(username) {
    return new Promise((resolve, reject) => {
      conexion.query(`select * from user where username = ? `,
        [username],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
    });
  },


  insertar(username, full_name, user_description) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into user
            (username, full_name, user_description)
            values
            (?, ?, ?)`,
        [username, full_name, user_description], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  
}

