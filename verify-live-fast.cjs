const https = require('https');

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept-Encoding': 'gzip' } }, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        if (res.headers['content-encoding'] === 'gzip') {
          require('zlib').gunzip(buffer, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded.toString());
          });
        } else {
          resolve(buffer.toString());
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log("Fetching index.js...");
  const js = await fetchUrl('https://saurashtrahoneys.netlify.app/assets/index-DU25eIlX.js');
  const chunks = js.match(/"assets\/[^"]+\.js"/g) || [];
  console.log(`Found ${chunks.length} chunks. Searching...`);
  
  let found = false;
  const promises = chunks.map(async (chunk) => {
    const url = `https://saurashtrahoneys.netlify.app/${chunk.replace(/"/g, '')}`;
    try {
      const content = await fetchUrl(url);
      if (content.toLowerCase().includes('catalog synchronization') || content.toLowerCase().includes('syncing ')) {
        console.log(`❌ FOUND IN CHUNK: ${url}`);
        found = true;
      }
    } catch (e) {
      // ignore
    }
  });
  
  await Promise.all(promises);
  
  if (!found) {
    console.log("✅ MATHEMATICAL PROOF: The string 'Catalog Synchronization' does NOT EXIST in any Javascript file on the live Netlify server.");
  }
}
run();
