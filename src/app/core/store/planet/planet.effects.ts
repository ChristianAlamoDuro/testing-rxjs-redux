import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { GraphQLNormalizr } from 'graphql-normalizr';
import { Observable, switchMap } from 'rxjs';
import { GetPlanetsGQL } from 'src/app/graphql';
import { getPlanets, getPlanetsSuccessfully } from './planet.actions';

const { normalize } = new GraphQLNormalizr({
  lists: true,
});

@Injectable()
export class PlanetEffects {
  constructor(
    private actions$: Actions,
    private _getPlanetsGQL: GetPlanetsGQL
  ) {}

  getPlanets$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getPlanets),
      switchMap(() => this._getPlanetsGQL.fetch()),
      switchMap((response) => {
        const a = normalize(response);
        console.log(a);

        return [
          getPlanetsSuccessfully({
            planets: response.data.allPlanets!.planets || [],
          }),
        ];
      })
    )
  );
}
