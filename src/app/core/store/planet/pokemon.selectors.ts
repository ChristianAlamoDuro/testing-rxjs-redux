import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pokemonAdapter, PokemonState } from './pokemon.reducer';

export const selectPokemonState =
  createFeatureSelector<PokemonState>('pokemon');

// get the selectors
export const { selectIds, selectEntities, selectAll, selectTotal } =
  pokemonAdapter.getSelectors();

export const selectAllPokemons = createSelector(selectPokemonState, selectAll);

export const selectPokemonEntities = createSelector(
  selectPokemonState,
  selectEntities
);

export const selectPokemon = createSelector(
  selectPokemonEntities,
  (pokemons: any, { pokemonId }: { pokemonId: string }) => pokemons[pokemonId]
);
