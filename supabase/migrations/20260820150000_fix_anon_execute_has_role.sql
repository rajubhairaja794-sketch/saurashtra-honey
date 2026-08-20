-- Grant execute on has_role and is_staff to anon so that RLS policies using them don't crash
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;
GRANT EXECUTE ON FUNCTION public.is_staff(uuid) TO anon;
