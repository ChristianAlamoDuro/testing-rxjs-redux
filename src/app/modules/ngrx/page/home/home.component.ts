import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  getPlanets,
  userSelectPlanetById
} from 'src/app/core/store/planet/planet.actions';
import { PlanetNormalized } from 'src/app/core/store/planet/planet.reducer';
import { selectAllPlanets } from 'src/app/core/store/planet/planet.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  planets$!: Observable<PlanetNormalized[]>;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(getPlanets({}));

    this.planets$ = this._store.pipe(
      select(selectAllPlanets),
      tap((i) => console.log(i))
    );
  }

  setSelectedPlanetById(planetId: string): void {
    this._store.dispatch(userSelectPlanetById({ planetId }));
  }
}
