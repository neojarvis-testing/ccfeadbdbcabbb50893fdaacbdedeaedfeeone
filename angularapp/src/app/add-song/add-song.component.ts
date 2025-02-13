// add-song.component.ts

import { Component, OnInit } from '@angular/core';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-song',
  standalone: true,
  templateUrl: './add-song.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./add-song.component.css'],
})
export class AddSongComponent implements OnInit {
  songForm: FormGroup;

  constructor(
    private songService: SongService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const newSong: Song = this.songForm.value;
      this.songService.addSong(newSong).subscribe(
        (res) => {
          console.log('Song added successfully:', res);
          this.router.navigate(['/songs']);
        },
        (err) => {
          console.error('Error adding song:', err);
        }
      );
    }
  }
}