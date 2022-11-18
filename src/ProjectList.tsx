import {ActionPanel, List, Action} from "@raycast/api";
import {useEffect, useState} from "react";
import {searchStoryblokProjects} from "./fileSystemUtils";
import {ProjectView} from "./ProjectView";
import {projectDetail} from "./markdowns";
import {SbMigCommands} from "./SbMigCommands";
import type {Project} from "./types";

const ProjectList = (props: {selectedPath: string}) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const data = await searchStoryblokProjects(props.selectedPath)
            setList(data)
            setLoading(false)
        })()
    }, [])

    return (
        <>
            <List
                isLoading={loading}
                isShowingDetail
            >
                {
                    list?.map((project: Project) => {
                        return (
                            <List.Item
                                key={project.projectName}
                                icon="list-icon.png"
                                title={`${project.projectName}`}
                                subtitle={'storyblok'}
                                detail={
                                    <List.Item.Detail markdown={projectDetail(project)} />
                                }
                                actions={
                                    <ActionPanel>
                                        <Action.Push title="Manage" target={<SbMigCommands project={project} />} />
                                        <Action.Push title="Show Details" target={<ProjectView project={project} />} />
                                    </ActionPanel>
                                }
                            />
                        )
                    })
                }
            </List>
        </>
    )
}

export {ProjectList}
