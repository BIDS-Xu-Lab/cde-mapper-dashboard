import * as XLSX from 'xlsx';

export const upid = () => {
    return Math.random().toString(36).substring(2, 9);
}

export const strNow = () => {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export const cut = (str, len=42) => {
    let _str = "" + str;
    if (_str.length > len) {
        return _str.substring(0, len) + "...";
    } else {
        return _str;
    }
}

export async function readFileAsync(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(new Uint8Array(event.target.result));
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file); // Or any other read method
    });
}

export async function readXLSXAsync(file) {
    // read the binary data
    const data = await readFileAsync(file);

    // read the workbook from the data
    const workbook = XLSX.read(data);

    // read sheet names
    const sheet_names = workbook.SheetNames;

    // TODO: read all sheets
    const first_sheet_name = sheet_names[0];
    const worksheet = workbook.Sheets[first_sheet_name];

    // convert to JSON
    const json_data = XLSX.utils.sheet_to_json(worksheet);

    return json_data;
}

export function downloadXLSXAsync(data, filename) {
    // use SheetJS to convert the data to a XLSX file
    let ws = XLSX.utils.json_to_sheet(data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'patients');
    XLSX.writeFile(wb, filename);
}