// datapod: qtools
/**
 * Takes an area of (database) items and returns the next id for an add item.
 */
export const getNextId = (items) => {
    const highestId = items.reduce((acc, item) => {
        if (item.id > acc) {
            acc = item.id;
        }
        return acc;
    }, 0);
    return highestId + 1;
};
//# sourceMappingURL=tools.js.map