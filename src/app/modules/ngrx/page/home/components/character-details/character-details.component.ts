import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { modifyCharacter } from 'src/app/core/store/character/character.actions';
import { selectCharacterSelectedByUser } from 'src/app/core/store/character/character.selectors';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.sass'],
})
export class CharacterDetailsComponent implements OnInit {
  character$!: Observable<Character | null>;
  characterForm$!: Observable<
    FormGroup<{ name: FormControl<string | null | undefined> }>
  >;

  constructor(private _store: Store, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.character$ = this._store.pipe(
      select(selectCharacterSelectedByUser)
    );

    this.characterForm$ = this.character$.pipe(
      map((character) =>
        this._formBuilder.group({
          name: [character?.name, Validators.required],
        })
      )
    );
  }

  modifyCharacter(form) {
    this.character$.pipe(take(1)).subscribe((character) => {
      this._store.dispatch(
        modifyCharacter({
          character: character!,
          newCharacterData: form.value,
        })
      );
    });
  }
}
