import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email ||
      !name ||
      name.trim() === '' ||
      !text ||
      !email.includes('@') ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    try {
      const newComment = {
        email,
        name,
        text,
        eventId,
      };
      const result = await db.collection('comments').insertOne(newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }
  } else if (req.method === 'GET') {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    try {
      const documents = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.status(200).json({ comments: documents });
    } catch (error) {
      console.log(error);
    } finally {
      client.close();
    }
  } else {
    res.redirect('/');
  }
}

export default handler;
