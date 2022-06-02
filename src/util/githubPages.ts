export const getGithubPagesUrl = () => {
    const host = `${window.location.protocol}//${window.location.host}`;
    if (host.includes(".github.io")) {
        const _path = window.location.pathname.split("/");
        const pagesName = _path.shift();
        if (pagesName?.replace(/\s/g, "").replace(/\//g, "") == "")
            return host + "/" + _path.shift() || host;
        else return host + "/" + pagesName;
    } else {
        return host;
    }
};
