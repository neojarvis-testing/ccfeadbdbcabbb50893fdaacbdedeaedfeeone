import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-edit-song',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // ✅ Import ReactiveFormsModule here
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent {
  songForm: FormGroup;
  songId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private songService: SongService
  ) {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });

    this.songId = +this.route.snapshot.paramMap.get('id')!;
    this.loadSongDetails();
  }

  loadSongDetails(): void {
    this.songService.getSongById(this.songId).subscribe(
      (song) => this.songForm.patchValue(song),
      (error) => console.error('Error loading song details:', error)
    );
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      this.songService.updateSong(this.songId, this.songForm.value).subscribe(
        () => {
          console.log('Song updated successfully');
          this.router.navigate(['/songs']);
        },
        (error) => console.error('Error updating song:', error)
      );
    }
  }
}