import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import {
    getPokemonById,
    getPokemons
} from 'src/app/core/store/planet/pokemon.actions';
import { selectAllPokemons } from 'src/app/core/store/planet/pokemon.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  pokemons$: any;
  constructor(private _store: Store<Store>, private apollo: Apollo) {}

  ngOnInit(): void {
    this._store.dispatch(getPokemons({}));
    this.pokemons$ = this._store.pipe(select(selectAllPokemons));

    this.apollo
      .query({
        query: gql`
          query characters {
            characters {
              results {
                id
                name
              }
            }
          }
        `,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPokemonById() {
    this._store.dispatch(getPokemonById({ pokemonsId: 151 }));
  }
}
