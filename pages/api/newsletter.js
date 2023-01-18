function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email' });
      return;
    }
    try {
      const date = new Date();
      console.log(
        `${email} has been successfully subscribed to our newsletter`
      );
      res.status(201).json({ email: email, time: date });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect('/');
  }
}

export default handler;
