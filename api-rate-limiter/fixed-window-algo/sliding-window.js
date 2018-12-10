let memo = {}, GLOBAL_COUNT_LIMIT = 3;

let intervalId = setInterval(() => {
  let users = ['bob', 'john', 'padro', 'pablo', 'flaco'],
  randomUser = users[Math.floor(Math.random() * 4)];

  console.log(`   Init ${randomUser} request...`);
  console.log(main({ user_id: randomUser, time_stamp: Date.now() }));
}, 500);

setTimeout(() => {
  console.log('killing...');
  killScenario(intervalId);
}, 5000);

function main({ user_id, time_stamp }){
  // the user's ID is already in the memo,
  if (user_id in memo) {
    // but a second has past since their last request, so
    // 1) reset their count,
    // 2) and save the time.
    let savedReqs = memo[user_id].filter((time) => (time_stamp - time < 1000) ? false : true);

    if (savedReqs.length < GLOBAL_COUNT_LIMIT) {
      memo[user_id].push(time_stamp);
    } else {
      console.log(memo)
      return new Error('429: Request limit exceeded.');
    }
  } else {
    memo[user_id] = [time_stamp];
  }
  return `${user_id} request ACCEPTED`;
}

function killScenario(id) {
  clearInterval(id);
}
