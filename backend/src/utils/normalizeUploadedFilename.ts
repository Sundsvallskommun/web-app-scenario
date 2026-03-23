export const normalizeUploadedFilename = (filename: string): string => {
  return Buffer.from(filename, 'latin1').toString('utf8');
};
