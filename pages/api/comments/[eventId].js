function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === 'POST') {
    const { email, name, comment } = req.body;
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
        comment,
      };
      res.status(201).json({ message: 'Comment added', comment: newComment });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === 'GET') {
    try {
      const dummyList = [
        { id: 're1', name: 'Leon', comment: "I can't wait for it to start!!" },
        { id: 're2', name: 'Ada', comment: 'Looking forward to the day!' },
      ];
      res.status(200).json({ comments: dummyList });
    } catch (error) {}
  } else {
    res.redirect('/');
  }
}

export default handler;
