function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, comment } = req.body;
    try {
      const date = new Date();
      console.log(`Thanks for commenting on this event, ${name}`);
      res.json({ email: email, name: name, comment: comment, time: date });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === 'GET') {
    const id = req.query.eventId;
    try {
      res.send('look for the comments of the event: ' + id);
    } catch (error) {}
  } else {
    res.redirect('/');
  }
}

export default handler;
