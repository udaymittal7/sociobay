import { RequestHandler } from 'express';
import firebaseAdmin from 'firebase-admin';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebaseAdmin.initializeApp(firebaseConfig);

const firebaseAuthMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send();
  }

  try {
    // Here we authenticate users be verifying the ID token that was sent
    const token = await firebaseAdmin.auth().verifyIdToken(authHeader);

    // Here we authorize users to use this application only if they have a
    // Twilio email address. The logic in this if statement can be changed if
    // you would like to authorize your users in a different manner.
    if (token.email && /@twilio.com$/.test(token.email)) {
      next();
    } else {
      res.status(401).send();
    }
  } catch {
    res.status(401).send();
  }
};

export default module.exports = firebaseAuthMiddleware;
