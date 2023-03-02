import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { GraphQLNormalizr } from 'graphql-normalizr';
import { forkJoin, Observable, of, switchMap, take } from 'rxjs';
import { GetPlanetsGQL } from 'src/app/graphql';
import {
  getPlanets,
  getPlanetsSuccessfully,
  userSelectPlanetById,
  userSelectPlanetByIdSuccessfully
} from './planet.actions';
import { PlanetNormalized } from './planet.reducer';
import { selectAllPlanets } from './planet.selectors';

const { normalize } = new GraphQLNormalizr({
  lists: true,
});

@Injectable()
export class PlanetEffects {
  constructor(
    private actions$: Actions,
    private _getPlanetsGQL: GetPlanetsGQL,
    private _store: Store
  ) {}

  getPlanets$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getPlanets),
      switchMap(() => this._getPlanetsGQL.fetch()),
      switchMap((response) => {
        const { planets } = normalize(response);
        console.log(normalize(response));

        return [
          getPlanetsSuccessfully({
            planets: planets || [],
          }),
        ];
      })
    )
  );

  userSelectPlanetById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userSelectPlanetById),
      switchMap(({ planetId }) =>
        this._store.pipe(select(selectAllPlanets)).pipe(
          take(1),
          switchMap((planets) =>
            forkJoin({
              planets: of(planets),
              planetSelectedId: of(planetId),
            })
          )
        )
      ),
      switchMap(({ planetSelectedId, planets }) => {
        const planetSelected = planets.find(
          (planet) => planet.id === planetSelectedId
        );

        const planet = {
          ...planetSelected,
          isSelectedByUser: !planetSelected?.isSelectedByUser,
        };

        return [
          userSelectPlanetByIdSuccessfully({
            planet: planet as PlanetNormalized,
          }),
        ];
      })
    )
  );
}
