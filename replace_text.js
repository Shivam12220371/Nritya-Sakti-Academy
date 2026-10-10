const fs = require('fs');
const path = require('path');

const files = [
  'backend/controllers/certificateController.js',
  'backend/controllers/userController.js',
  'backend/routes/chatRoute.js',
  'backend/generatePdf.js',
  'frontend/index.html',
  'frontend/src/components/Navbar.tsx',
  'frontend/src/components/Footer.tsx',
  'frontend/src/components/GoogleReviews.tsx',
  'frontend/src/pages/ContactUs.tsx',
  'frontend/src/components/AIChatBot.tsx',
  'frontend/src/pages/ProgramDetails.tsx',
  'frontend/src/pages/AboutUs.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace standard capitalization
    content = content.replace(/Nritya Shakti/g, 'Natya Shakti');
    // Replace lower case if any
    content = content.replace(/nritya shakti/g, 'natya shakti');
    // Replace split in Navbar/Footer
    content = content.replace(/NRITYA(<[^>]+>)*SHAKTI/g, 'NATYA$1SHAKTI');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Replaced in', file);
  } else {
    console.error('File not found:', file);
  }
});
