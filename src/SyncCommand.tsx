import {Action, ActionPanel, List} from "@raycast/api";
import {ComponentList} from "./ComponentList";
import {FC} from "react";
import type {Project} from "./types";

const SyncCommand: FC<{project: Project}> = (props) => {
    return (
        <List>
            <List.Item
                icon="list-icon.png"
                title="components"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<ComponentList project={props.project} />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="plugins"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<ComponentList project={props.project} />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="datasources"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<ComponentList project={props.project} />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="roles"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<ComponentList project={props.project} />} />
                    </ActionPanel>
                }
            />
        </List>
    )
}

export {SyncCommand}