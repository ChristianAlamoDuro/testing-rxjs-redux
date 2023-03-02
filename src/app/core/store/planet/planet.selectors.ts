import { createFeatureSelector, createSelector } from '@ngrx/store';
import { planetAdapter, PlanetState } from './planet.reducer';

export const selectPlanetState = createFeatureSelector<PlanetState>('planet');

// get the selectors
export const { selectIds, selectEntities, selectAll, selectTotal } =
  planetAdapter.getSelectors();

export const selectAllPlanets = createSelector(selectPlanetState, selectAll);

export const selectPlanetEntities = createSelector(
  selectPlanetState,
  selectEntities
);

export const selectPlanet = createSelector(
  selectPlanetState as any,
  (planets: any[], { planetId }: { planetId: number }) => planets[planetId]
);
