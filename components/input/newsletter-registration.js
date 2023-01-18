import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
