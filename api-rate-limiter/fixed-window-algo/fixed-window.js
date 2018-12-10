let memo = {}, GLOBAL_COUNT_LIMIT = 2;

setTimeout(() => {
  let scenarioID = startTest();
  killScenario()
}, 5000);


let startTest = setInterval(() => {
  let users = ['bob', 'john', 'padro', 'pablo', 'flaco'];
  let randomUser = Math.floor(Math.random() * 4);
  try {
    main(randomUser, Date.now());
  } catch (e) {
    console.log('Error: ', e);
  }
}, 500);

function main({ user_id, time_stamp }){
  // the user's ID is already in the memo,
  if (user_id in memo) {
    // but a second has past since their last request, so
    // 1) reset their count,
    // 2) and save the time.
    if (memo[user_id].time - time_stamp >= 1000) {
      memo[user_id].time = time_stamp;
      memo[user_id].count = 1;
      // the user's ID is already and a second has not yet passed, so verify their count is below tolerance...
      // if so, allow the request to pass through.
      // if not, reject the request.
    } else {
      if (memo[user_id].count >= GLOBAL_COUNT_LIMIT) {
        return new Error('429 | Rate limit exceeded. Please try again later.');
      } else {
        memo[user_id].count += 1;
      }
    }
  } else {
    memo[user_id] = {
      count: 1,
      time: time_stamp,
    }
  }
  return `${user_id} request ACCEPTED`;
}

function killScenario(id) {
  clearInterval(id);
}
