const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const { createClient } = require('@supabase/supabase-js');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const testDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .rpc('test_connection');

    if (error) throw error;
    console.log('✅ Supabase connected successfully. Response:', data);
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
    process.exit(1);
  }
};

module.exports = {
  supabase,
  testDatabaseConnection,
};