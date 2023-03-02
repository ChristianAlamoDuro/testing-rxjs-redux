import { createAction, props } from '@ngrx/store';
import { PlanetNormalized } from './planet.reducer';

export const getPlanets = createAction(
  '[Planet] Get planets',
  props<{ page?: number }>()
);

export const getPlanetsSuccessfully = createAction(
  '[Planet] Get planets successfully',
  props<{
    planets:
      | Maybe<
          Maybe<
            {
              __typename?: 'Planet' | undefined;
            } & Pick<Planet, 'name'>
          >[]
        >
      | undefined;
  }>()
);

export const userSelectPlanetById = createAction(
  '[Planet] user select planet by id',
  props<{ planetId: string }>()
);

export const userSelectPlanetByIdSuccessfully = createAction(
  '[Planet] user select planet by id successfully',
  props<{
    planet: PlanetNormalized;
  }>()
);
