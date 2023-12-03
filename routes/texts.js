const express = require('express');
const xlsx = require('xlsx');
const app = express();

// Read Excel file and convert to JSON
function readExcelFile() {
    const workbook = xlsx.readFile('../texts.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

// Endpoint to get content from Excel file
app.get('/api/content', (req, res) => {
    const content = readExcelFile();
    res.json(content);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})