export default function routing(path) {
    const array = window.location.pathname.split("/");
    array.shift();
    array.pop();
    const routers = `${array.map((res) => res)[0]}/${
        array.map((res) => res)[1]
    }/${array.map((res) => res)[2]}/${array.map((res) => res)[3]}`;
    return "/" + routers + "/" + path;
}
