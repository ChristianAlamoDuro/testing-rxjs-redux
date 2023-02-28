import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Test2Service {
  private _characters$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    {
      name: 'Luke Skywalker',
    },
    {
      name: 'Christian Alamo',
    },
  ]);

  private _planets$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    {
      name: 'Tatooine',
    },
  ]);

  constructor() {}

  getCharactersAsObservable() {
    return this._characters$.asObservable();
  }

  getCharactersAsValue() {
    return this._characters$.getValue();
  }

  addNewCharacter(character: string) {
    const characters = this._characters$.getValue();

    this._characters$.next([...characters, { name: character }]);
  }

  getPlanetsAsObservable() {
    return this._planets$.asObservable();
  }

  getPlanetsAsValue() {
    return this._planets$.getValue();
  }

  addNewPlanet(planet: string) {
    const planets = this._planets$.getValue();

    this._planets$.next([...planets, { name: planet }]);
  }
}
