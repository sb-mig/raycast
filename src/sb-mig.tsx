import { ActionPanel, List, Action } from "@raycast/api";
import {MyDetail} from "./MyDetail";
import {SyncCommand} from "./SyncCommand";

export default function Command() {
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
