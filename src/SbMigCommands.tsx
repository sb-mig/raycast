import {FC, useEffect} from "react";
import {Action, ActionPanel, environment, List} from "@raycast/api";
import {SyncCommand} from "./SyncCommand";
import {MyDetail} from "./MyDetail";
import type {Project} from './types';


const SbMigCommands: FC<{project: Project}> = (props) => {

    useEffect(() => {
        console.log(`Raycast version: ${environment.raycastVersion}`);
        console.log(`Extension name: ${environment.extensionName}`);
        console.log(`Command name: ${environment.commandName}`);
        console.log(`Command mode: ${environment.commandMode}`);
        console.log(`Assets path: ${environment.assetsPath}`);
        console.log(`Support path: ${environment.supportPath}`);
        console.log(`Is development mode: ${environment.isDevelopment}`);
        console.log(`Theme: ${environment.theme}`);
        console.log(`LaunchType: ${environment.launchType}`);
        console.log("          ")
        console.log("          ")
        console.log("          ")
        console.log(props)
    }, [])
    return (
        <List>
            <List.Item
                icon="list-icon.png"
                title="sync"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<SyncCommand project={props.project} />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="backup"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<MyDetail />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="help"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<MyDetail />} />
                    </ActionPanel>
                }
            />
            <List.Item
                icon="list-icon.png"
                title="debug"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<MyDetail />} />
                    </ActionPanel>
                }
            />
        </List>
    );
}

export {SbMigCommands}