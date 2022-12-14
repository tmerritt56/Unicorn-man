async function commentFormHandler(event){
  event.preventDefault();
  const comment_content = document
    .querySelector('textarea[name="comment-content"]')
    .value.trim();
  const post_id = document.querySelector('.id-holder').dataset.id
  if (comment_content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_content,post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
