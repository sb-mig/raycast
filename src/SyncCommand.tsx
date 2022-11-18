import {Action, ActionPanel, List} from "@raycast/api";
import {ComponentList} from "./ComponentList";

const SyncCommand = () => {
    return (
        <List>
            <List.Item
                icon="list-icon.png"
                title="components"
                actions={
                    <ActionPanel>
                        <Action.Push title="Show Details" target={<ComponentList />} />
                    </ActionPanel>
                }
            />
        </List>
    )
}

export {SyncCommand}