// song.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../model/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  public backendUrl = 'https://ide-ccfeadbdbcabbb50893fdaacbdedeaedfeeone.ide.exam.ly/proxy/3001/songs'; // Update this URL to match your backend endpoint for songs

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.backendUrl);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.backendUrl, song);
  }

  updateSong(id: number, song: Partial<Song>): Observable<Song> {
    return this.http.put<Song>(`${this.backendUrl}/${id}`, song);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.backendUrl}/${id}`);
  }
}