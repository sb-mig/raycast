import {Detail} from "@raycast/api";
import {projectDetailWithPackage} from "./markdowns";
import {pkg} from 'sb-mig/dist/utils/pkg-require.js';
import {defaultConfig, getStoryblokConfigContent} from 'sb-mig/dist/config/helper.js';
import {FC, useEffect, useState} from "react";
import type {Project} from "./types";

const getEnvForProject = (path: string) => {
    const envPath = `${path}/.env`;

    // here we need to read file, and then on any readline parse it to object

    return {
        NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: '36rftrjxFnHMBHUbjSPuPQtt',
        STORYBLOK_SPACE_ID: '183472',
        STORYBLOK_OAUTH_TOKEN: 'A9T81cyOo3Ruym1C69cmWAtt-57603-TCKLvDb1hGFLHVYr6-SY'
    }
}

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


            const env = getEnvForProject(project.projectPath)

            const {spaceId, oauthToken, accessToken, ...restCustomConfig} = customConfig

            const temp = {
                ...project,
                config: {
                    ...defaultConfig(pkg, `${project.projectPath}`, env),
                    ...restCustomConfig
                }
            }
            console.log("changed ?")
            console.log(temp)

            setProjectWithPackage(temp)
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
                    <Detail.Metadata.Link title="Github" target="https://github.com/ef-global/backpack" text="Github" />
                </Detail.Metadata>
            }
        />
    )
}

export {ProjectView}