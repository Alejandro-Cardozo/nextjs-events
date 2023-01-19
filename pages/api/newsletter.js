import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }

    try {
      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();
      await db.collection('emails').insertOne({ email: email });
      client.close();

      const success = `${email} has been successfully subscribed to our newsletter`;
      res.status(201).json({ message: success });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect('/');
  }
}

export default handler;
