// song-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Song } from '../model/song.model';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  loading: boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private songService: SongService, private router: Router) {}

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.loading = true;
    try {
      this.songService.getSongs().subscribe(
        (res) => {
          console.log(res);
          this.songs = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    } catch (err) {
      console.log('Error:', err);
      this.loading = false;
    }
  }

  sortSongs(): void {
    const orderMultiplier = this.sortOrder === 'asc' ? 1 : -1;

    this.songs.sort((a, b) => {
      return (a.duration - b.duration) * orderMultiplier;
    });

    // Toggle sort order for the next click
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  editSong(id: number) {
    this.router.navigate(['/edit-song', id]);
  }
}