import { gql, gqlClient } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const CharacterCardDocument = gql(`
  query CharacterCard($id: Int!) {
    Character(id: $id) {
      id
      name {
        full
      }
      image {
        large
      }
      description(asHtml: false)
      gender
      dateOfBirth {
        ...FuzzyDateFragment
      }
      age
    }
  }  
`);

export default function useCharacterCard(id: number) {
  return useSuspenseQuery({
    queryKey: ["CharacterCard", id],
    queryFn: () => gqlClient.request(CharacterCardDocument, { id }),
    select: (r) => r.Character,
  });
}
