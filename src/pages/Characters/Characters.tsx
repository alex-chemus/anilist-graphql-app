import { gql } from "@/api";
import { AllPeopleQuery } from "@/api/graphql/graphql";
import { Column } from "@/shared/components/VirtualTable/types";
import useVirtualTable from "@/shared/components/VirtualTable/useVirtualTable";
import VirtualTable from "@/shared/components/VirtualTable/VirtualTable";
import { CardPage, CardTitle } from "@/shared/ui/card";

const allPeopleDocument = gql(`
  query AllPeople($after: String, $first: Int) 
    {
      allPeople(after: $after, first: $first) {
        edges {
        node {
          name
        }
        cursor
      }
    }
  }
`);

const columns: Column<AllPeopleQuery["allPeople"]>[] = [
  {
    title: "name",
    field: "name",
  },
];

export default function Characters() {
  const { query, loadMore } = useVirtualTable({
    queryKey: "allPeople",

    document: allPeopleDocument,
    select: (r) => r.allPeople,
  });

  return (
    <CardPage>
      <CardTitle>Characters List</CardTitle>
      <VirtualTable query={query} loadMore={loadMore} columns={columns} />
    </CardPage>
  );
}
