export interface IFileService {
  importFile(file: File): Promise<void>
  exportFile(): Promise<void>
}
