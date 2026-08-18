import { supabase } from './src/integrations/supabase/client';
import { publishCategoriesJSON } from './src/lib/admin-cms.functions';

async function run() {
    try {
        await publishCategoriesJSON(supabase);
        console.log("Success");
    } catch (e) {
        console.error("Failed:", e);
    }
}
run();
