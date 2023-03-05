import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { GraphQLNormalizr } from 'graphql-normalizr';
import { Observable, switchMap } from 'rxjs';
import { GetCharactersGQL } from 'src/app/graphql';
import {
  filterCharacterByName,
  filterCharacterByNameSuccessfully,
  getCharacters,
  getCharactersSuccessfully,
  modifyCharacter,
  modifyCharacterSuccessfully
} from './character.actions';

const { normalize } = new GraphQLNormalizr({
  lists: true,
});

@Injectable()
export class CharacterEffects {
  constructor(
    private actions$: Actions,
    private _getCharactersGQL: GetCharactersGQL,
    private _store: Store
  ) {}

  getCharacters$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getCharacters),
      switchMap(() => this._getCharactersGQL.fetch()),
      switchMap((response) => {
        const { characters } = normalize(response);

        return [
          getCharactersSuccessfully({
            characters: characters || [],
          }),
        ];
      })
    )
  );

  modifyCharacter$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(modifyCharacter),
      switchMap(({ character, newCharacterData }) => {
        const newCharacter = {
          ...character,
          name: newCharacterData.name || character.name,
        };

        return [
          modifyCharacterSuccessfully({
            character: newCharacter,
          }),
        ];
      })
    )
  );

  filterCharacterByName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(filterCharacterByName),
      switchMap(({ name }) =>
        this._getCharactersGQL.fetch({ filter: { name } })
      ),
      switchMap((results) => {
        const { characters } = normalize(results);

        return [
          filterCharacterByNameSuccessfully({
            characters: characters || [],
          }),
        ];
      })
    )
  );
}
