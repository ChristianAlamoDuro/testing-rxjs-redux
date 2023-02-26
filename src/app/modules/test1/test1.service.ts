import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface Pokemon {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class Test1Service {
  private _API_URL = 'https://pokeapi.co/api/v2';
  private _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);
  private _pokemonSelected$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  pokemonPaginationInfo = {
    page: 0,
    pokemonPerPage: 20,
  };

  constructor(private _httpClient: HttpClient) {}

  getPokemonsAsObservable() {
    return this._pokemons$.asObservable();
  }

  getPokemonsValue() {
    return this._pokemons$.getValue();
  }

  getPokemonsSelectedAsObservable() {
    return this._pokemonSelected$.asObservable();
  }

  getAllPokemons() {
    this._httpClient
      .get<any>(
        `${this._API_URL}/pokemon?offset=${
          (this,
          this.pokemonPaginationInfo.pokemonPerPage *
            this.pokemonPaginationInfo.page)
        }&limit=${this.pokemonPaginationInfo.pokemonPerPage}`
      )
      .pipe(map((data) => data.results))
      .subscribe((data: any) => {
        // console.log(data);
        this.pokemonPaginationInfo.page++;
        this._pokemons$.next(data);
      });
  }

  getPokemonInfo(pokemon: Pokemon) {
    this._httpClient.get<any>(pokemon.url).subscribe((data) => {
      console.log(data);
      this._pokemonSelected$.next(data);
    });
  }
}
