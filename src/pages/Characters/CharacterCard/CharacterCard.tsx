import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useCharacterCard from "./api/useCharacterCard";
import { CardPage } from "@/shared/ui/card";
import { cn } from "@/shared/utils/cn";
import { Skeleton } from "@/shared/ui/skeleton";
import markdownToTxt from "markdown-to-txt";
import { renderDate } from "@/shared/utils/renderDate";
import CharacterAppearancesTable from "./components/CharacterAppearancesTable/CharacterAppearancesTable";
import {
  AssembledAccordion,
  AssembledAccordionProps,
} from "@/shared/ui/accordion";
import { booleanFromString } from "@/shared/utils/string-utils";

export default function CharacterCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data } = useCharacterCard(Number(id));

  const accordionItems: AssembledAccordionProps<
    "Description" | "Appearances"
  >["items"] = [
    {
      title: "Description",
      /* api возвращает только markdown или html, приходится форматировать */
      content: markdownToTxt(data?.description ?? ""),
    },
    {
      title: "Appearances",
      content: <CharacterAppearancesTable />,
    },
  ];

  const descriptionItems: [string, string | null | undefined][] = [
    ["Gender", data?.gender],
    ["Age", data?.age],
    ["Date of birth", renderDate(data?.dateOfBirth)],
  ];

  const accordionValue = booleanFromString(
    searchParams.get("appearancesOpen") ?? "",
  )
    ? "Appearances"
    : null;

  return (
    <CardPage onNavigateBack={() => navigate(-1)} className="flex h-full gap-9">
      {data?.image?.large ? (
        <img
          src={data.image?.large}
          className={cn("h-[330px] w-[200px] rounded-md object-cover")}
        />
      ) : (
        <Skeleton className="h-[330px] w-[200px]" />
      )}
      <div className="col-span-2 flex flex-grow flex-col gap-4">
        <h1 className="text-xl font-semibold">{data?.name?.full}</h1>
        {descriptionItems.map(([title, value]) =>
          value ? (
            <p key={title}>
              <span className="font-semibold">{title}: </span>
              {value}
            </p>
          ) : null,
        )}
        <AssembledAccordion items={accordionItems} value={accordionValue} />
      </div>
    </CardPage>
  );
}
