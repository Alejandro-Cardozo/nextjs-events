import { connect, insertOne } from '../../utils/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
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
      await insertOne(client, 'newsletter', { email: email });
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      res.status(500).json({
        message: 'Unexpected error while inserting the data',
        error: error,
      });
    }
    client.close();
  } else {
    res.redirect('/');
  }
}

export default handler;
