
//Pulls info from supabase

const {
    SUPA_DB_PATH,
    SUPA_DB_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPA_DB_PATH, SUPA_DB_KEY);

// Our standard serverless handler function
export const handler = async event => {

  let inputData=JSON.parse(event.body)

  let target_id=Number(inputData.user_id)

  // Query
    const { data, error } = await supabase
        .from('PetStatus')
        .select()//change this later
        .eq('user_id',target_id)

  

  // return data
  return {
    statusCode: 200,
    body: JSON.stringify({inputData,data})
    };
  
}