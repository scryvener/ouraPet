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

  var user_id=Number(inputData.user_id)
  var readiness_score=inputData.readiness
  var sleep_score=inputData.sleep
  var activity_score=inputData.activity
  var lvl=inputData.lvl
  //will eventually have other data as well, like the exp update, how much for a lvl up, etc.

  //depending on if we want to keep history, either update or insert a new row(rows have timestampes, so technically can track)
//feels like history is the right way to go, since stats over time would be nice. 


  //we will do update for now


  //used to track if update went through
  
  var timeNow=new Date(Date.now())
  
  //change this to upsert?

  const { data, error } = await supabase
  .from('PetStatus')
  .update({ created_at:timeNow.toISOString(), readiness: Number(readiness_score), sleep: Number(sleep_score), activity: Number(activity_score), pet_lvl: Number(lvl)})
  .eq('user_id', user_id)
  .select()

  updateStatus='DB Updated'

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
    body: JSON.stringify({message: [data,error]})
    };
  
}