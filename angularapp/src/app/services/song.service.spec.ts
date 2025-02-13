// song.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SongService } from './song.service';
import { Song } from '../model/song.model';

describe('SongService', () => {
  let service: SongService;
  let httpTestingController: HttpTestingController;

  const mockSongs: Song[] = [
    {
      id: 1,
      title: 'Song 1',
      artist: 'Artist 1',
      album: 'Album 1',
      genre: 'Rock',
      releaseDate: '2023-01-15',
      duration: 180
    },
    {
      id: 2,
      title: 'Song 2',
      artist: 'Artist 2',
      album: 'Album 2',
      genre: 'Pop',
      releaseDate: '2023-02-20',
      duration: 240
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService],
    });
    service = TestBed.inject(SongService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('should_create_service_song', () => {
    expect((service as any)).toBeTruthy();
  });

  fit('should_retrieve_songs_from_the_API_via_GET', () => {
    (service as any).getSongs().subscribe((songs) => {
      expect(songs).toEqual(mockSongs);
    });
    const req = httpTestingController.expectOne((service as any).backendUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSongs);
  });

  fit('should_add_a_song_via_POST', () => {
    const newSong: Song = {
      title: 'New Song',
      artist: 'New Artist',
      album: 'New Album',
      genre: 'Jazz',
      releaseDate: '2023-03-10',
      duration: 300
    };
    (service as any).addSong(newSong).subscribe((song) => {
      expect(song).toEqual(newSong);
    });
    const req = httpTestingController.expectOne((service as any).backendUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(newSong);
  });

  fit('should_edit_a_song_via_PUT', () => {
    const editedSong: Song = {
      id: 1,
      title: 'Edited Song',
      artist: 'Artist 1',
      album: 'Album 1',
      genre: 'Rock',
      releaseDate:'2023-01-15',
      duration: 200
    };
    (service as any).updateSong(editedSong.id, editedSong).subscribe((song) => {
      expect(song).toEqual(editedSong);
    });
    const req = httpTestingController.expectOne(`${(service as any).backendUrl}/${editedSong.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(editedSong);
  });

  fit('should_get_a_song_by_id_via_GET', () => {
    const songId = 1;
    (service as any).getSongById(songId).subscribe((song) => {
      expect(song).toEqual(mockSongs[0]);
    });
    const req = httpTestingController.expectOne(`${(service as any).backendUrl}/${songId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockSongs[0]);
  });
});