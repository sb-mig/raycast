// Define markdown here to prevent unwanted indentation.
import type {Project} from "./types";

export const projectDetail = (project: Project) => `
## Project Name
${project.projectName}

## Project Path
${project.projectPath}

## Storyblok Config file used
${project.configFile}
`;

interface ProjectWithPackage extends Project {
    config: any;
}

export const projectDetailWithPackage = (project: ProjectWithPackage) => `
## Project Name
${project.projectName}

## Project Path
${project.projectPath}

## Storyblok Config file used
${project.configFile}

## config
<pre>
${JSON.stringify(project.config, null, 4)}
</pre>
`;