import { createAction, props } from '@ngrx/store';

export const getCharacters = createAction(
  '[Character] Get characters',
  props<{ page?: number }>()
);

export const getCharactersSuccessfully = createAction(
  '[Planet] Get planets successfully',
  props<{
    characters: Character[];
  }>()
);

export const selectCharacterById = createAction(
  '[Character] select characters by id',
  props<{ id: string }>()
);

export const modifyCharacter = createAction(
  '[Character] modify characters',
  props<{
    character: Character;
    newCharacterData: {
      name?: string;
    };
  }>()
);

export const modifyCharacterSuccessfully = createAction(
  '[Character] modify characters successfully',
  props<{ character: Character }>()
);
