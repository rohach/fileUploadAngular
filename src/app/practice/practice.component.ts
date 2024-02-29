import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  selectedFile: File | null = null;
  fileUrl : SafeResourceUrl | null = null
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
  onFileSubmit(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewFile();
  }
  previewFile() {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    };
    reader.readAsDataURL(this.selectedFile as Blob)
  }

  isImage (file: File){
    return file.type.startsWith('image/')  
  }
}
