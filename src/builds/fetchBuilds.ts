import axios from "axios";

export interface BuildInfo {
    name: string;
    id: string;
    broken: boolean;
}

export const fetchBuilds = async (): Promise<BuildInfo[]> => {
    const raw = await axios.get("builds.json");
    return raw.data;
};
