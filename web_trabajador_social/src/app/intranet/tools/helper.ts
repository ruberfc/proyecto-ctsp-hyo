export function formatAndValidateDate(dateInput: string | null | undefined): string {
  if (dateInput === null || dateInput === undefined || dateInput.trim() === '') {
    return 'Fecha inválida o nula';
  }

  // Create a Date object.
  // Appending 'T00:00:00' helps the Date constructor interpret it as a specific time,
  // which can sometimes prevent issues. However, the key fix is below.
  const date = new Date(dateInput);

  // Check if the date is valid first
  if (isNaN(date.getTime())) {
    return 'Fecha no existente';
  }

  // --- FIX FOR TIMEZONE SHIFT ---
  // If the input date string is 'YYYY-MM-DD' without time or timezone,
  // Date constructor might interpret it as UTC 00:00:00.
  // When viewed from a GMT-X timezone (like Peru's GMT-5),
  // this shifts the date back to the previous day.
  // To fix this, we normalize the date to UTC 00:00:00 after creation.
  // This ensures that when local date components are extracted, they are correct.
  date.setUTCHours(0, 0, 0, 0);
  // Alternative (more explicit for YYYY-MM-DD):
  // const date = new Date(dateInput + 'T00:00:00Z'); // This forces UTC parsing from the start.
  // If you use the above line, you don't need `date.setUTCHours(0,0,0,0);` afterwards.
  // The current approach (new Date(dateInput) followed by setUTCHours) is often robust enough for YYYY-MM-DD.


  // Get day, month, and year using UTC methods to avoid local timezone issues
  // after setting UTCHours to 0,0,0,0.
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatRegistrationTime(dateTimeInput: string | null | undefined): string {
  if (dateTimeInput === null || dateTimeInput === undefined || dateTimeInput.trim() === '') {
    return 'Hora inválida o nula'; // Or an empty string, or 'N/A'
  }

  const date = new Date(dateTimeInput);

  if (isNaN(date.getTime())) {
    return 'Hora no existente'; // If the date-time string couldn't be parsed
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export function formatRegistrationDate(dateTimeInput: string | null | undefined): string {
  if (dateTimeInput === null || dateTimeInput === undefined || dateTimeInput.trim() === '') {
    return 'Fecha inválida o nula'; // Or an empty string, or 'N/A'
  }

  const date = new Date(dateTimeInput);

  if (isNaN(date.getTime())) {
    return 'Fecha no existente'; // If the date-time string couldn't be parsed
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getTodayFormattedYYYYMMDD(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}