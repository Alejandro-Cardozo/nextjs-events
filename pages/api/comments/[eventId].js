function handler(req, res) {
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
    try {
      console.log(`Thanks for commenting on this event, ${name}`);
      const date = new Date().toISOString();
      const newComment = {
        id: date,
        email,
        name,
        text,
      };
      res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === 'GET') {
    try {
      const dummyList = [
        { id: 're1', name: 'Leon', text: "I can't wait for it to start!!" },
        { id: 're2', name: 'Ada', text: 'Looking forward to the day!' },
        { id: 're3', name: 'Albert', text: 'Bring chips plz' },
      ];
      res.status(200).json({ comments: dummyList });
    } catch (error) {}
  } else {
    res.redirect('/');
  }
}

export default handler;
