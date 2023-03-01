import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import {
  getPokemonById,
  getPokemonByIdSuccessfully,
  getPokemons,
  getPokemonsSuccessfully
} from './pokemon.actions';

@Injectable()
export class PokemonEffects {
  private _API_URL = 'https://pokeapi.co/api/v2';
  constructor(private actions$: Actions, private _httpClient: HttpClient) {}

  getPokemons$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemons),
      switchMap(() =>
        this._httpClient.get<any>(`${this._API_URL}/pokemon?offset=0&limit=20`)
      ),
      switchMap((response: any) => {
        const pokemons = response.results.map((a: any, index: number) => ({
          ...a,
          id: index,
        }));

        return [
          getPokemonsSuccessfully({
            pokemons,
          }),
        ];
      })
    )
  );

  getPokemonById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getPokemonById),
      switchMap(() =>
        this._httpClient.get<any>(`${this._API_URL}/pokemon?offset=0&limit=20`)
      ),
      switchMap((response: any) => {
        const pokemons = response.results.map((a: any, index: number) => ({
          ...a,
          id: index,
        }));

        console.log(response);

        return [getPokemonByIdSuccessfully()];
      })
    )
  );
}
