import { Routes } from '@angular/router';
import { SongListComponent } from './song-list/song-list.component';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';

export const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: 'songs', component: SongListComponent },
  { path: 'add-song', component: AddSongComponent },
  { path: 'edit-song/:id', component: EditSongComponent },
  { path: 'update-song/:id', redirectTo: 'edit-song/:id', pathMatch: 'full' }
];
