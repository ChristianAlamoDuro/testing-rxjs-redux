import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Test2Service } from './test2.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.sass'],
})
export class Test2Component implements OnInit {
  characters$!: Observable<any[]>;
  planets$!: Observable<any[]>;
  missions$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _test2Service: Test2Service) {}

  ngOnInit(): void {
    this.characters$ = this._test2Service.getCharactersAsObservable().pipe(
      tap((characters) => {
        const currentMissions = this.missions$.getValue();

        const planets = this._test2Service.getPlanetsAsValue();
        const randomIndex = Math.floor(
          Math.random() * planets.length
        );

        const missions = characters.map((character) => {
          const _mission = currentMissions.find(
            (_mission) => _mission.boss === character.name
          );

          if (_mission) {
            return _mission;
          }

          return {
            boss: character.name,
            planet: planets[randomIndex].name,
          };
        });

        this.missions$.next(missions);
      })
    );

    this.planets$ = this._test2Service.getPlanetsAsObservable();
  }

  addNewCharacter() {
    const charactersNames = ['C-3PO', 'R2-D2', 'Darth Vader'];
    const randomIndex = Math.floor(Math.random() * charactersNames.length);

    const currentCharacters = this._test2Service.getCharactersAsValue();
    const newCharacter = charactersNames[randomIndex];

    if (
      currentCharacters.find((character) => character.name === newCharacter)
    ) {
      return;
    }

    this._test2Service.addNewCharacter(charactersNames[randomIndex]);
  }

  addNewPlanet() {
    const planetsNames = ['Tierra', 'Alderaan', 'Yavin IV'];
    const randomIndex = Math.floor(Math.random() * planetsNames.length);

    this._test2Service.addNewPlanet(planetsNames[randomIndex]);
  }
}
