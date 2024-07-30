export const base64ToFile = (base64: string, filename: string): File | null => {
  // Ensure the base64 string is in the expected format
  const base64Regex = /^data:(.+);base64,(.+)$/;
  const matches = base64.match(base64Regex);
  
  if (!matches || matches.length !== 3) {
    console.error("Invalid base64 format");
    return null;
  }

  const mimeType = matches[1];
  const data = matches[2];

  // Decode base64 string
  const byteCharacters = atob(data);
  const byteArrays = [];

  // Convert to byte array
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  // Create file
  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};
