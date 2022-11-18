import {Action, ActionPanel, List} from "@raycast/api";
import {MyDetail} from "./MyDetail";


const hardcodedComponents = [
    'sb-text',
    'sb-tag',
    'sb-card'
]

const ComponentList = () => {
    return (
        <List>
            {
                hardcodedComponents.map((component) => {
                    return (
                        <List.Item
                            key={component}
                            icon="list-icon.png"
                            title={component}
                            actions={
                                <ActionPanel>
                                    <Action.Push title="Show Details" target={<MyDetail component={component} />} />
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