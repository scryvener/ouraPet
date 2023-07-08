
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

  let inputData=event.body

  let target_id=inputData.user_id

  // Query
    const { data, error } = await supabase
        .from('PetStatus')
        .select()
        .eq('user_id',target_id)

  console.log(data)

  // return data
  return {
    statusCode: 200,
    body: JSON.stringify(data)
    };
  
}