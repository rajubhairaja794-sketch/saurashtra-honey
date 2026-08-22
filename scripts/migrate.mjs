import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE credentials. Make sure you run with --env-file=.env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const productsPath = path.join(__dirname, '..', 'public', 'products.json'); ``
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const assetsDir = path.join(__dirname, '..', 'src', 'assets');

async function ensureBucket() {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
        console.error("Failed to list buckets:", error.message);
        return;
    }
    const exists = buckets.some(b => b.name === 'product_images');
    if (!exists) {
        console.log("Bucket 'product_images' not found. Attempting to create it...");
        const { error: createError } = await supabase.storage.createBucket('product_images', {
            public: true,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
            fileSizeLimit: 10485760 // 10MB
        });
        if (createError) {
            console.error("Failed to create bucket 'product_images':", createError.message);
            console.log("Please create the 'product_images' bucket manually in the Supabase Dashboard and set it to Public.");
        } else {
            console.log("Bucket 'product_images' created successfully.");
        }
    }
}

async function uploadImage(filename) {
    if (!filename) return { key: null, status: 'skipped' };
    const filePath = path.join(assetsDir, filename);
    if (!fs.existsSync(filePath)) {
        return { key: null, status: 'missing' };
    }

    const fileBuf = fs.readFileSync(filePath);
    const contentType = filename.endsWith('.png') ? 'image/png' : (filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg');

    const { error } = await supabase.storage.from('product_images').upload(`legacy/${filename}`, fileBuf, {
        upsert: true,
        contentType: contentType
    });

    if (error) {
        return { key: null, status: 'failed', error: error.message };
    }

    return { key: `legacy/${filename}`, status: 'success' };
}

async function run() {
    await ensureBucket();

    let migratedCount = 0;
    let failedCount = 0;
    let imagesUploaded = 0;
    let imagesSkipped = 0;
    let imagesFailed = 0;

    console.log(`Starting migration of ${products.length} products...\n`);

    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        console.log(`[${i + 1}/${products.length}] ${p.slug}`);

        let productFailed = false;

        // 1. Upload images
        const mainImgResult = await uploadImage(p.image);
        if (mainImgResult.status === 'success') imagesUploaded++;
        else if (mainImgResult.status === 'missing' || mainImgResult.status === 'skipped') imagesSkipped++;
        else { imagesFailed++; console.log(`  ✗ Main image upload failed: ${mainImgResult.error}`); }

        const allImagesKeys = [];

        for (const img of (p.images || [])) {
            const res = await uploadImage(img);
            if (res.status === 'success') { imagesUploaded++; allImagesKeys.push(res.key); }
            else if (res.status === 'missing' || res.status === 'skipped') imagesSkipped++;
            else { imagesFailed++; console.log(`  ✗ Image upload failed (${img}): ${res.error}`); }
        }

        for (const img of (p.additionalImages || [])) {
            const res = await uploadImage(img);
            if (res.status === 'success') { imagesUploaded++; allImagesKeys.push(res.key); }
            else if (res.status === 'missing' || res.status === 'skipped') imagesSkipped++;
            else { imagesFailed++; console.log(`  ✗ Additional image upload failed (${img}): ${res.error}`); }
        }

        if (mainImgResult.status === 'success' || allImagesKeys.length > 0) {
            console.log(`  ✓ Images processed`);
        }

        // 2. Insert product
        const { data: prodData, error: pErr } = await supabase.from('products').upsert({
            slug: p.slug,
            name: p.name,
            tagline: p.tagline || null,
            description: p.description || null,
            category: p.category || null,
            flora: p.flora || null,
            badge: p.badge || null,
            price: p.price,
            price_max: p.priceMax || null,
            mrp: p.mrp || null,
            rating: p.rating || 0,
            reviews_count: p.reviews || 0,
            sizes: p.sizes || [],
            benefits: p.benefits || [],
            image_key: mainImgResult.key || null,
            image_url: mainImgResult.key ? supabase.storage.from('product_images').getPublicUrl(mainImgResult.key).data.publicUrl : null,
            images: allImagesKeys,
            attributes: p.attributes || {},
            published: true
        }, { onConflict: 'slug' }).select('id').single();

        if (pErr) {
            console.log(`  ✗ Product upsert failed: ${pErr.message}`);
            productFailed = true;
        } else {
            console.log(`  ✓ Product upserted`);

            if (p.variants && p.variants.length > 0) {
                console.log(`  ✓ Variants processed (variants data retained in attributes if applicable)`);
            }
        }

        if (productFailed) {
            failedCount++;
        } else {
            migratedCount++;
            console.log(`  ✓ Product completed`);
        }
        console.log('');
    }

    console.log(`Migration summary`);
    console.log(`-----------------`);
    console.log(`Products processed: ${products.length}`);
    console.log(`Products successfully migrated: ${migratedCount}`);
    console.log(`Products failed: ${failedCount}`);
    console.log(`Images uploaded: ${imagesUploaded}`);
    console.log(`Images skipped: ${imagesSkipped}`);
    console.log(`Images failed: ${imagesFailed}`);
    console.log('');

    const { count: totalProds } = await supabase.from('products').select('*', { count: 'exact', head: true });
    console.log(`Total Products in Supabase: ${totalProds}`);
}

run();
