const fs = require('fs');
const file = 'src/lib/coupons.functions.ts';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { supabase } from "@/integrations/supabase/client"')) {
  content = content.replace('import { z } from "zod";', 'import { z } from "zod";\nimport { supabase } from "@/integrations/supabase/client";');
}

// Fix validateCoupon signature
content = content.replace('async function validateCoupon(code: string, subtotal_paise: number)', 'async function validateCoupon(supabase: any, code: string, subtotal_paise: number)');

// Fix the call inside validateCoupon
content = content.replace('const { data, error } = await context.supabase\n    .from("coupons")', 'const { data, error } = await supabase\n    .from("coupons")');

// Fix trackOrderFn
content = content.replace('const { data: rows, error } = await context.supabase.rpc("track_order"', 'const { data: rows, error } = await supabase.rpc("track_order"');

fs.writeFileSync(file, content, 'utf8');
