import * as functions from "firebase-functions";
import * as fs from 'firebase-admin';

const serviceAccount = require('../lptroisd-firebase-adminsdk.json');

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

export const getBestScores = functions.https.onRequest(async (request, response) => {
  const topScoresSnapshot = await db.collection('scores').orderBy("score", "desc").limit(5).get();
  const topScores = topScoresSnapshot.docs.map((score) => score.data())

  response.send(topScores);
});

export const addScore = functions.https.onRequest((request, response) => {
  const dataScore = request.body.data;

  db.collection('scores').add(dataScore).then(() => {
    response.send('Score save :)');
  }).catch(() => {
    response.statusCode = 500;
    response.send('An error occurred while adding the score :(');
  })
});
