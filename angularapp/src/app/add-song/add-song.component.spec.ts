// add-song.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddSongComponent } from './add-song.component';
import { SongService } from '../services/song.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Song } from '../model/song.model';

describe('AddSongComponent', () => {
  let component: AddSongComponent;
  let fixture: ComponentFixture<AddSongComponent>;
  let service: SongService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    TestBed.configureTestingModule({
      declarations: [AddSongComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, FormsModule],
      providers: [
        SongService,
        { provide: Router, useValue: routerSpy }
      ],
    });
    fixture = TestBed.createComponent(AddSongComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SongService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  fit('should_create_AddSongComponent', () => {
    expect((component as any)).toBeTruthy();
  });

  fit('should_add_all_the_required_fields', () => {
    const form = (component as any).songForm;
    expect(form.get('title')).toBeTruthy();
    expect(form.get('artist')).toBeTruthy();
    expect(form.get('album')).toBeTruthy();
    expect(form.get('genre')).toBeTruthy();
    expect(form.get('releaseDate')).toBeTruthy();
    expect(form.get('duration')).toBeTruthy();
  });

  fit('should_validate_duration', () => {
    const songForm = (component as any).songForm;
    songForm.patchValue({
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      releaseDate: '2023-01-15',
      duration: 180
    });
    expect(songForm.valid).toBeTruthy();
    
    songForm.patchValue({ duration: 0 });
    expect(songForm.get('duration')?.hasError('min')).toBeTruthy();
  });

  fit('should_reset_form_after_successful_submission', fakeAsync(() => {
    const validSongData = {
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      releaseDate: '2023-01-15',
      duration: 180
    };
    const expectedSongData: Song = {
      ...validSongData,
      releaseDate: validSongData.releaseDate,
    };
    spyOn((service as any), 'addSong').and.returnValue(of(expectedSongData));
    (component as any).songForm.setValue(validSongData);
    (component as any).onSubmit();
    tick();
    expect((component as any).songForm.pristine).toBeTruthy();
    expect((component as any).songForm.untouched).toBeTruthy();
  }));

  fit('should_navigate_to_song_list_after_successful_submission', fakeAsync(() => {
    const validSongData = {
      title: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      genre: 'Test Genre',
      releaseDate: '2023-01-15',
      duration: 180
    };
    const expectedSongData: Song = {
      ...validSongData,
      releaseDate: validSongData.releaseDate,
    };
    spyOn((service as any), 'addSong').and.returnValue(of(expectedSongData));
    (component as any).songForm.setValue(validSongData);
    (component as any).onSubmit();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/songs']);
  }));
});