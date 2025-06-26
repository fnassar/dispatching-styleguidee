export * from './api-base-url.token';
/**
 * Checks if any fields in an object contain data (not empty string or undefined)
 * @param {any} obj - The object to check
 * @returns {boolean} True if any field has data, false otherwise
 */
export declare const someFieldsContainData: (obj: any) => boolean;
/**
 * Generates a random HSL color based on an index value
 * @param {number} index - The index used to generate unique hue
 * @param {number} lightness - The lightness percentage (0-100)
 * @returns {string} HSL color string (e.g., "hsl(120, 70%, 50%)")
 */
export declare const generateRandomColor: (index: number, lightness: number) => string;
/**
 * Formats a timestamp into a human-readable time string
 * @param {string} timestamp - ISO date string
 * @returns {string} Formatted time string (e.g., "Sent at 2:30 PM")
 */
export declare const formatTimestamp: (timestamp: string) => string;
/**
 * Recursively flattens a tree structure into a single array
 * @param {any[]} nodes - Array of nodes with potential children
 * @param {any[]} [result=[]] - Accumulator array (used internally for recursion)
 * @returns {any[]} Flattened array of all nodes
 */
export declare const flattenTree: (nodes: any[], result?: any[]) => any[];
/**
 * Converts a date string to YYYY-MM-DD format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted date string (e.g., "2023-05-15")
 */
export declare const convertDateFormat: (inputDate: any) => string;
/**
 * Converts Excel serial date number to JavaScript Date object
 * @param {number} serial - Excel serial date number
 * @returns {Date} JavaScript Date object
 */
export declare const excelDateToJSDate: (serial: number) => Date;
/**
 * Formats a date to YYYY-MM-DD format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted date string (e.g., "2023-05-15")
 */
export declare function formatDate(inputDate: any): string;
/**
 * Formats a date to YYYY-MM-DD HH:MM:SS format
 * @param {any} inputDate - Date string or object
 * @returns {string} Formatted datetime string (e.g., "2023-05-15 14:30:45")
 */
export declare function formatDateWithTime(inputDate: any): string;
/**
 * Generates a unique number based on current timestamp and index
 * @param {number} index - Additional number to ensure uniqueness
 * @returns {string} Unique number string combining timestamp and index
 */
export declare function generateUniqueNumber(index: number): string;
/**
 * Calculates time difference between two dates in hours and minutes
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {string} Formatted time difference (e.g., "2 H and 30 M")
 */
export declare function diffTime(start: Date, end: Date): string;
/**
 * Converts a File object to Base64 string (Note: currently incomplete implementation)
 * @param {any} selectedFile - File object to convert
 * @returns {any} Should return Base64 string (implementation needs fixing)
 */
export declare function convertFileToBase64(selectedFile: any): any;
/**
 * Converts a date to relative time string (e.g., "2 hours ago")
 * @param {any} date - Date to compare with current time
 * @returns {string} Relative time string
 */
export declare function timeAgo(date: any): string;
/**
 * Formats a timestamp to HH:MM:SS format (UTC time)
 * @param {string} timestamp - ISO date string
 * @returns {string} Formatted time string (e.g., "14:30:45")
 */
export declare function formatinitialTakeTime(timestamp: string): string;
/**
 * Checks if a file path has an image extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with image extension
 */
export declare function isImagePath(path: string): boolean;
/**
 * Checks if a file path has a video extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with video extension
 */
export declare function isVedioPath(path: string): boolean;
/**
 * Checks if a file path has a document extension
 * @param {string} path - File path to check
 * @returns {boolean} True if path ends with document extension
 */
export declare function isDocumentPath(path: string): boolean;
/**
 * Converts Base64 data URI to Blob object
 * @param {string} dataURI - Base64 encoded data URI
 * @returns {Blob} Blob object representing the image
 */
export declare function b64toBlob(b64Data: string, contentType?: string, sliceSize?: number): Blob;
/**
 * Initiates a download of a given Blob object by creating a temporary anchor element
 * and triggering a click event on it. The file will be saved with the specified file name.
 *
 * @param blob - The Blob object to be downloaded.
 * @param fileName - The desired name for the downloaded file. Defaults to 'download' if not provided.
 */
export declare function downloadBlob(blob: Blob, fileName: string): void;
/**
 * Converts a Blob object to Base64 data URI
 * @param {Blob} blob - Blob object to convert
 * @returns {Promise<string>} Promise resolving to Base64 encoded data URI
 */
export declare function blobToB64(blob: Blob): Promise<string>;
/**
 * Simple logger function that console.logs the input
 * @param {any} [data=''] - Data to log (defaults to empty string)
 */
export declare function logger(data?: any): void;
import { FormGroup } from '@angular/forms';
/**
 * Extracts all validation errors from a FormGroup
 * @param {FormGroup} form - Angular FormGroup to inspect
 * @returns {Array} Array of error objects containing control name, error type and value
 */
export declare function getFormValidationErrors(form: FormGroup): {
    control: string;
    error: string;
    value: any;
}[];
/**
 * Converts FormGroup values to FormData (handles File objects specially)
 * @param {FormGroup} formGroup - Angular FormGroup to convert
 * @returns {FormData} FormData object containing all form values
 */
export declare function convertFormGroupToFormData(formGroup: FormGroup): FormData;
