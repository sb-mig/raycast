import {ActionPanel, Form, Action, useNavigation} from "@raycast/api";
import {ProjectList} from "./ProjectList";

export default function Command() {
    const { push } = useNavigation();

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm
                        title="Select folder"
                        onSubmit={(values: { folders: string[] }) => {
                            console.log(values)
                            const folder = values.folders[0];
                            push(<ProjectList selectedPath={folder} />)
                        }}
                    />
                </ActionPanel>
            }
        >
            <Form.FilePicker id="folders" allowMultipleSelection={false} canChooseDirectories canChooseFiles={false} />
        </Form>
    );
}