import { axios } from "@/configs/axios";
import { useProjectStore } from "@/stores/projectStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { Button, Flex, TextInput } from "@tremor/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const General = () => {
  const { project, setProject } = useProjectStore();
  const { updateProject } = useProjectsStore();
  const [name, setName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState("");

  const handleUpdateProject = async (field: "name" | "apiUrl") => {
    setLoading(field);
    try {
      await axios.patch(`/project/${project.id}`, {
        [field]: field === "name" ? name : apiUrl,
      });

      field === "name" && setProject(name, project.id!, project.apiUrl);
      field === "apiUrl" && setProject(project.name, project.id!, apiUrl);

      updateProject({
        id: project.id!,
        name: name,
        apiUrl: apiUrl,
      });

      toast.success("Project updated");
    } catch (error: any) {
      toast.error(error.response.data.message || "Error updating project");
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="lg:w-[450px] w-full flex flex-col gap-4">
      <div className="">
        <p className="text-gray-300">Project name</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.name}
            className="!bg-transparent my-2"
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            color="purple"
            onClick={() => handleUpdateProject("name")}
            disabled={loading === "name" || name === project.name || !name}
          >
            {loading === "name" ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </div>
      <div className="">
        <p className="text-gray-300">API URL</p>
        <Flex className="gap-2">
          <TextInput
            placeholder={project.apiUrl}
            className="!bg-transparent my-2"
            onChange={(e) => setApiUrl(e.target.value)}
          />
          <Button
            color="purple"
            onClick={() => handleUpdateProject("apiUrl")}
            disabled={
              loading === "apiUrl" || apiUrl === project.apiUrl || !apiUrl
            }
          >
            {loading === "apiUrl" ? (
              <CgSpinner className="animate-spin" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default General;
