const fs = require('fs');
const path = require('path');
const os = require('os');
const src = path.join(os.homedir(), '.gemini', 'antigravity', 'brain', '3d43d6be-4978-43bf-879b-e014e6fa3271', 'purpose_passion_visual_1779724575742.png');
const dest = path.join(__dirname, 'public', 'purpose-passion.png');
fs.copyFileSync(src, dest);
console.log('Done');
