const fs = require('fs');

const file = 'src/lib/blog-server.functions.ts';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('import { supabase } from "@/integrations/supabase/client"')) {
  content = content.replace('import { z } from "zod";', 'import { z } from "zod";\nimport { supabase } from "@/integrations/supabase/client";');
}

content = content.replace(/context\.supabase/g, 'supabase');
fs.writeFileSync(file, content, 'utf8');
