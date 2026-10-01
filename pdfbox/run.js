import markdownpdf from 'markdown-pdf';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mdFile = path.join(__dirname, '..', 'Nritya_Shakti_Architecture.md');
const pdfFile = path.join(__dirname, '..', 'Nritya_Shakti_Developer_Guide.pdf');

markdownpdf().from(mdFile).to(pdfFile, function () {
    console.log("PDF Created Successfully!");
});
