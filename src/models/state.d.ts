type UserType = {
  id: String;
  fname: String;
  lname: String;
  status: String;
};

export type StateType = {
  users: UserType[];
  editContact: UserType | null;
};

export type ActionType = {
  type: "CREATE" | "EDIT" | "DELETE" | "EDIT_SAVE";
  payload: UserType;
};

type CasesType = {
  date: String;
  cases: number;
};

export interface CountryInterface {
  country: string;
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
  deaths: number;
  recovered: number;
  active: number;
}