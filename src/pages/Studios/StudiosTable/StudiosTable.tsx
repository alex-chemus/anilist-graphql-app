import { gql } from "@/api";
import { StudiosTableQuery } from "@/api/graphql/graphql";
import { ExtractColumns, PageTable } from "@/shared/components/PageTable";
import { Badge } from "@/shared/ui/badge";
import { CardPage } from "@/shared/ui/card";
import { renderTitle } from "@/shared/utils/renderTitle";
import StudioModal from "./components/StudioModal/StudioModal";
import { CheckIcon } from "lucide-react";

const StudiosTableDocument = gql(`
  query StudiosTable($page: Int!, $perPage: Int!, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      rows: studios(search: $search) {
        id
        name
        isAnimationStudio
        media(page: 1, perPage: 3) {
          pageInfo {
            hasNextPage
          }
          nodes {
            id
            title {
              ...TitleFragment
            }
          }
        } 
      }
    }
  }  
`);

const columns: ExtractColumns<StudiosTableQuery> = [
  {
    key: "name",
    title: "Name",
    width: 250,
  },
  {
    key: "isAnimationStudio",
    title: "Animation studio",
    render: ({ isAnimationStudio }) => (
      <div className="flex justify-center">
        {isAnimationStudio ? <CheckIcon className="text-indigo-500" /> : null}
      </div>
    ),
    width: 130,
  },
  {
    key: "media",
    title: "Media",
    render: ({ media, id }) => (
      <div className="flex flex-wrap gap-1">
        {media?.nodes?.map((tag) => (
          <Badge className="whitespace-nowrap" key={tag?.id}>
            {renderTitle(tag?.title)}
          </Badge>
        ))}
        {media?.pageInfo?.hasNextPage ? <StudioModal id={id} /> : null}
      </div>
    ),
  },
];

export default function StudiosTable() {
  return (
    <CardPage className="flex flex-col">
      <PageTable
        queryKey="StudiosTable"
        document={StudiosTableDocument}
        columns={columns}
      />
    </CardPage>
  );
}
