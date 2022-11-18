import {ActionPanel, List, Action, environment} from "@raycast/api";
import {MyDetail} from "./MyDetail";
import {SyncCommand} from "./SyncCommand";
import {useEffect} from "react";

export default function Command() {
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
    }, [])
    return (
        <List>
            <List.Item
                icon="list-icon.png"
                title="sync"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<SyncCommand />} />
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
