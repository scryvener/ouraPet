

const {
    SUPA_DB_PATH,
    SUPA_DB_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPA_DB_PATH, SUPA_DB_KEY);

// Our standard serverless handler function
exports.handler = async event => {

  // Insert a row
    const { data, error } = await supabase
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
        ]);

    
  // Did it work?
  return {
    statusCode: 200,
    body: JSON.stringify({message: [data,error]})
    };
  
}