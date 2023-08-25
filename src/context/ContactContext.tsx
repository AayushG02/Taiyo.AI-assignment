import React, { createContext, useReducer } from "react";
import { StateType, ActionType } from "../models/state";

// Initial state for the context
const initialState: StateType = {
  users: [],
  editContact: null,
};

// Context creation
export const ContactContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

// Reducer function to handle state updates
export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "EDIT":
      return {
        ...state,
        editContact: action.payload,
      };
    case "DELETE":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload?.id),
      };
    case "EDIT_SAVE":
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          ...action.payload,
        };
        return {
          ...state,
          editContact: null,
          users: updatedUsers,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

// Provider component that wraps the app with the context
export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};
