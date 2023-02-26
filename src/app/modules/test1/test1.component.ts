import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, Test1Service } from './test1.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.sass'],
})
export class Test1Component implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  pokemonSelected$!: Observable<any>;
  constructor(private _test1Service: Test1Service) {}

  ngOnInit(): void {
    this._test1Service.getAllPokemons();

    this.pokemons$ = this._test1Service.getPokemonsAsObservable().pipe(
      map((data) =>
        data.map((pokemon: Pokemon) => ({
          ...pokemon,
          name: pokemon.name + ' test',
        }))
      )
    );

    this.pokemonSelected$ =
      this._test1Service.getPokemonsSelectedAsObservable();
  }

  subscribeTest() {
    this._test1Service.getPokemonsAsObservable().subscribe((data) => {
      console.log(data);
    });
  }

  getMorePokemons() {
    this._test1Service.getAllPokemons();
  }

  getPokemonInfo(pokemon: Pokemon) {
    this._test1Service.getPokemonInfo(pokemon);
  }
}
