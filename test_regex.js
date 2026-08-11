function resolveImage(url) {
  let cleanUrl = url?.trim();
  if (cleanUrl) {
    if (cleanUrl.includes('lxdkcqdkfuuqjudsysrr.supabase.co') || cleanUrl.includes('/media/')) {
       const parts = cleanUrl.split('/media/');
       let path = parts[parts.length - 1];
       path = path.split('?')[0].split('#')[0];
       // Check if path has any duplicate domain inside it due to malformed string
       if (path.includes('supabase.co')) {
           // fallback to extracting the last part of path if it's messed up
           const pathParts = path.split('/');
           path = "hero/" + pathParts[pathParts.length - 1]; // Assuming it's hero/
       }
       return `https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/${path}`;
    }
    
    if (/^https?:\/\//i.test(cleanUrl)) {
      return cleanUrl;
    }
    return `https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/${cleanUrl.replace(/^\//, '')}`;
  }
  return 'fallback';
}

console.log(1, resolveImage("https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/sign/media/hero/1786.png?token=123"));
console.log(2, resolveImage("https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/hero/1786.png"));
console.log(3, resolveImage("media/hero/1786.png"));
console.log(4, resolveImage("hero/1786.png"));
console.log(5, resolveImage("https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/https://lxdkcqdkfuuqjudsysrr.supabase.co/storage/v1/object/public/media/hero/1786.png"));
console.log(6, resolveImage("https://other-domain.com/image.png"));
