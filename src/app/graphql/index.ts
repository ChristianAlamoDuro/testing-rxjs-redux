import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export const GetCharactersDocument = gql`
    query getCharacters($filter: FilterCharacter) {
  characters(filter: $filter) {
    results {
      id
      name
      image
      episode {
        id
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCharactersGQL extends Apollo.Query<GetCharactersQuery, GetCharactersQueryVariables> {
    document = GetCharactersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }