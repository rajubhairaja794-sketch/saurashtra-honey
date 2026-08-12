import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'missing'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'missing'

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data: categories, error } = await supabase.from('categories').select('id, slug, image_url')
  if (error) throw error

  let updated = 0
  for (const cat of categories) {
    if (cat.image_url && cat.image_url.includes('/object/sign/')) {
      const url = new URL(cat.image_url)
      // replace /object/sign/ with /object/public/
      let newPath = url.pathname.replace('/object/sign/', '/object/public/')
      const newUrl = `${url.origin}${newPath}`
      
      console.log(`Fixing ${cat.slug}...`)
      console.log(`Old: ${cat.image_url}`)
      console.log(`New: ${newUrl}`)
      
      const { error: updateError } = await supabase.from('categories').update({ image_url: newUrl }).eq('id', cat.id)
      if (updateError) throw updateError
      updated++
    }
  }
  console.log(`Successfully fixed ${updated} records!`)
}

run().catch(console.error)
