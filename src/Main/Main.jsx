import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

const Main = () => {
  return (
    <div>
      <Tabs value="editor">
        <TabsHeader>
          <Tab key={"Editor"} value={"editor"}>
            Editor
          </Tab>
          <Tab key={"Preview"} value={"preview"}>
            Preview
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"Editor"} value={"editor"}>
            H
          </TabPanel>
          <TabPanel key={"Preview"} value={"preview"}>
            I
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Main;
