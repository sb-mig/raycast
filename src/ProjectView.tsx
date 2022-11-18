import {Detail} from "@raycast/api";

// Define markdown here to prevent unwanted indentation.
const markdown = (fullPath: string) => `
## Full Path
${fullPath}
`;

const ProjectView = (props: any) => {
    const {project} = props;

    return (
        <Detail
            navigationTitle={project.projectName}
            markdown={markdown(project.fullPath)}
            metadata={
                <Detail.Metadata>
                    <Detail.Metadata.Label title="Project Name" text={project.projectName} />
                    <Detail.Metadata.Label title="Full Path" text={project.fullPath} />
                    <Detail.Metadata.TagList title="Type">
                        <Detail.Metadata.TagList.Item text="Storyblok" color={"#eed535"} />
                    </Detail.Metadata.TagList>
                    <Detail.Metadata.Separator />
                    <Detail.Metadata.Link title="Github" target="https://github.com/ef-global/backpack" text="Github" />
                </Detail.Metadata>
            }
        />
    )
}

export {ProjectView}