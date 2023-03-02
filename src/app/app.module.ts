import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterEffects } from './core/store/character/character.effects';
import * as characterReducer from './core/store/character/character.reducer';
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
        character: characterReducer.reducer,
      },
      {}
    ),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([CharacterEffects]),
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
