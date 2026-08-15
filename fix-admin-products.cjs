const fs = require('fs');

const file = 'src/routes/admin.products.tsx';
let content = fs.readFileSync(file, 'utf8');

// We need to import resolveImage if it's not imported
if (!content.includes('import { resolveImage }')) {
  content = content.replace('import { listCategories, upsertCategory, uploadProductImage } from "@/lib/admin-cms.functions";', 'import { listCategories, upsertCategory, uploadProductImage } from "@/lib/admin-cms.functions";\nimport { resolveImage } from "@/lib/product-images";');
}

// Then replace r.image_url in the table rendering with resolveImage(r.image_key, r.image_url, "")
content = content.replace(/{r\.image_url \? <img src=\{r\.image_url\} alt=\{r\.name\} className="w-full h-full object-cover" loading="lazy" \/> : </, `{resolveImage(r.image_key, r.image_url, "") ? <img src={resolveImage(r.image_key, r.image_url, "")} alt={r.name} className="w-full h-full object-cover" loading="lazy" /> : <`);

fs.writeFileSync(file, content, 'utf8');
