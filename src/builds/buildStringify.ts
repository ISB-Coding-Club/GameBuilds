import { BuildInfo } from "./fetchBuilds";

export const stringifyBuilds = (builds: BuildInfo[], html = false) => {
    let result = "";
    builds.forEach((build) => {
        if (html)
            result += `<li>${build.name} (v${build.id}) [${
                build.broken ? "Broken" : "Working"
            }]</li>`;
        else
            result += ` | ${build.name} (${build.id}) [${
                build.broken ? "Broken" : "Working"
            }] | `;
    });
    return (html ? "<ul>" : "") + result + (html ? "</ul>" : "");
};
