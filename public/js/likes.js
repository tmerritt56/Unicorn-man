// let user_credits = 0;
// let post_credits = 0;
// let user_rewards = 0;
// const creditUser = async () => {

//     const user_credit = document.querySelector('#user_credit').value;

//     const response = await fetch('api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//             user_credit
//         })
//         headers: { 'Content-Type': 'application/json'},
//     });

//     if

// }

const likeButton = document.querySelector('#like-credit');

function likefunction() {
  const likeTarget = document.querySelector('#post-credit');

  likeTarget.value + 1;
}

likeButton.addEventListener('click', likefunction);
