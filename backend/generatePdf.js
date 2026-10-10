const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateGuide = () => {
    try {
        const doc = new PDFDocument({ margin: 50 });
        const outputPath = path.join(__dirname, '..', 'Nritya_Shakti_Developer_Guide.pdf');
        const stream = fs.createWriteStream(outputPath);
        
        doc.pipe(stream);
        
        // 1. Cover Page
        doc.fontSize(30).font('Helvetica-Bold').text('Natya Shakti Academy', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(20).fillColor('gray').text('Master Developer Architecture Guide', { align: 'center' });
        doc.moveDown(2);
        
        // Add logo if exists
        const logoPath = path.join(__dirname, '..', 'frontend', 'public', 'logo.jpg');
        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, { fit: [500, 200], align: 'center' });
        }
        
        doc.addPage();

        // 2. High-Level Blueprint & Tech Stack
        // 2. High-Level Blueprint & Tech Stack
        doc.fillColor('black').fontSize(24).font('Helvetica-Bold').text('1. Tech Stack & Ecosystem');
        doc.moveDown(0.5);
        doc.fontSize(16).text('Frontend (What the user sees):');
        doc.fontSize(12).font('Helvetica').text('- React.js (Vite): This is the core library used to build the user interface. It makes the website fast by only updating what needs to change on the screen. We use Vite because it starts the development server instantly.');
        doc.text('- TailwindCSS: Instead of writing traditional CSS files, this allows the developer to style buttons and layouts directly by typing class names like "text-red-500".');
        doc.text('- React Router: This enables users to visit different pages (like /login or /classes) smoothly without reloading the entire website.');
        doc.text('- Framer Motion: Used to create all the beautiful, smooth scroll animations (like the sliding images) which makes the website feel alive.');
        
        doc.moveDown(1);
        doc.fontSize(16).font('Helvetica-Bold').text('Backend (How data is managed securely):');
        doc.fontSize(12).font('Helvetica').text('- Express.js (Node.js): This acts as the brain of the website in the background, receiving requests from the frontend (like "save this password") and processing them safely.');
        doc.text('- MongoDB & Mongoose: This is our database where all student details, passwords, and progress are stored safely like a spreadsheet.');
        doc.text('- JWT & Google OAuth: JWT represents digital keys we give to users so they stay logged in securely. Google OAuth lets them sign in via Google directly.');
        doc.text('- PDFKit & Nodemailer: PDFKit is uniquely used by instructors to automatically generate downloadable PDF certificates for students! Nodemailer sends OTP emails to users who forget their passwords.');
        doc.moveDown(2);

        // 3. System Architecture & Routing
        doc.fontSize(24).font('Helvetica-Bold').text('2. Component Matrix & Routing');
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica').text('Routing means deciding what page a user gets to see when they visit a specific URL, and making sure unauthorized people can\'t access private data.');
        doc.moveDown(0.5);
        
        doc.font('Helvetica-Bold').text('Public Routes (Open to everyone):');
        doc.font('Helvetica').text('Everything starting from the Home page (/), the About Us page, and the login page. Any guest on the internet can see and interact with these sections.');
        doc.moveDown(0.5);
        
        doc.font('Helvetica-Bold').text('Protected Dashboards (Hidden behind passwords):');
        doc.font('Helvetica').text('Because our website uses a smart role system in AuthContext.tsx, when a user logs in, they are sent to a completely different layout based on who they are:');
        doc.moveDown(0.2);
        doc.text('- Student Dashboard (/student): For dancers to see their class schedule, mark attendance, watch videos, and get PDF certificates.');
        doc.text('- Instructor Dashboard (/instructor): Gives teachers the power to check class attendance and mark courses as 100% complete so students can get certificates.');
        doc.text('- Admin Dashboard (/admin): Gives the management full control to manage instructors, manually upload classes, and watch over the entire academy operations instantly.');
        doc.moveDown(2);

        // 3. Developer Directory & File Structure (Locator Map)
        doc.addPage();
        doc.fontSize(24).font('Helvetica-Bold').text('3. Developer Directory Locator Map');
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica').text('Use this raw map to locate exact component architectures, specifically the Admin Dashboard components and backend routing:');
        doc.moveDown(1);
        
        doc.font('Courier').fontSize(10);
        doc.text('Nritya-Shakti-Academy/');
        doc.text('│');
        doc.text('├── backend/                       <-- Backend Root');
        doc.text('│   ├── controllers/               <-- API Logic');
        doc.text('│   │   ├── adminController.js     <-- Admin Data Endpoints');
        doc.text('│   │   ├── authController.js      <-- Login & Password APIs');
        doc.text('│   │   └── certificateController.js');
        doc.text('│   ├── models/                    <-- Mongoose DB Entities');
        doc.text('│   │   ├── User.js, Class.js, Attendance.js...');
        doc.text('│   ├── routes/                    <-- Express Routers');
        doc.text('│   │   ├── adminRoutes.js         <-- Admin API Boundaries');
        doc.text('│   └── server.js                  <-- Core Express Server Init');
        doc.text('│');
        doc.text('└── frontend/                      <-- Frontend Root (Vite/React)');
        doc.text('    ├── src/');
        doc.text('    │   ├── components/');
        doc.text('    │   │   ├── admin/             <-- Admin Specific Sub-Components');
        doc.text('    │   │   ├── AIChatBot.tsx      <-- Embedded AI Chat System');
        doc.text('    │   │   ├── Navbar.tsx         <-- Universal App Header');
        doc.text('    │   │   └── ProtectedRoute.tsx <-- Security Validation Layer');
        doc.text('    │   ├── context/');
        doc.text('    │   │   └── AuthContext.tsx    <-- Core Stateful Logic');
        doc.text('    │   ├── pages/');
        doc.text('    │   │   ├── AdminDashboard.tsx <-- Main Admin Control Node');
        doc.text('    │   │   ├── AuthPage.tsx       <-- Authentication/Forgot Pwd');
        doc.text('    │   │   ├── HomePage.tsx       <-- Core Landing Entry');
        doc.text('    │   │   └── StudentDashboard.tsx');
        doc.text('    │   └── App.tsx                <-- Router Combiner');
        doc.text('    └── public/                    <-- Static Image Assets');
        
        doc.font('Helvetica').fontSize(12);
        doc.moveDown(2);

        // 4. Database Schema
        doc.addPage();
        doc.fontSize(24).font('Helvetica-Bold').text('4. Core Database Models');
        doc.moveDown(0.5);
        doc.fontSize(14).text('The database is organized into 6 simple tables (collections) that handle all the data:');
        doc.moveDown();
        
        doc.fontSize(12).font('Helvetica-Bold').text('1. User Model (User.js):');
        doc.font('Helvetica').text('Stores all account details like Name, Email, and Password. It also checks if a user is an Admin, Instructor, or a Student. For students, it tracks how many classes they finished.');
        doc.moveDown();
        
        doc.font('Helvetica-Bold').text('2. Class Model (Class.js):');
        doc.font('Helvetica').text('Think of this as the timetable. It stores information about every dance class happening, including the class name, description, and schedule.');
        doc.moveDown();

        doc.font('Helvetica-Bold').text('3. Attendance Model (Attendance.js):');
        doc.font('Helvetica').text('The register log. Every time a student attends a class, a record is created here linking the Student with the specific Class and Date.');
        doc.moveDown();

        doc.font('Helvetica-Bold').text('4. Certificate Model (Certificate.js):');
        doc.font('Helvetica').text('Stores the direct link to the auto-generated PDF certificates that students earn when they complete a major program.');
        doc.moveDown();

        doc.font('Helvetica-Bold').text('5. Video Model (Video.js):');
        doc.font('Helvetica').text('Holds the links and details (like titles) for all the Masterclass video tutorials that Admins upload for students to watch.');
        doc.moveDown();

        doc.font('Helvetica-Bold').text('6. Enrollment Model (Enrollment.js):');
        doc.font('Helvetica').text('A simple linking table that keeps track of which student is currently registered into which specific Dance Program.');
        doc.moveDown(2);

        // 5. Visual Component References
        doc.addPage();
        doc.fontSize(24).font('Helvetica-Bold').text('4. Visual UI Integrations');
        doc.moveDown(1);
        doc.fontSize(12).font('Helvetica').text('Below are the core graphical assets implemented within the UI design system mapping:');
        doc.moveDown(2);

        const ganeshaPath = path.join(__dirname, '..', 'frontend', 'public', 'ganesha.png');
        if (fs.existsSync(ganeshaPath)) {
            doc.font('Helvetica-Bold').text('Ambient Design Layer (Ganesha):');
            doc.moveDown();
            doc.image(ganeshaPath, { fit: [200, 200], align: 'center' });
            doc.moveDown(12); // manually move down since fit float
        }
        
        doc.addPage();
        const instructorPath = path.join(__dirname, '..', 'frontend', 'public', 'ayushi.jpg');
        if (fs.existsSync(instructorPath)) {
            doc.font('Helvetica-Bold').text('Core Profile Integration Matrix:');
            doc.moveDown();
            doc.image(instructorPath, { fit: [300, 300], align: 'center' });
        }

        doc.end();
        console.log('PDF Compiled Successfully to:', outputPath);
    } catch (err) {
        console.error('Failed to generate PDF', err);
    }
};

generateGuide();
