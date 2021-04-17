import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

const serviceAccount = fs.readFileSync(
    path.resolve(__dirname, "../lptroisd-firebase-adminsdk.json"),
    "utf-8");
firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(serviceAccount)),
});

const db = firebase.firestore();

export const getBestScores = functions.https.onRequest(
    async (request, response) => {
      response.header("Content-Type", "application/json");
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Content-Type");

      if (request.method !== "GET") {
        response.statusCode = 403;
        response.send("Unauthorized");
      }

      const topScoresSnapshot = await db.collection("scores")
          .orderBy("score", "desc")
          .limit(5)
          .get();
      const topScores = topScoresSnapshot.docs.map((score) => score.data());

      response.send(topScores);
    });

export const addScore = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    response.statusCode = 403;
    response.send("Unauthorized");
  } else {
    const body = JSON.parse(request.body);


    if (body.data && Number.isInteger(body.data.score) &&
        body.data.score < 20000 &&
        body.data.name &&
        body.data.name.length < 15) {
      db.collection("scores").add(body.data).then(() => {
        response.send("Score save :)");
      }).catch(() => {
        response.statusCode = 500;
        response.send("An error occurred while adding the score :(");
      });
    } else {
      response.send("Score was an invalid score");
    }
  }
});
