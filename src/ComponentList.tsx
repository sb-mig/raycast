import {Action, ActionPanel, List} from "@raycast/api";
import {MyDetail} from "./MyDetail";
import {searchStoryblokProjects} from "./fileSystemUtils";
import {useEffect, useState} from "react";
import {ProjectView} from "./ProjectView";

const hardcodedComponents = [
    'sb-text',
    'sb-tag',
    'sb-card'
]

const ComponentList = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const data = await searchStoryblokProjects()
            console.log(data)
            setList(data)
            setLoading(false)
        })()
    }, [])

    return (
        <>
            <List>
            {
                loading ? (
                    <List.Item
                        key={'loading'}
                        icon="list-icon.png"
                        title={'Loading....'}
                        actions={
                            <ActionPanel>
                                <Action.Push title="Show Details" target={<MyDetail />} />
                            </ActionPanel>
                        }
                    />
                ) : (
                    list?.map((project: any) => {
                        return (
                            <List.Item
                                key={project.projectName}
                                icon="list-icon.png"
                                title={`${project.projectName} - ${project.fullPath}`}
                                actions={
                                    <ActionPanel>
                                        <Action.Push title="Show Details" target={<ProjectView project={project} />} />
                                    </ActionPanel>
                                }
                            />
                        )
                    })
                )
            }
                    </List>
        </>
    )
}

export {ComponentList}