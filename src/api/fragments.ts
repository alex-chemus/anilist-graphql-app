import { gql } from ".";

gql(`
  fragment FuzzyDateFragment on FuzzyDate {
    year
    month
    day
  }
`);

gql(`
  fragment TitleFragment on MediaTitle {
    romaji
    english
    native
  }  
`);

gql(`
  fragment CharacterNameFragment on CharacterName {
    first
    middle
    last
    full
  }
`);
