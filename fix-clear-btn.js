const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// The user is asking where to start over when they are on the Result page. Let's make sure the Result Dashboard has an Ulangi Tes button.
// Actually it has one, it was passed as onReset.
