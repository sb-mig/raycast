import path from "path";

export const filesPattern = (dir: string): string => {
    return path.join(
        `${dir}`,
        "**",
        `storyblok.config.js`
    );
};