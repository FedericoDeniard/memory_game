export const getUUID = () => {
    let uuid: string | null = null;

    uuid = localStorage.getItem("id");
    if (uuid === null) {
        uuid = crypto.randomUUID();
        localStorage.setItem("id", uuid);
    }
    return uuid;
}

