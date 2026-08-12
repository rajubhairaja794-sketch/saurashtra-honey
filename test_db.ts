import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'missing'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data, error } = await supabase.from('categories').select('slug, image_url')
  console.log(error, data)
}
test()
