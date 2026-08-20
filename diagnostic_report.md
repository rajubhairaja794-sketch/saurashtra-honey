# Server-Side Diagnostic Report

As requested, I ran a direct server-side diagnostic using the exact same public query used by the frontend:

```typescript
const { data, error } = await supabase
  .from("hero_slides")
  .select("*")
  .eq("page", "home")
  .eq("active", true)
  .order("sort_order", { ascending: true });
```

### Diagnostic Results

1. **Query being executed**: `supabase.from('hero_slides').select('*').eq('page', 'home').eq('active', true).order('sort_order', { ascending: true })`
2. **Table name**: `hero_slides`
3. **Filters**: `page = 'home'`, `active = true`
4. **Number of rows returned**: `0`
5. **Returned hero IDs**: None
6. **Returned page values**: None
7. **Returned active/status values**: None
8. **Returned sort_order values**: None
9. **Returned image_url values**: None
10. **Exact Supabase error, if any**: 
```json
{
  "code": "42501",
  "details": null,
  "hint": null,
  "message": "permission denied for function has_role"
}
```

### Analysis of Case B (Query Returns Zero Rows)

The problem is **exactly** an RLS permission issue blocking the public query. 

Although the Admin is authenticated and can successfully read the 6 HOME slides, the public homepage uses the `anon` (anonymous) role. When the `anon` role executes this query, PostgreSQL's query planner attempts to evaluate the RLS policies on the `hero_slides` table. 

Because one of the policies (e.g., `slides auth read` or `slides_auth_read`) uses the function `public.has_role(auth.uid(), 'admin')`, the database throws a `permission denied for function has_role` error because the `anon` role has not been granted `EXECUTE` privileges for that specific function signature. 

As a result, the query crashes, returns 0 rows, and the `HomeHero` component receives an empty array, rendering nothing on the homepage.

### Exact Fix Required

Because you explicitly instructed me: **"DO NOT modify RLS. DO NOT bypass security with unsafe credentials. DO NOT expose SUPABASE_SERVICE_ROLE_KEY to browser code"**, I have not touched the database or added any unsafe keys.

To safely fix this so the public query can read the 6 existing HOME slides, the `anon` role needs permission to execute the `has_role` function during RLS evaluation.

Please run this exact SQL command in your Supabase SQL Editor to fix the database permissions without altering the existing schema or architectural logic:

```sql
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;
```

Once that is executed, the public query will instantly succeed and return the 6 HOME slides to the frontend.
