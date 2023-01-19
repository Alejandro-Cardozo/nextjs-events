import { connect, insertOne, getAll } from '../../../utils/db-utils';

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

    let client;
    try {
      client = await connect();
    } catch (error) {
      res.status(500).json({ message: 'Unable to connect to database' });
      return;
    }

    try {
      const newComment = {
        email,
        name,
        text,
        eventId,
      };
      await insertOne(client, 'comments', newComment);
      res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      res.status(500).json({
        message: 'Unexpected error while inserting the data',
        error: error,
      });
    }
    client.close();
  } else if (req.method === 'GET') {
    let client;
    try {
      client = await connect();
    } catch (error) {
      res.status(500).json({
        message: 'Unable to connect to database',
        error: error,
      });
      return;
    }
    try {
      const documents = await getAll(
        client,
        'comments',
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({
        message: 'Unexpected error while getting the data',
        error: error,
      });
    }
    client.close();
  } else {
    res.redirect('/');
  }
}

export default handler;
