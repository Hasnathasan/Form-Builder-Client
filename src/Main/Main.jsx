import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Editor from "../Pages/Editor/Editor";
import Preview from "../Pages/Preview/Preview";

const Main = () => {
  return (
    <div>
      <Tabs value="editor">
        <TabsHeader className=" max-w-2xl h-[60px] mx-auto mt-8 bg-blue-400">
          <Tab key={"Editor"} value={"editor"} className=" text-xl font-semibold">
            Editor
          </Tab>
          <Tab key={"Preview"} value={"preview"} className=" text-xl font-semibold">
            Preview
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"Editor"} value={"editor"}>
            <Editor></Editor>
          </TabPanel>
          <TabPanel key={"Preview"} value={"preview"}>
            <Preview></Preview>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Main;
