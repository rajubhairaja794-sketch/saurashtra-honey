const url = "https://lxdkcqdkfuuqjudsysrr.supabase.co/rest/v1/hero_slides?select=*";
const apikey = "sb_publishable_E3rv2tJCU_jTt1wL_TyWDQ_u1_9ztgY";
fetch(url, {
  headers: {
    "apikey": apikey,
    "Authorization": "Bearer " + apikey
  }
}).then(res => res.json()).then(data => console.log(JSON.stringify(data, null, 2))).catch(err => console.error(err));
