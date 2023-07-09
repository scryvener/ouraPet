//updates Supabase with data, handles if it is a new or existing user or now

const {
    SUPA_DB_PATH,
    SUPA_DB_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPA_DB_PATH, SUPA_DB_KEY);

// Our standard serverless handler function
exports.handler = async event => {

  //bring in data
  var inputData=JSON.parse(event.body)

  var user_id=inputData.user_id
  var readiness_score=inputData.readiness
  var sleep_score=inputData.sleep
  var activity_score=inputData.activity
  //will eventually have other data as well, like the exp update, how much for a lvl up, etc.

  //depending on if we want to keep history, either update or insert a new row(rows have timestampes, so technically can track)

  //we will do update for now


  //used to track if update went through
  var updateStatus

  //pull in the last updated for the user_id and check when it was last done. (prob need a more generic DB query function?)

  const { check_data, check_error } = await supabase
        .from('PetStatus')
        .select('user_id','created_at')
        .eq('user_id',user_id)

  let last_updated=Date.parse(check_data)
  let timeNow=Date.now()

  let timeDiff=(timeNow-last_updated)/86400000


  //change this to upsert
  //update only if more than one day has passed
  if (timeDiff>1){
    const { data, error } = await supabase
    .from('PetStatus')
    .update({ readiness: Number(readiness_score), sleep: Number(sleep_score), activity: Number(activity_score) })
    .eq('user_id', user_id)
    .select()

    updateStatus='DB Updated'

  } else{
    //updateStatus='No Update Performed, not enough time has passed '+String(timeDiff)
    updateStatus=String(last_updated)+' '+String(timeNow)+' '+String(check_data)
  }

  

  // Insert a row
    /* const { data, error } = await supabase
        .from('PetStatus')
        .insert([
            { user_id: 1,
             pet_id: 1,
             pet_lvl: 1,
             readiness: 60,
             sleep: 70, 
             activity: 100,
             bonus_track: 0
            },
        ]); */

    
  // probably don't need to send back the data
  return {
    statusCode: 200,
    body: JSON.stringify({message: updateStatus})
    };
  
}