export const done = () => {};

export const logAndThrow = (e) => {
    console.error(e.message);
    throw e;
};