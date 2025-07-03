import * as XLSX from "xlsx";

export function exportJsonToExcel(data: any[], fileName = "users.xlsx") {
  if (!data || !data.length) return;

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  XLSX.writeFile(workbook, fileName);
}