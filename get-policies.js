const apikey = process.env.SUPABASE_SERVICE_ROLE_KEY;
fetch("https://lxdkcqdkfuuqjudsysrr.supabase.co/rest/v1/rpc/exec_sql", {
  method: "POST",
  headers: {
    "apikey": apikey,
    "Authorization": "Bearer " + apikey,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ query: "SELECT policyname, permissive, roles, cmd, qual, with_check FROM pg_policies WHERE tablename = 'hero_slides';" })
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(err => console.error(err));
