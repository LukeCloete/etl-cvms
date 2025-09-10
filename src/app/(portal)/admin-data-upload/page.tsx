"use client";

import { useState, ChangeEvent } from "react";
import * as ExcelJS from "exceljs";

// Type definitions
interface ExcelRow {
  [key: string]: string | number | null;
}

interface ExcelData extends Array<ExcelRow> {}

export default function ExcelUploader(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ExcelData>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [worksheetNames, setWorksheetNames] = useState<string[]>([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.name.endsWith(".xlsx") ||
        selectedFile.name.endsWith(".xls")
      ) {
        setFile(selectedFile);
        setError("");
        setData([]);
        setWorksheetNames([]);
        setSelectedWorksheet("");
      } else {
        setError("Please select a valid Excel file (.xlsx or .xls)");
        setFile(null);
      }
    }
  };

  // ====================================================================
  // OPTION 1: SEND FILE TO BACKEND VIA API ROUTE
  // ====================================================================
  const sendFileToBackendAPI = async (): Promise<void> => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      // 🔥🔥🔥 CREATE FORMDATA AND ADD FILE - READY TO SEND TO BACKEND 🔥🔥🔥
      const formData = new FormData();
      formData.append("file", file); // THE FILE IS NOW IN FORMDATA
      formData.append("selectedWorksheet", selectedWorksheet || "");

      console.log("FormData created with file:", file.name);
      console.log("FormData contents:", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // SEND FORMDATA TO BACKEND API
      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData, // FORMDATA WITH FILE SENT HERE
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
        setWorksheetNames(result.worksheetNames || []);
        if (
          !selectedWorksheet &&
          Array.isArray(result.worksheetNames) &&
          result.worksheetNames.length > 0
        ) {
          setSelectedWorksheet(result.worksheetNames[0] || "");
        }
      } else {
        throw new Error(result.error || "Failed to process file");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Error sending file to server: ${errorMessage}`);
      console.error("File upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================================
  // OPTION 2: SEND FILE TO BACKEND VIA SERVER ACTION
  // ====================================================================
  const sendFileToServerAction = async (): Promise<void> => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      // 🔥🔥🔥 CREATE FORMDATA AND ADD FILE - READY TO SEND TO SERVER ACTION 🔥🔥🔥
      const formData = new FormData();
      formData.append("file", file); // THE FILE IS NOW IN FORMDATA
      formData.append("selectedWorksheet", selectedWorksheet || "");

      console.log("FormData created for server action with file:", file.name);
      console.log("FormData contents:", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      // IMPORT AND CALL SERVER ACTION WITH FORMDATA
      const { processExcelFile } = await import("@/lib/actions");
      const result = await processExcelFile(formData); // FORMDATA WITH FILE SENT HERE

      if (result.success) {
        setData(result.data || []);
        setWorksheetNames(result.worksheetNames || []);
        if (
          !selectedWorksheet &&
          Array.isArray(result.worksheetNames) &&
          result.worksheetNames.length > 0
        ) {
          setSelectedWorksheet(result.worksheetNames[0] || "");
        }
      } else {
        throw new Error(result.error || "Failed to process file");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Error processing file with server action: ${errorMessage}`);
      console.error("Server action error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================================
  // OPTION 3: PROCESS FILE LOCALLY (CLIENT-SIDE) - NO BACKEND NEEDED
  // ====================================================================
  const readExcelFileLocally = async (
    worksheetName?: string
  ): Promise<void> => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const workbook = new ExcelJS.Workbook();
      const arrayBuffer = await file.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);

      // Get all worksheet names
      const sheetNames: string[] = workbook.worksheets.map((ws) => ws.name);
      setWorksheetNames(sheetNames);

      // Select worksheet
      let worksheet: ExcelJS.Worksheet;
      if (worksheetName) {
        const foundWorksheet = workbook.getWorksheet(worksheetName);
        if (!foundWorksheet) {
          throw new Error(`Worksheet "${worksheetName}" not found`);
        }
        worksheet = foundWorksheet;
      } else {
        if (workbook.worksheets.length === 0) {
          throw new Error("No worksheets found in the file");
        }
        worksheet = workbook.worksheets[0];
        setSelectedWorksheet(worksheet.name);
      }

      // Convert worksheet to array of objects
      const jsonData: ExcelData = [];
      const headerRow = worksheet.getRow(1);
      const headers: { [key: number]: string } = {};

      // Get headers from first row
      headerRow.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
        const cellValue = cell.value;
        headers[colNumber] = cellValue?.toString() || `Column${colNumber}`;
      });

      // Read data rows
      worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
        if (rowNumber === 1) return; // Skip header row

        const rowData: ExcelRow = {};
        let hasData = false;

        row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
          const header = headers[colNumber];
          if (header) {
            let cellValue: ExcelJS.CellValue = cell.value;

            // Handle different cell types
            if (cellValue !== null && cellValue !== undefined) {
              if (typeof cellValue === "object" && cellValue !== null) {
                // Handle formula cells
                if ("formula" in cellValue) {
                  const formulaCell = cellValue as ExcelJS.CellFormulaValue;
                  cellValue = formulaCell.result ?? formulaCell.formula;
                } else if ("richText" in cellValue) {
                  // Handle rich text
                  const richTextCell = cellValue as ExcelJS.CellRichTextValue;
                  cellValue = richTextCell.richText
                    .map((rt) => rt.text)
                    .join("");
                } else if (cellValue instanceof Date) {
                  cellValue = cellValue.toISOString().split("T")[0];
                } else {
                  cellValue = cellValue.toString();
                }
              } else {
                cellValue = cellValue.toString();
              }

              rowData[header] = cellValue as string | number;
              hasData = true;
            }
          }
        });

        if (hasData) {
          jsonData.push(rowData);
        }
      });

      setData(jsonData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(`Error reading Excel file: ${errorMessage}`);
      console.error("Excel reading error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWorksheetChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const worksheetName = event.target.value;
    setSelectedWorksheet(worksheetName);
    readExcelFileLocally(worksheetName);
  };

  const downloadAsJSON = (): void => {
    if (data.length === 0 || !file) return;

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name.split(".")[0]}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTableHeaders = (): string[] => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  };

  const getCellValue = (row: ExcelRow, header: string): string => {
    const value = row[header];
    return value !== null && value !== undefined ? value.toString() : "";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Excel File Reader & Backend Sender
      </h1>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Excel File
        </label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Processing Options */}
      {file && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Choose Processing Method:
          </h3>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={sendFileToBackendAPI}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-4 py-2 rounded-md transition-colors"
            >
              {loading ? "Uploading..." : "🌐 Send to API Route"}
            </button>
            <button
              onClick={sendFileToServerAction}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-md transition-colors"
            >
              {loading ? "Processing..." : "⚡ Send to Server Action"}
            </button>
          </div>
        </div>
      )}

      {/* Worksheet Selector */}
      {worksheetNames.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Worksheet
          </label>
          <select
            value={selectedWorksheet}
            onChange={handleWorksheetChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {worksheetNames.map((name: string) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Data Display */}
      {data.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Data Preview ({data.length} rows)
            </h2>
            <button
              onClick={downloadAsJSON}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              📥 Download JSON
            </button>
          </div>

          {/* Table */}
          <div className="overflow-auto max-h-96 border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {getTableHeaders().map((header: string) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 100).map((row: ExcelRow, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {getTableHeaders().map(
                      (header: string, cellIndex: number) => {
                        const cellValue = getCellValue(row, header);
                        return (
                          <td
                            key={cellIndex}
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                            title={cellValue}
                          >
                            {cellValue}
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length > 100 && (
              <div className="p-4 bg-gray-50 text-center text-sm text-gray-600">
                Showing first 100 rows of {data.length} total rows
              </div>
            )}
          </div>
        </div>
      )}

      {/* Data Summary */}
      {data.length > 0 && file && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">Data Summary</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>📁 File: {file.name}</li>
            <li>📊 Worksheet: {selectedWorksheet}</li>
            <li>📝 Rows: {data.length}</li>
            <li>🗂️ Columns: {getTableHeaders().length}</li>
            <li>🏷️ Headers: {getTableHeaders().join(", ")}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
