import { createAction, props } from '@ngrx/store';

export const getPokemons = createAction(
  '[Pokemon] Get pokemons',
  props<{ page?: number }>()
);

export const getPokemonsSuccessfully = createAction(
  '[Pokemon] Get pokemons successfully',
  props<{ pokemons: any[] }>()
);

export const getPokemonById = createAction(
  '[Pokemon] Get pokemons by id',
  props<{ pokemonsId: number }>()
);

export const getPokemonByIdSuccessfully = createAction(
  '[Pokemon] Get pokemons by id successfully'
);
