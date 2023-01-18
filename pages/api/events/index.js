function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    try {
      const date = new Date();
      console.log(`Thanks, your email ${email} has been successfully subscribed to our newsletter`)
      res.json({ email: email, time: date })
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler;