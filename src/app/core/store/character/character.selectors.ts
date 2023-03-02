import { createFeatureSelector, createSelector } from '@ngrx/store';
import { characterAdapter, CharacterState } from './character.reducer';

export const selectCharactersState =
  createFeatureSelector<CharacterState>('character');

// get the selectors
export const { selectIds, selectEntities, selectAll, selectTotal } =
  characterAdapter.getSelectors();

export const selectAllCharacters = createSelector(
  selectCharactersState,
  selectAll
);

export const selectCharactersEntities = createSelector(
  selectCharactersState,
  selectEntities
);

export const selectCharacter = createSelector(
  selectCharactersState as any,
  (planets: any[], { planetId }: { planetId: number }) => planets[planetId]
);

export const selectCharacterSelectedByUser = createSelector(
  selectCharactersState,
  selectAllCharacters,
  (state, characters) => {
    const character = characters.find(
      (character) => character.id === state.characterSelected
    );

    return character || null;
  }
);
