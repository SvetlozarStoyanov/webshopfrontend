import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-profile-picture',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-profile-picture.component.html',
  styleUrl: './update-profile-picture.component.css'
})
export class UpdateProfilePictureComponent implements OnInit {
  profileForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      profilePicture: [null, [Validators.required]], // Mark the field as required
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Store the selected file in the component
      this.selectedFile = input.files[0];
      const fileType = this.selectedFile.type;
      console.log(fileType);
      if (!fileType.startsWith('image/')) {
        alert('Please select a valid image file (PNG/JPG).');
        return;
      }
      // Show a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }
  }
  submitForm() {
    if (this.profileForm.invalid || !this.selectedFile) {
      return;
    }
    console.log(this.selectedFile);

    const formData = new FormData();
    formData.append('profilePicture', this.selectedFile);
    console.log(formData);
    this.userService.updateProfilePicture(formData).subscribe(res => {
      this.router.navigate(['/profile']);
    })
  }
}
