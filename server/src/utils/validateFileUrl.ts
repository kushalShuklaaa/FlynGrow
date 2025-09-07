export const isValidZipUrl = (url: string): boolean => {
  const allowedExtensions = [".zip", ".pdf"];
  try {
    const lowerUrl = url.toLowerCase();
    return allowedExtensions.some((ext) => lowerUrl.endsWith(ext));
  } catch {
    return false;
  }
};
