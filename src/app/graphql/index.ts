import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export const GetPlanetsDocument = gql`
    query getPlanets {
  allPlanets {
    planets {
      name
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPlanetsGQL extends Apollo.Query<GetPlanetsQuery, GetPlanetsQueryVariables> {
    document = GetPlanetsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }