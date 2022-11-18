import { readdirSync, statSync } from "fs";
import { homedir } from "os";
import glob from "fast-glob";
import { join } from "path";
import {filesPattern, schemaFilesPattern} from "./discover";
import {Project} from "./types";

const ignorePersonalFiles = [
    '**/.Trash/**',
    '**/Desktop/**',
    '**/Documents/**',
    '**/Downloads/**',
    '**/Library/**',
    '**/Pictures/**'
]

export const folderToSearch = join(homedir());
// export const folderToSearch = join(homedir(), "Projects", 'EF');

export const searchStoryblokProjects = (selectedPath: string) => {
    const searchPattern = filesPattern(selectedPath ?? folderToSearch);
    const listOfFiles = glob(searchPattern, { ignore: [
            '**/node_modules/**',
            ...ignorePersonalFiles
        ] })
        .then(res => {
            const allProjects = res.map((fullPath) => {
                const splittedFullPath = fullPath.split("/")
                const projectPath = splittedFullPath.slice(0, splittedFullPath.length - 1).join("/")
                const projectName = splittedFullPath[splittedFullPath.length - 2]
                const configFile = splittedFullPath[splittedFullPath.length - 1]

                console.log({projectPath, projectName, configFile})
                return {
                    projectPath,
                    projectName,
                    configFile,
                }
            })
            
            return allProjects
        })
        .catch(err => {
            console.log("err", err)
        })
    return listOfFiles ?? ['something']
}

export const searchComponents = (project: Project) => {
    const searchPattern = schemaFilesPattern(project.projectPath)
    console.log("searchPattern", searchPattern)
    const listOfFiles = glob(searchPattern, { ignore: ['**/node_modules/{!@ef-global/**}'] })
        .then(res => {
            const allComponents = res.map((component) => {
                const fullPath = component
                return {
                    fullPath,
                }
            })

            return allComponents
        })
        .catch(err => {
            console.log("err", err)
        })
    return listOfFiles ?? ['dupa']
}
