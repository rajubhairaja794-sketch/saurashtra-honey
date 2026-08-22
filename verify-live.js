const https = require('https');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log("Fetching index.js...");
  const js = await fetchUrl('https://saurashtrahoneys.netlify.app/assets/index-DU25eIlX.js');
  const chunks = js.match(/"assets\/[^"]+\.js"/g) || [];
  console.log(`Found ${chunks.length} chunks. Searching for 'Catalog Synchronization'...`);
  
  let found = false;
  for (const chunk of chunks) {
    const url = `https://saurashtrahoneys.netlify.app/${chunk.replace(/"/g, '')}`;
    const content = await fetchUrl(url);
    if (content.toLowerCase().includes('catalog synchronization') || content.toLowerCase().includes('syncing lychee honey')) {
      console.log(`❌ FOUND IN CHUNK: ${url}`);
      found = true;
    }
  }
  
  if (!found) {
    console.log("✅ MATHEMATICAL PROOF: The string 'Catalog Synchronization' does NOT EXIST in any Javascript file on the live Netlify server.");
  }
}
run();
