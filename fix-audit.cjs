const fs = require('fs');

const file = 'src/lib/admin-cms.functions.ts';
let content = fs.readFileSync(file, 'utf8');

// Update audit function signature
content = content.replace(
`async function audit(
  actor: string,
  action: string,
  entity_type?: string,
  entity_id?: string,
  metadata: Record<string, unknown> = {},
) {
    await context.supabase`,
`async function audit(
  supabase: any,
  actor: string,
  action: string,
  entity_type?: string,
  entity_id?: string,
  metadata: Record<string, unknown> = {},
) {
    await supabase`
);

// Update calls to audit
content = content.replace(/await audit\(context\.userId/g, 'await audit(context.supabase, context.userId');

// Ensure that multi-line calls to audit like the one on line 966 are covered:
/*
966:    await audit(
967:      context.userId,
*/
content = content.replace(/await audit\(\n\s*context\.userId/g, 'await audit(\n      context.supabase,\n      context.userId');

fs.writeFileSync(file, content, 'utf8');
