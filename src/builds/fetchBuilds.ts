import axios from "axios";
import { getGithubPagesUrl } from "../util/githubPages";

export interface BuildInfo {
    name: string;
    id: string;
    broken: boolean;
}

export const fetchBuilds = async (): Promise<BuildInfo[]> => {
    const raw = await axios.get(getGithubPagesUrl() + "/builds.json");
    return raw.data;
};
