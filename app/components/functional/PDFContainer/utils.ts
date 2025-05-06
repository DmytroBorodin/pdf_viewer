export const downloadPdfBlob = async (fileId: string, token: string) => {
  const res = await fetch(`/api/download?fileId=${fileId}&token=${token}`);
  if (!res.ok) {
    throw new Error("Failed to download PDF");
  }
  const blob = await res.blob();
  return blob;
};
