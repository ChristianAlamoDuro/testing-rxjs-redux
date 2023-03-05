import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  filterCharacterByName,
  filterCharacterByNameSuccessfully,
  getCharacters,
  getCharactersSuccessfully,
  modifyCharacter,
  modifyCharacterSuccessfully,
  selectCharacterById
} from './character.actions';

export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  loadingMessage: string;
  characterSelected: string | null;
}

// Entity Adapter
export const characterAdapter: EntityAdapter<Character> =
  createEntityAdapter<Character>();

export const initialState: CharacterState = characterAdapter.getInitialState({
  loading: false,
  loadingMessage: '',
  characterSelected: null,
});

const characterReducer = createReducer(
  initialState,
  on(getCharacters, (state) => ({ ...state, loading: true })),
  on(getCharactersSuccessfully, (state, { characters }) =>
    characterAdapter.upsertMany(characters, { ...state, loading: false })
  ),
  on(selectCharacterById, (state, { id }) => ({
    ...state,
    loading: true,
    characterSelected: id,
  })),
  on(modifyCharacter, (state) => ({ ...state, loading: true })),
  on(modifyCharacterSuccessfully, (state, { character }) =>
    characterAdapter.upsertOne(character, { ...state, loading: false })
  ),
  on(filterCharacterByName, (state) => ({ ...state, loading: true })),
  on(filterCharacterByNameSuccessfully, (state, { characters }) =>
    characterAdapter.setAll(characters, { ...state, loading: false })
  )
);

// tslint:disable-next-line: completed-docs
export function reducer(
  state: CharacterState | undefined,
  action: Action
): any {
  return characterReducer(state, action);
}
