import { promises, readdirSync, statSync } from "fs";
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

const hasToExist = (item: any) => item[0] && item[1]

const getFileContentAsObject = async (pathToFile: string) => {
    try {
        const dataFromFile = await promises.readFile(pathToFile, {encoding: 'utf-8', flag: 'r'})

        return dataFromFile
            .split('\n')
            .map(line => line.split('='))
            .filter(hasToExist)
            .reduce((acc, next) => {
                return {
                    ...acc,
                    [next[0]]: next[1]
                }
            }, {})
    } catch (e) {
        console.log("There is a problem reading file (probably not existing)")
        console.log(e)
        return {}
    }
}

export const getEnvForProject = async (path: string) => {
    const envPath = `${path}/.env`;

    return await getFileContentAsObject(envPath)
}

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
