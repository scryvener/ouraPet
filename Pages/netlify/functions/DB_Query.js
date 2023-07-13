
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

  let target_id=Number(inputData.user_id)

  // Query
  //pull based on user _id, then select the most recent entry for that user. 
    const { data, error } = await supabase
        .from('PetStatus')
        .select()//change this later, should not be doing full select
        .eq('user_id',target_id)
        .order('created_at',{ascending:false})
        .limit(1)

  

  // return data
  return {
    statusCode: 200,
    body: JSON.stringify(data)
    };
  
}