import { createAction, props } from '@ngrx/store';

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
