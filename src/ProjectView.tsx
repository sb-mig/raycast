import {Detail} from "@raycast/api";
import {projectDetailWithPackage} from "./markdowns";
import {pkg} from 'sb-mig/dist/utils/pkg-require.js';
import {defaultConfig, getStoryblokConfigContent} from 'sb-mig/dist/config/helper.js';
import {FC, useEffect, useState} from "react";
import type {Project} from "./types";
import {getEnvForProject} from "./fileSystemUtils";

const ProjectView: FC<{ project: Project }> = (props) => {
    const {project} = props;
    const [loading, setLoading] = useState(true);
    const [projectWithPackage, setProjectWithPackage] = useState<any>({
        ...project,
        config: {}
    });

    useEffect(() => {
        (async () => {
            const ext = project.configFile.split('.').pop() as string;
            const file = project.configFile.split(`.${ext}`)[0]
            const filePath = `${project.projectPath}/${file}`

            const customConfig = await getStoryblokConfigContent({filePath, ext: `.${ext}`})
            const packageJsonData = pkg(`${project.projectPath}/package.json`)
            console.log("packageJsonData", packageJsonData)
            const env = await getEnvForProject(project.projectPath)

            const {spaceId, oauthToken, accessToken, ...restCustomConfig} = customConfig

            setProjectWithPackage({
                ...project,
                repoUrl: packageJsonData.repository ? packageJsonData.repository?.url : undefined,
                config: {
                    ...defaultConfig(pkg, `${project.projectPath}`, env),
                    ...restCustomConfig
                }
            })
            setLoading(false)
        })()
    }, [project.projectName, project.projectPath])

    return (
        <Detail
            isLoading={loading}
            navigationTitle={project.projectName}
            markdown={projectDetailWithPackage(projectWithPackage)}
            metadata={
                <Detail.Metadata>
                    <Detail.Metadata.Label title="Project Name" text={project.projectName} />
                    <Detail.Metadata.TagList title="Space ID">
                        <Detail.Metadata.TagList.Item text={projectWithPackage.config.spaceId} color={"#eed535"} />
                    </Detail.Metadata.TagList>
                    <Detail.Metadata.TagList title="Access Token">
                        <Detail.Metadata.TagList.Item text={projectWithPackage.config.accessToken} color={"#eed535"} />
                    </Detail.Metadata.TagList>
                    <Detail.Metadata.TagList title="OAuth Token">
                        <Detail.Metadata.TagList.Item text={projectWithPackage.config.oauthToken} color={"#eed535"} />
                    </Detail.Metadata.TagList>
                    <Detail.Metadata.Separator />
                    {
                        projectWithPackage.repoUrl && <Detail.Metadata.Link title="Github" target={projectWithPackage.repoUrl} text="Github" />
                    }
                </Detail.Metadata>
            }
        />
    )
}

export {ProjectView}