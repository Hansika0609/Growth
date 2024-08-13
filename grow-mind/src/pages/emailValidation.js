// src/utils/emailValidation.js
import * as XLSX from 'xlsx';

export const readEmailsFromExcel = (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const emails = jsonData.map(row => row.Email); // Assuming the column header is 'Email'
        resolve(emails);
      })
      .catch((error) => reject(error));
  });
};
