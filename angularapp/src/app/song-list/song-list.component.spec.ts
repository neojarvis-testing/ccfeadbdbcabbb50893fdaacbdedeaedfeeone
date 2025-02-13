// song-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongListComponent } from './song-list.component';
import { SongService } from '../services/song.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Song } from '../model/song.model';
import { By } from '@angular/platform-browser';

describe('SongListComponent', () => {
  let component: SongListComponent;
  let fixture: ComponentFixture<SongListComponent>;
  let service: SongService;
  let routerSpy: jasmine.SpyObj<Router>;

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
    {
      id: 3,
      title: 'Song 3',
      artist: 'Artist 3',
      album: 'Album 3',
      genre: 'Jazz',
      releaseDate: '2023-03-10',
      duration: 300
    }
  ];
  
  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SongListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SongService, { provide: Router, useValue: spy }]
    });

    fixture = TestBed.createComponent(SongListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SongService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  fit('should_create_SongListComponent', () => {
    expect((component as any)).toBeTruthy();
  });

  fit('should_call_getSongs', () => {
    spyOn((service as any), 'getSongs').and.returnValue(of(mockSongs));
    (component as any).ngOnInit();
    expect((service as any).getSongs).toHaveBeenCalled();
    expect((component as any).songs).toEqual(mockSongs);
  });

  fit('should_sort_songs_by_duration', () => {
    (component as any).songs = [...mockSongs];
    
    // Trigger sort by duration (ascending)
    (component as any).sortSongs();
    expect((component as any).songs[0].duration).toBeLessThanOrEqual((component as any).songs[1].duration);
    expect((component as any).songs[1].duration).toBeLessThanOrEqual((component as any).songs[2].duration);
    
    // Trigger sort again to reverse the order (descending)
    (component as any).sortSongs();
    expect((component as any).songs[0].duration).toBeGreaterThanOrEqual((component as any).songs[1].duration);
    expect((component as any).songs[1].duration).toBeGreaterThanOrEqual((component as any).songs[2].duration);
  });

  fit('should_navigate_to_edit_song_page', () => {
    const songId = 1;
    (component as any).editSong(songId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit-song', songId]);
  });
});