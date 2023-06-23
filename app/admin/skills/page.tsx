import PaginationNumber from "../../../components/PaginationNumber";
import { getAllSkills } from "../../actions/skillActions";
import ErrorBoundary from "../../../utils/ErrorBoundary";
import FormCreateSkillModal from "../../../components/FormCreateSkillModal";
import SkillCardAdmin from "../../../components/SkillCardAdmin";
import SearchForm from "../../../components/SearchForm";

interface Skill {
  id: string;
  name: string;
  description: string;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { skills, totalPage }: { skills: any; totalPage: number } =
    await getAllSkills(searchParams);

  return (
    <main className="p-2">
      <h1 className="text-2xl font-bold">Manage Skills</h1>
      <ErrorBoundary>
        <div className="flex mt-3 mb-2 items-center justify-between">
          <SearchForm />
          <FormCreateSkillModal />
        </div>
      </ErrorBoundary>
      <h2 className="text-lg font-medium my-2">List Skill</h2>

      <div className="flex flex-col gap-3">
        {skills !== null ? (
          skills.map((skill: Skill) => {
            return <SkillCardAdmin key={skill.id} skill={skill} />;
          })
        ) : (
          <div>Skill not found</div>
        )}
      </div>
      <PaginationNumber totalPages={totalPage} />
    </main>
  );
}
