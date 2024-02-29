import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {
  selectedFile: File | null = null;
  fileURL: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewFile();
  }

  previewFile() {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }

  isImage(file: File) {
    return file.type.startsWith('image/');
  }
}