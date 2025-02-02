import { createContext } from "react";

export const usernameContext = createContext(null);
export const loginContext = createContext(null);
export const taskUpdateContext = createContext(false);
export const listsUpdateContext = createContext(false);
export const listsContext = createContext(null);
export const tasksUpdateContext = createContext(false);
export const tasksContext = createContext(null);
export const themeContext = createContext(null);
export const modalModeContext = createContext(null); // context for deciding edit or new task modal mode
export const modalStateContext = createContext(null); //context for opening and closing task modal
export const editModalDataContext = createContext(null); // updates the data from task.jsx into the edit data modal
export const filterListContext = createContext(null);