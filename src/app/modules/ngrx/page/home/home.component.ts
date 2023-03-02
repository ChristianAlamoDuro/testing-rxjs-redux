import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getCharacters,
  selectCharacterById
} from 'src/app/core/store/character/character.actions';
import { selectAllCharacters } from 'src/app/core/store/character/character.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  characters$!: Observable<Character[]>;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(getCharacters({}));

    this.characters$ = this._store.pipe(select(selectAllCharacters));
  }

  selectCharacter(characterId: string): void {
    this._store.dispatch(selectCharacterById({ id: characterId }));
  }
}
