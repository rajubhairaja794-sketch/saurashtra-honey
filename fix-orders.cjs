const fs = require('fs');
const file = 'src/lib/orders.functions.ts';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { supabase } from "@/integrations/supabase/client"')) {
  content = content.replace('import { z } from "zod";', 'import { z } from "zod";\nimport { supabase } from "@/integrations/supabase/client";');
}

content = content.replace('async function resolveCoupon(code: string | undefined, subtotalPaise: number)', 'async function resolveCoupon(supabaseClient: any, code: string | undefined, subtotalPaise: number)');
content = content.replace('async function insertOrderRow(data: z.infer<typeof createSchema>, userId: string | null)', 'async function insertOrderRow(supabaseClient: any, data: z.infer<typeof createSchema>, userId: string | null)');
content = content.replace('async function verifyAndMarkPaid(data: z.infer<typeof verifySchema>, callerUserId: string | null)', 'async function verifyAndMarkPaid(supabaseClient: any, data: z.infer<typeof verifySchema>, callerUserId: string | null)');

content = content.replace(/context\.supabase/g, 'supabaseClient');

// Now fix callers
content = content.replace('insertOrderRow(data, context.userId)', 'insertOrderRow(context.supabase, data, context.userId)');
content = content.replace('insertOrderRow(data, null)', 'insertOrderRow(supabase, data, null)');

content = content.replace('verifyAndMarkPaid(data, context.userId)', 'verifyAndMarkPaid(context.supabase, data, context.userId)');
content = content.replace('verifyAndMarkPaid(data, null)', 'verifyAndMarkPaid(supabase, data, null)');

// Inside insertOrderRow we have resolveCoupon
content = content.replace('const coupon = await resolveCoupon(data.coupon_code, subtotalPaise);', 'const coupon = await resolveCoupon(supabaseClient, data.coupon_code, subtotalPaise);');

fs.writeFileSync(file, content, 'utf8');
