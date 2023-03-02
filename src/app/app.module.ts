import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonEffects } from './core/store/planet/pokemon.effects';
import * as pokemonReducer from './core/store/planet/pokemon.reducer';
import { GraphQLModule } from './graphql.module';
import { NgrxModule } from './modules/ngrx/ngrx.module';
import { Test1Module } from './modules/test1/test1.module';
import { Test2Module } from './modules/test2/test2.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Test1Module,
    HttpClientModule,
    Test2Module,
    NgrxModule,
    StoreModule.forRoot(
      {
        pokemon: pokemonReducer.reducer,
      },
      {}
    ),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([
      PokemonEffects
    ]),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
