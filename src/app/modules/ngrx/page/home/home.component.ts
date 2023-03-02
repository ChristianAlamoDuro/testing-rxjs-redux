import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPlanets } from 'src/app/core/store/planet/planet.actions';
import { selectAllPlanets } from 'src/app/core/store/planet/planet.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(private _store: Store<Store>) {}

  ngOnInit(): void {
    this._store.dispatch(getPlanets({}));
    this.planets$ = this._store.pipe(select(selectAllPlanets));
  }

  getPokemonById() {
    // this._store.dispatch(getPokemonById({ pokemonsId: 151 }));
  }
}
