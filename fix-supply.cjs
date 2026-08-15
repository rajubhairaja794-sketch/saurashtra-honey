const fs = require('fs');
const file = 'src/lib/supply-services-catalog.ts';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { supabase } from "@/integrations/supabase/client"')) {
  content = content.replace('import { z } from "zod";', 'import { z } from "zod";\nimport { supabase } from "@/integrations/supabase/client";');
}

// Fix only the public function listPublicSupplyServices
const regex = /export const listPublicSupplyServices = createServerFn\(\{ method: "POST" \}\)\.handler\(\n  async \(\): Promise<\{ rows: SupplyServiceRow\[\] \}> => \{\n    try \{\n            await seedWhoWeSupplyIfEmpty\(context\.supabase\);\n      const \{ data, error \} = await context\.supabase/g;

content = content.replace(regex, `export const listPublicSupplyServices = createServerFn({ method: "POST" }).handler(
  async (): Promise<{ rows: SupplyServiceRow[] }> => {
    try {
      await seedWhoWeSupplyIfEmpty(supabase);
      const { data, error } = await supabase`);

fs.writeFileSync(file, content, 'utf8');
