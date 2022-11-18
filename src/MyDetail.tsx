import {Detail} from "@raycast/api";
import {FC} from "react";

interface MyDetailProps {
    component?: string;
}

const MyDetail: FC<MyDetailProps> = (props) => {
    const {component} = props;

    return (
        <Detail markdown={`# ${component}` ?? '# Hey! 👋'} />
    )
}

export {MyDetail}