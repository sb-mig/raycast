import path from "path";

export const filesPattern = (dir: string): string => {
    return path.join(
        `${dir}`,
        "**",
        `{storyblok.config.js,storyblok.config.cjs}`
    );
};

export const schemaFilesPattern = (dir: string): string => {
    return path.join(
        `${dir}`,
        "**",
        `*{.sb.js,.sb.cjs}`
    );
};