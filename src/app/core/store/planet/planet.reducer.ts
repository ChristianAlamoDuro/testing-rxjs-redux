import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getPlanets,
  getPlanetsSuccessfully,
  userSelectPlanetById,
  userSelectPlanetByIdSuccessfully
} from './planet.actions';

export interface PlanetNormalized extends Planet {
  isSelectedByUser?: boolean;
}

export interface PlanetState extends EntityState<PlanetNormalized> {
  loading: boolean;
  loadingMessage: string;
}

// Entity Adapter
export const planetAdapter: EntityAdapter<PlanetNormalized> =
  createEntityAdapter<PlanetNormalized>();

export const initialState: PlanetState = planetAdapter.getInitialState({
  loading: false,
  loadingMessage: '',
});

const planetReducer = createReducer(
  initialState,
  on(getPlanets, (state) => ({ ...state, loading: true })),
  on(getPlanetsSuccessfully, (state, { planets }) =>
    planetAdapter.upsertMany(planets as any, { ...state, loading: false })
  ),
  on(userSelectPlanetById, (state) => ({ ...state, loading: true })),
  on(userSelectPlanetByIdSuccessfully, (state, { planet }) =>
    planetAdapter.upsertOne(planet, { ...state, loading: false })
  )
);

// tslint:disable-next-line: completed-docs
export function reducer(state: PlanetState | undefined, action: Action): any {
  return planetReducer(state, action);
}
