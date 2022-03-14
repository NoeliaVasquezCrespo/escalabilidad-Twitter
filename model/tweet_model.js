const conexion = require("../connect/conexion")
const fs = require("fs");
const path = require("path");
module.exports = {
  
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`select t.post_id, u.user_id, u.username, t.text_tweet
                      from post_tweet t
                      left join user u on (u.user_id = t.user_id)`,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  
  obtenerId(user_id) {
    return new Promise((resolve, reject) => {
      conexion.query(`select t.post_id, u.user_id, u.username, t.text_tweet
                      from post_tweet t
                      left join user u on (u.user_id = t.user_id) 
                      where u.user_id = ? `,
        [user_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
    });
  },
  

  obtenerUser(username) {
    return new Promise((resolve, reject) => {
      conexion.query(`select t.post_id, u.username, t.text_tweet
                      from post_tweet t
                      left join user u on (u.user_id = t.user_id)
                      where u.username = ? `,
        [username],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
    });
  },
  
  insertar(user_id, text_tweet) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into post_tweet
            (user_id, text_tweet)
            values
            (?, ?)`,
        [user_id, text_tweet], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  
}

