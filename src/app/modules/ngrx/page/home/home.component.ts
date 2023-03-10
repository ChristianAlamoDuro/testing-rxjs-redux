import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  combineLatest, debounceTime,
  map,
  Observable,
  startWith
} from 'rxjs';
import {
  filterCharacterByName,
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
  searchByNameControl: FormControl = new FormControl(null);
  searchByNameWithBackControl: FormControl = new FormControl(null);

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(getCharacters({}));

    this.characters$ = combineLatest({
      searchValue: this.searchByNameControl.valueChanges.pipe(startWith('')),
      characters: this._store.pipe(select(selectAllCharacters)),
    }).pipe(
      map(({ searchValue, characters }) => {
        if (searchValue) {
          return characters.filter((character) =>
            character.name!.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        return characters;
      })
    );

    this.searchByNameWithBackControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.searchByNameControl.setValue(null);
        this._store.dispatch(
          filterCharacterByName({ name: value.toLowerCase() })
        );
      });
  }

  selectCharacter(characterId: string): void {
    this._store.dispatch(selectCharacterById({ id: characterId }));
  }
}
