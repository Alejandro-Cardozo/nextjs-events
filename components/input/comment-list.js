import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>I can't wait for it to start!!</p>
        <div>
          By <address>Leon</address>
        </div>
      </li>
      <li>
        <p>Looking forward to the day!</p>
        <div>
          By <address>Ada</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;