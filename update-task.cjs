const fs = require('fs');
const file = '/Users/rahicreativemedia/.gemini/antigravity-ide/brain/3e0a5dea-9fc6-4285-af84-20932ef093bf/task.md';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('- [ ] Fix `listPublicCategoriesFn`', '- [x] Fix `listPublicCategoriesFn`');
content = content.replace('- [ ] Update `resolveImage`', '- [x] Update `resolveImage`');
content = content.replace('- [ ] Inspect `upsertProduct`', '- [x] Inspect `upsertProduct`');

fs.writeFileSync(file, content, 'utf8');
