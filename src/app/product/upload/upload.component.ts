import { Component, OnInit } from '@angular/core';
import { uploadToCloudinary } from '../../config/uploadImageToCloudinary';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  isLoading: boolean = false;

  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
    this.previewUrls = this.selectedFiles.map(file => URL.createObjectURL(file));
  }

  async uploadFiles(): Promise<string[]> {
    this.isLoading = true;
    const uploadUrls: string[] = [];

    for (const file of this.selectedFiles) {
      const fileType = file.type.split('/')[0]; // e.g., 'image' or 'video'
      const url = await uploadToCloudinary(file, fileType);
      if (url) {
        uploadUrls.push(url);
      }
    }

    this.isLoading = false;
    // if (uploadUrls.length === this.selectedFiles.length) {
    //   alert('Đã lưu thành công: ' + uploadUrls.join(', '));

    // } else {
    //   alert('Lỗi khi upload file.');
    // }

    return uploadUrls;
  }
}
