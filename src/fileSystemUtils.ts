import { readdirSync, statSync } from "fs";
import { homedir } from "os";
import glob from "fast-glob";
import { join } from "path";
import {filesPattern} from "./discover";

export const downloadsDir = join(homedir(), "Downloads");

export const folderToSearch = join(homedir(), "Projects", 'EF');

export const storyblokExistancePredicate = "storyblok.config.js" || "storyblok.config.cjs"



export const searchStoryblokProjects = () => {
    console.log(folderToSearch)
    const searchPattern = filesPattern(folderToSearch)
    console.log("searchPattern", searchPattern)
    const listOfFiles = glob(searchPattern, { ignore: ['**/node_modules/**'] })
        .then(res => {
            console.log("found stuff")
            console.log("stuff", res)

            const allProjects = res.map((projectPath) => {
                const fullPath = projectPath
                const splittedProjectPath = fullPath.split("/")
                const projectName = splittedProjectPath[splittedProjectPath.length - 2]
                return {
                    fullPath,
                    projectName
                }
            })
            
            return allProjects
        })
        .catch(err => {
            console.log("err", err)
        })
    return listOfFiles ?? ['dupa']
    // const files = readdirSync(folderToSearch);
    // console.log(files)
    // return files
    //     .filter((file) => !file.startsWith("."))
    //     .map((file) => {
    //         const path = join(downloadsDir, file);
    //         const lastModifiedAt = statSync(path).mtime;
    //         return { file, path, lastModifiedAt };
    //     })
    //     .sort((a, b) => b.lastModifiedAt.getTime() - a.lastModifiedAt.getTime());
}

// export async function getLatestDownload() {
//     const downloads = getDownloads();
//     if (downloads.length < 1) {
//         return undefined;
//     }
//
//     return downloads[0];
// }