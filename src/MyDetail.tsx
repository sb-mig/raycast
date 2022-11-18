import {FC, useEffect} from "react";
import {Detail} from "@raycast/api";
import {doSomething} from "sb-mig/dist/api/debug.js";

interface MyDetailProps {
    component?: string;
}

const MyDetail: FC<MyDetailProps> = (props) => {
    const {component} = props;

    useEffect(() => {
        doSomething();
    }, [])

    return (
        <Detail markdown={`# ${component}` ?? '# Hey! 👋'} />
    )
}

export {MyDetail}