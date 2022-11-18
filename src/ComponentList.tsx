import {Action, ActionPanel, List} from "@raycast/api";
import {searchComponents} from "./fileSystemUtils";
import {FC, useEffect, useState} from "react";
import type {Project} from "./types";
import {SbMigCommands} from "./SbMigCommands";
import {ProjectView} from "./ProjectView";


const ComponentList: FC<{project: Project}> = (props) => {
    const {project: {projectName, projectPath, configFile}} = props;
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const data = await searchComponents({projectPath, configFile, projectName})
            console.log(data)
            setList(data)
            setLoading(false)
        })()
    }, [])

    return (
        <List
            isLoading={loading}
        >
            {
                list?.map((component: {fullPath: string}) => {
                    return (
                        <List.Item
                            key={component.fullPath}
                            icon="list-icon.png"
                            title={component.fullPath}
                            actions={
                                <ActionPanel>
                                    <Action.Push title="Show Details" target={<ProjectView project={{projectPath: component.fullPath, projectName: "", configFile: ""}} />} />
                                </ActionPanel>
                            }
                        />
                    )
                })
            }
        </List>
    )
}

export {ComponentList}