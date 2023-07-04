

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
        .from('Test')
        .insert([
            { note: 'I need to not forget this' },
        ]);

  // Did it work?
  console.log(data, error);
  
}