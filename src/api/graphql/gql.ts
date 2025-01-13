/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment FuzzyDateFragment on FuzzyDate {\n    year\n    month\n    day\n  }\n": types.FuzzyDateFragmentFragmentDoc,
    "\n  fragment TitleFragment on MediaTitle {\n    romaji\n    english\n    native\n  }  \n": types.TitleFragmentFragmentDoc,
    "\n  fragment CharacterNameFragment on CharacterName {\n    first\n    middle\n    last\n    full\n  }\n": types.CharacterNameFragmentFragmentDoc,
    "\n  query AnimeCard($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      title {\n        ...TitleFragment\n      }\n      startDate {\n        ...FuzzyDateFragment\n      }\n      endDate {\n        ...FuzzyDateFragment\n      }\n      status\n      episodes\n      countryOfOrigin\n      format\n      coverImage {\n        extraLarge\n      }\n      genres\n      averageScore\n      description\n\n      data: characters {\n     pageInfo {\n       total\n       perPage\n       currentPage\n       lastPage\n       hasNextPage\n     }\n      nodes {\n        id\n        name {\n          first\n          middle\n          last\n          full\n          native\n          userPreferred\n        }\n      }\n    }\n    }\n  }\n": types.AnimeCardDocument,
    "\n  query CharactersAnimeConnection($id: Int!, $sort: [CharacterSort], $page: Int!, $perPage: Int!) {\n    Media(id: $id, type: ANIME) {\n      characters(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          name {\n            ...CharacterNameFragment\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n": types.CharactersAnimeConnectionDocument,
    "\n  query StudiosAnimeConnection($id: Int!, $sort: [StudioSort]) {\n    Media(id: $id, type: ANIME) {\n      studios(sort: $sort) {\n        nodes {\n          id\n          name\n          isAnimationStudio\n        }\n      }\n    }\n  }\n": types.StudiosAnimeConnectionDocument,
    "\n  query AnimeTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: media(isAdult: false, search: $search) {\n        id\n        title {\n          ...TitleFragment\n        }\n        coverImage {\n          medium\n        }\n        seasonYear\n        status\n        episodes\n        averageScore\n      }\n    }\n  }  \n": types.AnimeTableDocument,
    "\n  query CharacterCard($id: Int!) {\n    Character(id: $id) {\n      id\n      name {\n        full\n      }\n      image {\n        large\n      }\n      description(asHtml: false)\n      gender\n      dateOfBirth {\n        ...FuzzyDateFragment\n      }\n      age\n    }\n  }  \n": types.CharacterCardDocument,
    "\n  query CharacterAnimeConnection($id: Int!, $sort: [MediaSort], $page: Int!, $perPage: Int!) {\n    Character(id: $id) {\n      media(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          status\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n": types.CharacterAnimeConnectionDocument,
    "\n  query CharactersTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: characters(search: $search) {\n        id\n        name {\n          full\n        }\n        image {\n          medium\n        }\n        gender\n        media(page: 1, perPage: 4, type: ANIME) {\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CharactersTableDocument,
    "\n  query StudiosTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: studios(search: $search) {\n        id\n        name\n        isAnimationStudio\n        media(page: 1, perPage: 3) {\n          pageInfo {\n            hasNextPage\n          }\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        } \n      }\n    }\n  }  \n": types.StudiosTableDocument,
    "\n  query StudioModal($id: Int!, $page: Int!, $perPage: Int!) {\n    Studio(id: $id) {\n      id\n      name\n      media(page: $page perPage: $perPage) {\n        pageInfo {\n          hasNextPage\n        }\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n": types.StudioModalDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FuzzyDateFragment on FuzzyDate {\n    year\n    month\n    day\n  }\n"): (typeof documents)["\n  fragment FuzzyDateFragment on FuzzyDate {\n    year\n    month\n    day\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TitleFragment on MediaTitle {\n    romaji\n    english\n    native\n  }  \n"): (typeof documents)["\n  fragment TitleFragment on MediaTitle {\n    romaji\n    english\n    native\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterNameFragment on CharacterName {\n    first\n    middle\n    last\n    full\n  }\n"): (typeof documents)["\n  fragment CharacterNameFragment on CharacterName {\n    first\n    middle\n    last\n    full\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AnimeCard($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      title {\n        ...TitleFragment\n      }\n      startDate {\n        ...FuzzyDateFragment\n      }\n      endDate {\n        ...FuzzyDateFragment\n      }\n      status\n      episodes\n      countryOfOrigin\n      format\n      coverImage {\n        extraLarge\n      }\n      genres\n      averageScore\n      description\n\n      data: characters {\n     pageInfo {\n       total\n       perPage\n       currentPage\n       lastPage\n       hasNextPage\n     }\n      nodes {\n        id\n        name {\n          first\n          middle\n          last\n          full\n          native\n          userPreferred\n        }\n      }\n    }\n    }\n  }\n"): (typeof documents)["\n  query AnimeCard($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      title {\n        ...TitleFragment\n      }\n      startDate {\n        ...FuzzyDateFragment\n      }\n      endDate {\n        ...FuzzyDateFragment\n      }\n      status\n      episodes\n      countryOfOrigin\n      format\n      coverImage {\n        extraLarge\n      }\n      genres\n      averageScore\n      description\n\n      data: characters {\n     pageInfo {\n       total\n       perPage\n       currentPage\n       lastPage\n       hasNextPage\n     }\n      nodes {\n        id\n        name {\n          first\n          middle\n          last\n          full\n          native\n          userPreferred\n        }\n      }\n    }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CharactersAnimeConnection($id: Int!, $sort: [CharacterSort], $page: Int!, $perPage: Int!) {\n    Media(id: $id, type: ANIME) {\n      characters(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          name {\n            ...CharacterNameFragment\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CharactersAnimeConnection($id: Int!, $sort: [CharacterSort], $page: Int!, $perPage: Int!) {\n    Media(id: $id, type: ANIME) {\n      characters(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          name {\n            ...CharacterNameFragment\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StudiosAnimeConnection($id: Int!, $sort: [StudioSort]) {\n    Media(id: $id, type: ANIME) {\n      studios(sort: $sort) {\n        nodes {\n          id\n          name\n          isAnimationStudio\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query StudiosAnimeConnection($id: Int!, $sort: [StudioSort]) {\n    Media(id: $id, type: ANIME) {\n      studios(sort: $sort) {\n        nodes {\n          id\n          name\n          isAnimationStudio\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AnimeTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: media(isAdult: false, search: $search) {\n        id\n        title {\n          ...TitleFragment\n        }\n        coverImage {\n          medium\n        }\n        seasonYear\n        status\n        episodes\n        averageScore\n      }\n    }\n  }  \n"): (typeof documents)["\n  query AnimeTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: media(isAdult: false, search: $search) {\n        id\n        title {\n          ...TitleFragment\n        }\n        coverImage {\n          medium\n        }\n        seasonYear\n        status\n        episodes\n        averageScore\n      }\n    }\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CharacterCard($id: Int!) {\n    Character(id: $id) {\n      id\n      name {\n        full\n      }\n      image {\n        large\n      }\n      description(asHtml: false)\n      gender\n      dateOfBirth {\n        ...FuzzyDateFragment\n      }\n      age\n    }\n  }  \n"): (typeof documents)["\n  query CharacterCard($id: Int!) {\n    Character(id: $id) {\n      id\n      name {\n        full\n      }\n      image {\n        large\n      }\n      description(asHtml: false)\n      gender\n      dateOfBirth {\n        ...FuzzyDateFragment\n      }\n      age\n    }\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CharacterAnimeConnection($id: Int!, $sort: [MediaSort], $page: Int!, $perPage: Int!) {\n    Character(id: $id) {\n      media(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          status\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n"): (typeof documents)["\n  query CharacterAnimeConnection($id: Int!, $sort: [MediaSort], $page: Int!, $perPage: Int!) {\n    Character(id: $id) {\n      media(sort: $sort, page: $page, perPage: $perPage) {\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          status\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CharactersTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: characters(search: $search) {\n        id\n        name {\n          full\n        }\n        image {\n          medium\n        }\n        gender\n        media(page: 1, perPage: 4, type: ANIME) {\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CharactersTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: characters(search: $search) {\n        id\n        name {\n          full\n        }\n        image {\n          medium\n        }\n        gender\n        media(page: 1, perPage: 4, type: ANIME) {\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StudiosTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: studios(search: $search) {\n        id\n        name\n        isAnimationStudio\n        media(page: 1, perPage: 3) {\n          pageInfo {\n            hasNextPage\n          }\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        } \n      }\n    }\n  }  \n"): (typeof documents)["\n  query StudiosTable($page: Int!, $perPage: Int!, $search: String) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        currentPage\n        hasNextPage\n      }\n      rows: studios(search: $search) {\n        id\n        name\n        isAnimationStudio\n        media(page: 1, perPage: 3) {\n          pageInfo {\n            hasNextPage\n          }\n          nodes {\n            id\n            title {\n              ...TitleFragment\n            }\n          }\n        } \n      }\n    }\n  }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StudioModal($id: Int!, $page: Int!, $perPage: Int!) {\n    Studio(id: $id) {\n      id\n      name\n      media(page: $page perPage: $perPage) {\n        pageInfo {\n          hasNextPage\n        }\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n"): (typeof documents)["\n  query StudioModal($id: Int!, $page: Int!, $perPage: Int!) {\n    Studio(id: $id) {\n      id\n      name\n      media(page: $page perPage: $perPage) {\n        pageInfo {\n          hasNextPage\n        }\n        nodes {\n          id\n          title {\n            ...TitleFragment\n          }\n          coverImage {\n            medium\n          }\n        }\n      }\n    }\n  }  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;