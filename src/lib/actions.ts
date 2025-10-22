"use server";

import { cookies } from "next/headers";
import { Models } from "appwrite";
import { z } from "zod";
import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { revalidatePath } from "next/cache";
import { Query } from "node-appwrite";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

/**
 * Handles user authentication and session creation on the server.
 * Also sets the default active MSISDN cookie.
 * @param formData - The form data containing email and password.
 */
export async function createSession(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const { email, password } = formSchema.parse(data);

    const { account, tablesDB } = await createAdminClient();
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    cookies().set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    // Nested try...catch for non-critical part
    try {
      const { account: sessionAccount } = await createSessionClient(
        session.secret
      );
      const user = await sessionAccount.get();
      const { rows: msisdns } = await tablesDB.listRows({
        databaseId: process.env.APPWRITE_DATABASE_ID!,
        tableId: process.env.APPWRITE_TABLE_MSISDNS!,
        queries: [Query.equal("agent", user.$id)],
      });

      if (msisdns.length > 0) {
        cookies().set("active_msisdn", msisdns[0].msisdn.toString(), {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
          expires: new Date(session.expire),
          path: "/",
        });
      }
    } catch (error) {
      return {
        success: true,
        warning:
          "Login successful, but failed to set default MSISDN: " +
          (error as Error).message,
      };
    }

    return { success: true };
  } catch (error) {
    // This is the catch-all for any error, including validation.
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * Gets the current authenticated user on the server.
 * Returns null if no session is found.
 */
export async function getUser(): Promise<Models.User<Models.Preferences> | null> {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie) {
    return null;
  }
  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Sets the active MSISDN for the current user.
 * This is a server action that can be called from client components.
 * @param msisdn - The MSISDN to set as active
 */
export async function setActiveMsisdn(msisdn: string) {
  try {
    const sessionCookie = cookies().get("session");
    if (!sessionCookie) {
      throw new Error("No session found");
    }

    // Verify the MSISDN belongs to the current user
    const { tablesDB, account } = await createSessionClient(
      sessionCookie.value
    );
    const user = await account.get();

    const { rows: msisdns } = await tablesDB.listRows({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_MSISDNS!,
      queries: [
        Query.equal("agent", user.$id),
        Query.equal("msisdn", parseInt(msisdn)),
      ],
    });

    if (msisdns.length === 0) {
      throw new Error("MSISDN does not belong to current user");
    }

    // Set the active MSISDN cookie
    cookies().set("active_msisdn", msisdn, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // Revalidate all portal pages to reflect the change
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error setting active MSISDN:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Gets the active MSISDN from cookie.
 * @returns The active MSISDN string, or null if not set
 */
export async function getActiveMsisdnFromCookie() {
  const activeMsisdnCookie = cookies().get("active_msisdn");
  return activeMsisdnCookie?.value || null;
}

// export async function processExcelFile(
//   formData: FormData
// ): Promise<ProcessExcelResult> {
//   console.log("🚀 Server Action: processExcelFile called");

//   try {
//     // 📥 EXTRACT FILE FROM FORMDATA (SENT FROM FRONTEND)
//     const file = formData.get("file") as File;
//     const selectedWorksheet = formData.get("selectedWorksheet") as string;

//     console.log("📁 Received file:", {
//       name: file?.name,
//       size: file?.size,
//       type: file?.type,
//     });
//     console.log("📊 Selected worksheet:", selectedWorksheet);

//     // Validate file exists
//     if (!file) {
//       console.error("❌ No file provided");
//       return {
//         success: false,
//         error: "No file provided",
//       };
//     }

//     // Validate file type
//     if (
//       !file.type.includes("spreadsheet") &&
//       !file.name.endsWith(".xlsx") &&
//       !file.name.endsWith(".xls")
//     ) {
//       console.error("❌ Invalid file type:", file.type);
//       return {
//         success: false,
//         error: "Invalid file type. Please upload an Excel file (.xlsx or .xls)",
//       };
//     }

//     // 🔄 CONVERT FILE TO BUFFER FOR PROCESSING
//     console.log("🔄 Converting file to buffer...");
//     const arrayBuffer = await file.arrayBuffer();
//     console.log(
//       "✅ ArrayBuffer created, size:",
//       arrayBuffer.byteLength,
//       "bytes"
//     );

//     // 📊 PROCESS EXCEL FILE WITH EXCELJS
//     console.log("📊 Loading workbook...");
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.load(arrayBuffer);
//     console.log("✅ Workbook loaded successfully");

//     // Get all worksheet names
//     const worksheetNames = workbook.worksheets.map((ws) => ws.name);
//     console.log("📋 Found worksheets:", worksheetNames);

//     if (worksheetNames.length === 0) {
//       console.error("❌ No worksheets found");
//       return {
//         success: false,
//         error: "No worksheets found in the file",
//       };
//     }

//     // Select worksheet
//     let worksheet: ExcelJS.Worksheet;
//     if (selectedWorksheet && workbook.getWorksheet(selectedWorksheet)) {
//       worksheet = workbook.getWorksheet(selectedWorksheet)!;
//       console.log("📊 Using selected worksheet:", selectedWorksheet);
//     } else {
//       worksheet = workbook.worksheets[0]; // Default to first worksheet
//       console.log("📊 Using default worksheet:", worksheet.name);
//     }

//     // 🔄 CONVERT WORKSHEET TO JSON DATA
//     console.log("🔄 Converting worksheet to JSON...");
//     const jsonData: ExcelRow[] = [];
//     const headerRow = worksheet.getRow(1);
//     const headers: { [key: number]: string } = {};

//     // Get headers from first row
//     headerRow.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
//       const cellValue = cell.value;
//       headers[colNumber] = cellValue?.toString() || `Column${colNumber}`;
//     });

//     console.log("🏷️ Headers found:", Object.values(headers));

//     // Read data rows
//     let processedRows = 0;
//     worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
//       if (rowNumber === 1) return; // Skip header row

//       const rowData: ExcelRow = {};
//       let hasData = false;

//       row.eachCell((cell: ExcelJS.Cell, colNumber: number) => {
//         const header = headers[colNumber];
//         if (header) {
//           let cellValue: ExcelJS.CellValue = cell.value;

//           // Handle different cell types
//           if (cellValue !== null && cellValue !== undefined) {
//             if (typeof cellValue === "object" && cellValue !== null) {
//               // Handle formula cells
//               if ("formula" in cellValue) {
//                 const formulaCell = cellValue as ExcelJS.CellFormulaValue;
//                 cellValue = formulaCell.result ?? formulaCell.formula;
//               } else if ("richText" in cellValue) {
//                 // Handle rich text
//                 const richTextCell = cellValue as ExcelJS.CellRichTextValue;
//                 cellValue = richTextCell.richText.map((rt) => rt.text).join("");
//               } else if (cellValue instanceof Date) {
//                 cellValue = cellValue.toISOString().split("T")[0];
//               } else {
//                 cellValue = cellValue.toString();
//               }
//             } else {
//               cellValue = cellValue.toString();
//             }

//             rowData[header] = cellValue as string | number;
//             hasData = true;
//           }
//         }
//       });

//       if (hasData) {
//         jsonData.push(rowData);
//         processedRows++;
//       }
//     });

//     console.log(`✅ Processed ${processedRows} rows of data`);

//     // Prepare response with metadata
//     const headersList = Object.values(headers).filter(Boolean);

//     const result: ProcessExcelResult = {
//       success: true,
//       data: jsonData,
//       worksheetNames,
//       metadata: {
//         fileName: file.name,
//         selectedWorksheet: worksheet.name,
//         totalRows: jsonData.length,
//         totalColumns: headersList.length,
//         headers: headersList,
//       },
//     };

//     console.log("🎉 Server Action completed successfully:", {
//       fileName: file.name,
//       worksheet: worksheet.name,
//       rows: jsonData.length,
//       columns: headersList.length,
//     });
//     const { success: updateSuccess, changeLog } = await updateDatabaseFromExcel(
//       jsonData
//     );

//     return result;
//   } catch (error) {
//     console.error("💥 Server Action error:", error);
//     return {
//       success: false,
//       error:
//         error instanceof Error ? error.message : "Failed to process Excel file",
//     };
//   }
// }

// export async function updateDatabaseFromExcel(
//   jsonData: ExcelRow[]
// ): Promise<{ success: boolean; changeLog: ChangeLog[] }> {
//   const sessionCookie = cookies().get("session");
//   const { tablesDB, account } = await createSessionClient(sessionCookie?.value);
//   const changeLog: ChangeLog[] = [];
//   if (!sessionCookie) {
//     return { success: false, changeLog };
//   }
//   console.log("Starting database sync process...");

//   // 1. Fetch all existing records from the database
//   let allDbRecords = [];
//   try {
//     const result = await tablesDB.listRows({
//       databaseId: process.env.APPWRITE_DATABASE_ID!,
//       tableId: process.env.APPWRITE_TABLE_CORE_SPEND!,
//     });
//     allDbRecords = result.rows;
//     console.log(`Fetched ${allDbRecords.length} records from the database.`);
//   } catch (error) {
//     console.error("Failed to fetch database records:", error);
//     return { success: false, changeLog: [] };
//   }

//   const dbMap = new Map();
//   allDbRecords.forEach((doc) => {
//     dbMap.set(doc.msisdn, doc);
//   });

//   const excelMsisdns = new Set(jsonData.map((row) => row.msisdn));

//   // 2. Process Excel rows
//   for (const excelRow of jsonData) {
//     const msisdnRaw = excelRow.msisdn;
//     const msisdn = msisdnRaw != null ? String(msisdnRaw) : "";
//     const dbRecord = dbMap.get(msisdn);

//     const now = new Date();
//     const utcPlus2Offset = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
//     const utcPlus2Date = new Date(now.getTime() + utcPlus2Offset);
//     // Convert Excel string values to numbers where needed
//     const processedExcelRow = {
//       msisdn: String(excelRow.msisdn), // Ensure msisdn is a string
//       last_usage_date: excelRow.last_usage_date,
//       // Correctly map the uppercase Excel headers to lowercase keys 🛠️
//       total_data_usage: Number(excelRow.TOTAL_DATA_USAGE),
//       total_voice_usage: Number(excelRow.TOTAL_VOICE_USAGE),
//       total_sms_usage: Number(excelRow.TOTAL_SMS_USAGE),
//       date: utcPlus2Date.toISOString(),
//     };

//     if (!dbRecord) {
//       // Case 1: New record (CREATE) ➕
//       console.log(`Creating new record for MSISDN: ${msisdn}`);
//       try {
//         await tablesDB.createRow({
//           databaseId: process.env.APPWRITE_DATABASE_ID!,
//           tableId: process.env.APPWRITE_TABLE_CORE_SPEND!,
//           data: processedExcelRow,
//           rowId: "unique()", // Let Appwrite generate a unique ID
//         });
//         changeLog.push({ msisdn, type: "created" });
//       } catch (error) {
//         console.error(`Failed to create record for ${msisdn}:`, error);
//       }
//     } else {
//       // Case 2: Existing record (UPDATE) 🔄
//       const updates: Record<string, any> = {};
//       const changes: Record<string, any> = {};

//       // Compare relevant fields
//       const fieldsToCompare = [
//         "daterequired",
//         "last_usage_date",
//         "total_data_usage",
//         "total_voice_usage",
//         "total_sms_usage",
//       ];
//       for (const field of fieldsToCompare) {
//         if ((processedExcelRow as any)[field] !== (dbRecord as any)[field]) {
//           updates[field] = (processedExcelRow as any)[field];
//           changes[field] = {
//             from: (dbRecord as any)[field],
//             to: (processedExcelRow as any)[field],
//           };
//         }
//       }

//       if (Object.keys(updates).length > 0) {
//         console.log(`Updating record for MSISDN: ${msisdn}`);
//         try {
//           await tablesDB.updateRow(
//             process.env.APPWRITE_DATABASE_ID!,
//             process.env.APPWRITE_TABLE_CORE_SPEND!,
//             dbRecord.$id,
//             updates
//           );
//           changeLog.push({ msisdn, type: "updated", changes });
//         } catch (error) {
//           console.error(`Failed to update record for ${msisdn}:`, error);
//         }
//       }

//       // Remove from the map to track remaining records
//       dbMap.delete(msisdn);
//     }
//   }

//   // 3. Process remaining database records (DELETION) ➖
//   for (const entry of Array.from(dbMap.entries())) {
//     const [msisdn, dbRecord] = entry;
//     if (!excelMsisdns.has(msisdn)) {
//       console.log(`Deleting record for MSISDN: ${msisdn}`);
//       try {
//         await tablesDB.deleteRow(
//           process.env.APPWRITE_DATABASE_ID!,
//           process.env.APPWRITE_TABLE_CORE_SPEND!,
//           dbRecord.$id
//         );
//         changeLog.push({ msisdn, type: "deleted" });
//       } catch (error) {
//         console.error(`Failed to delete record for ${msisdn}:`, error);
//       }
//     }
//   }

//   console.log("Database sync completed.");
//   return { success: true, changeLog };
// }
