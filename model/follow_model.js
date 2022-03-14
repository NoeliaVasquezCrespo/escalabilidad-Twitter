const conexion = require("../connect/conexion")
const fs = require("fs");
const path = require("path");
module.exports = {
  
  obtener() {
    return new Promise((resolve, reject) => {
      conexion.query(`SELECT f.follow_id AS id_follow, 
                      (select username from user where follower_id = user_id ) as 'Seguidor',
                      (select username from user where followee_id = user_id ) as 'Seguido'
                      FROM follow AS f `,
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados);
        });
    });
  },
  
  
  obtenerFollows(follower_id) {
    return new Promise((resolve, reject) => {
      conexion.query(`SELECT co.user_id AS id_follower, co.username AS user_follower, cd.user_id AS id_followee, cd.username AS user_followee
                      FROM follow AS d
                        INNER JOIN user AS co
                            ON co.user_id = d.follower_id
                        INNER JOIN user AS cd
                            ON cd.user_id = d.followee_id
                            where  co.user_id = ? `,
        [follower_id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
    });
  },

  obtenerUser(username) {
    return new Promise((resolve, reject) => {
      conexion.query(`SELECT  co.username AS usuario,cd.user_id AS id, cd.username AS username, t.text_tweet AS tweet
                      FROM follow d
                        INNER JOIN user AS co
                            ON co.user_id = d.follower_id
                        INNER JOIN user AS cd
                            ON cd.user_id = d.followee_id
                          left join post_tweet t 
                            ON cd.user_id = t.user_id
                          where  co.username = ?
                      ORDER BY cd.user_id;   `,
        [username],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
    });
  },
  


  insertar(follower_id,followee_id) {
    return new Promise((resolve, reject) => {
      conexion.query(`insert into follow
            (follower_id,followee_id)
            values
            (?, ?)`,
        [follower_id,followee_id], (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados.insertId);
        });
    });
  },
  
}

