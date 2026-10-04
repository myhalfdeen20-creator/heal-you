const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware fleksibel untuk avatar: case-insensitive & toleran ekstensi (.jpg / .webp / .png)
const avatarsDir = path.join(__dirname, 'public', 'avatars');
app.get('/avatars/:filename', (req, res, next) => {
  const reqName = req.params.filename.toLowerCase();
  const reqBaseName = path.parse(reqName).name;

  fs.readdir(avatarsDir, (err, files) => {
    if (err || !files) return next();

    // 1. Cocokkan nama persis tanpa memedulikan huruf besar/kecil
    let match = files.find(f => f.toLowerCase() === reqName);

    // 2. Jika tidak ditemukan (misal kodingan panggil .webp tapi file tersimpan .jpg), cocokkan nama dasarnya
    if (!match) {
      match = files.find(f => path.parse(f.toLowerCase()).name === reqBaseName);
    }

    if (match) {
      return res.sendFile(path.join(avatarsDir, match));
    }
    next();
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

