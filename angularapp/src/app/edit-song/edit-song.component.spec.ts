// edit-song.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditSongComponent } from './edit-song.component';
import { SongService } from '../services/song.service';
import { Song } from '../model/song.model';

describe('EditSongComponent', () => {
  let component: EditSongComponent;
  let fixture: ComponentFixture<EditSongComponent>;
  let mockSongService: jasmine.SpyObj<SongService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSongService = jasmine.createSpyObj('SongService', ['getSongById', 'updateSong']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ EditSongComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: SongService, useValue: mockSongService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSongComponent);
    component = fixture.componentInstance;
  });

  fit('should_create_edit_song_component', () => {
    expect((component as any)).toBeTruthy();
  });

  fit('should_initialize_the_form_with_empty_fields', () => {
    mockSongService.getSongById.and.returnValue(of({} as Song));
    (component as any).ngOnInit();
    expect((component as any).songForm.value).toEqual({
      title: '',
      artist: '',
      album: '',
      genre: '',
      releaseDate: '',
      duration: ''
    });
  });

  fit('should_mark_form_as_invalid_when_empty', () => {
    mockSongService.getSongById.and.returnValue(of({} as Song));
    (component as any).ngOnInit();
    expect((component as any).songForm.valid).toBeFalsy();
  });

  fit('should_mark_form_as_valid_when_all_fields_are_filled_correctly', () => {
    mockSongService.getSongById.and.returnValue(of({} as Song));
    (component as any).ngOnInit();
    (component as any).songForm.patchValue({
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      releaseDate: '2023-01-15',
      duration: 180
    });
    expect((component as any).songForm.valid).toBeTruthy();
  });

  fit('should_navigate_to_songs_list_after_successful_update', () => {
    mockSongService.getSongById.and.returnValue(of({} as Song));
    mockSongService.updateSong.and.returnValue(of({} as Song));

    (component as any).ngOnInit();
    (component as any).songForm.patchValue({
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      releaseDate: '2023-01-15',
      duration: 180
    });
    (component as any).onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/songs']);
  });

  fit('should_not_call_updateSong_if_form_is_invalid', () => {
    mockSongService.getSongById.and.returnValue(of({} as Song));
    (component as any).ngOnInit();
    (component as any).onSubmit();

    expect(mockSongService.updateSong).not.toHaveBeenCalled();
  });
});