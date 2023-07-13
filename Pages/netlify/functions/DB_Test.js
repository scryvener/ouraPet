
//Pulls info from supabase

const {
    SUPA_DB_PATH,
    SUPA_DB_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPA_DB_PATH, SUPA_DB_KEY);

// Our standard serverless handler function
exports.handler = async event => {

  let inputData=JSON.parse(event.body)

  var user_id=Number(inputData.user_id)
  var readiness_score=Number(inputData.readiness)
  var sleep_score=Number(inputData.sleep)
  var activity_score=Number(inputData.activity)
  var lvl=Number(inputData.lvl)

  // Query
  //pull based on user _id, then select the most recent entry for that user. 
  const { d1, e1 } = await supabase
      .from('PetStatus')
      .select()//change this later, should not be doing full select
      .eq('user_id',user_id)
      .order('created_at',{ascending:false})
      .limit(1)



  const { d2, e2 } = await supabase
  .from('PetStatus')
  .insert({user_id: user_id,readiness: readiness_score, sleep: sleep_score, activity: activity_score, pet_lvl: lvl,exp:d2.exp+5})
  .select()

  // return data
  return {
    statusCode: 200,
    body: JSON.stringify([d1,d2])
    };
  
}