import { getAllSkillRequest } from "../../actions/skillRequestsActions";
import RemoveRequestSkillBtn from "../../../components/RemoveRequestSkillBtn";

// async function getRequestSkills() {
//   const cookie = cookies().get("next-auth.session-token");
//   const res = await fetch("http://localhost:3000/api/requestskills/", {
//     headers: {
//       Cookie: `${cookie?.name}=${cookie?.value}`,
//     },
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch request skills");
//   }
//   return res.json();
// }

export default async function RequestSkills() {
  const { requestSkills } = await getAllSkillRequest();

  return (
    <>
      <h2 className="text-xl font-medium mt-5">Asking for skills</h2>
      <div className="flex flex-col gap-1">
        {requestSkills.length ? (
          requestSkills.map((skill: any) => {
            return (
              <div key={skill.id} className="flex justify-between">
                <div>{skill.name}</div>
                <RemoveRequestSkillBtn skill={skill} />
              </div>
            );
          })
        ) : (
          <div>Kosong</div>
        )}
      </div>
    </>
  );
}
