import { getGithubPagesUrl } from "../util/githubPages";

export type Route = "list" | "preview" | "404";

export const getRoute = (): Route => {
    if (
        window.location.pathname == "/" ||
        window.location.pathname == getGithubPagesUrl().split("/").pop()
    )
        return "list";
    else if (
        window.location.pathname == "/preview" ||
        window.location.pathname ==
            getGithubPagesUrl().split("/").pop() + "/preview"
    )
        return "preview";
    else return "404";
};
