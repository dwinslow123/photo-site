import React from 'react';

export const Comment = (props) => {
  const { text, author } = props.comment;
  return (
    <div>
      <div className="Comment">{text}</div>
      <div className="Author">{author}</div>
    </div>
  )
};