var express = require('express');
var bodyparser = require('body-parser');
var app = express();
session = require("express-session");
userModel = require("./model/user_model");
tweetModel = require("./model/tweet_model");
followModel = require("./model/follow_model");
const conn = require("./connect/conexion")
const redisClient = require ('./connect/redis')
var responseTime = require('response-time')
var jsonParser = bodyparser.json();
app.use(responseTime())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  next();
});

//------------------------CONEXIÓN A LA BASE DE DATOS Y AL SERVIDOR---------------------

conn.connect(
  function (err) { 
    if (err) {
      console.log("Error: no pudo conectarse a la base de datos", err);
      throw err;
    } 
    console.log("Conectado a la Base de Datos correctamente");
  }
)

app.listen(3000, () => {
  console.log("\nServidor HTTP funcionando correctamente");
});

/*------------------ USER ---------------------*/

app.get("/user", async (req, res, next) => {
  try {
    const reply = await redisClient.get("users");
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const user = await userModel.obtener();
    const saveResult = await redisClient.set("users",JSON.stringify(user), {
      EX: 10,
    });
    console.log("Datos almacenados (lista de usuarios): ",saveResult)
    res.send(user);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.get("/user/:id", async (req, res, next) => {
  try {
    let gID = req.params.id;
    const reply = await redisClient.get(gID);

    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const user= await userModel.obtenerId(gID);
    const saveResult = await redisClient.set(
      req.params.id,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );

    console.log("Dato almacenado (id):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post('/user', jsonParser, (req, res)=>{
  
  let username = req.body.username;
  let full_name = req.body.full_name;
  let user_description = req.body.user_description;

  const user_id =  userModel.insertar(username, full_name, user_description);
  res.json(user_id);
});

app.get("/user/username/:username", async (req, res, next) => {
  try {
    let gID = req.params.username;
    const reply = await redisClient.get(gID);
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }
    const user= await userModel.obtenerUser(gID);
    const saveResult = await redisClient.set(
      req.params.username,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );
    console.log("Dato almacenado (username):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});


/*------------------ TWEET ---------------------*/

app.get("/tweet", async (req, res, next) => {
  try {
    const reply = await redisClient.get("tweets");
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const tweet = await tweetModel.obtener();
    const saveResult = await redisClient.set("tweets",JSON.stringify(tweet), {
      EX: 35,
    });
    console.log(saveResult)
    res.send(tweet);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.get("/tweet/:id", async (req, res, next) => {
  try {
    let gID = req.params.id;
    const reply = await redisClient.get(gID);

    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const user= await tweetModel.obtenerId(gID);
    const saveResult = await redisClient.set(
      req.params.id,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );

    console.log("Dato almacenado (id):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post('/tweet', jsonParser, (req, res)=>{
  
  let user_id = req.body.user_id;
  let text_tweet = req.body.text_tweet;

  const post =  tweetModel.insertar(user_id, text_tweet);
  res.json(post);
});

app.get("/tweet/username/:username", async (req, res, next) => {
  try {
    let gID = req.params.username;
    const reply = await redisClient.get(gID);
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }
    const user= await tweetModel.obtenerUser(gID);
    const saveResult = await redisClient.set(
      req.params.username,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );
    console.log("Dato almacenado (username):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});


/*------------------ FOLLOW ---------------------*/

app.get("/follow", async (req, res, next) => {
  try {
    const reply = await redisClient.get("follows");
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const follow = await followModel.obtener();
    const saveResult = await redisClient.set("follows",JSON.stringify(follow), {
      EX: 35,
    });
    console.log(saveResult)
    res.send(follow);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.get("/follow/:follower_id", async (req, res, next) => {
  try {
    let gID = req.params.follower_id;
    const reply = await redisClient.get(gID);

    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }

    const user= await followModel.obtenerFollows(gID);
    const saveResult = await redisClient.set(
      req.params.follower_id,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );

    console.log("Dato almacenado (id):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.get("/follow/username/:username", async (req, res, next) => {
  try {
    let gID = req.params.username;
    const reply = await redisClient.get(gID);
    if (reply) {
      console.log("Usando datos de caché");
      return res.send(JSON.parse(reply));
    }
    const user= await followModel.obtenerUser(gID);
    const saveResult = await redisClient.set(
      req.params.username,
      JSON.stringify(user),
      {
        EX: 15,
      }
    );
    console.log("Dato almacenado (username):", saveResult);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

app.post('/follow', jsonParser, (req, res)=>{
  
  let follower_id = req.body.follower_id;
  let followee_id = req.body.followee_id;

  const follow =  followModel.insertar(follower_id,followee_id);
  res.json(follow);
});




