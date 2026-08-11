const fs = require('fs');

async function fix() {
  const envFile = fs.readFileSync('.env', 'utf8');
  const getEnv = (key) => {
    const match = envFile.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
    return match ? match[1] : null;
  };

  const url = getEnv('SUPABASE_URL');
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY');

  const res = await fetch(`${url}/rest/v1/hero_slides?select=id,image_url,mobile_image_url`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });

  const slides = await res.json();
  
  for (const slide of slides) {
    let changed = false;
    const updates = {};
    
    if (slide.image_url && slide.image_url.includes('/object/sign/')) {
      updates.image_url = slide.image_url.replace('/object/sign/', '/object/public/').split('?')[0];
      changed = true;
    }
    
    if (slide.mobile_image_url && slide.mobile_image_url.includes('/object/sign/')) {
      updates.mobile_image_url = slide.mobile_image_url.replace('/object/sign/', '/object/public/').split('?')[0];
      changed = true;
    }
    
    if (changed) {
      console.log(`Fixing slide ${slide.id}...`);
      const patchRes = await fetch(`${url}/rest/v1/hero_slides?id=eq.${slide.id}`, {
        method: 'PATCH',
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      console.log(patchRes.status);
    }
  }
  console.log("Done.");
}

fix().catch(console.error);
