import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action as NgRxAction, createReducer, on } from '@ngrx/store';
import {
  getPokemonById,
  getPokemonByIdSuccessfully,
  getPokemons,
  getPokemonsSuccessfully
} from './pokemon.actions';

export interface PokemonState extends EntityState<any> {
  loading: boolean;
  loadingMessage: string;
}

// Entity Adapter
export const pokemonAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: PokemonState = pokemonAdapter.getInitialState({
  loading: false,
  loadingMessage: '',
});

const actionReducer = createReducer(
  initialState,
  on(getPokemons, (state) => ({ ...state, loading: true })),
  on(getPokemonsSuccessfully, (state, { pokemons }) =>
    pokemonAdapter.upsertMany(pokemons, { ...state, loading: false })
  ),
  on(getPokemonById, (state) => ({ ...state, loading: true })),
  on(getPokemonByIdSuccessfully, (state) => ({ ...state, loading: false }))
);

export function reducer(
  state: PokemonState | undefined,
  pokemon: NgRxAction
): any {
  return actionReducer(state, pokemon);
}
