import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student_data: {
    name: "",
    userid: "",
    password: "",
    gender: "",
    role: "",
    user_phone: "",
    address: "",
    father_name: "",
    mother_name: "",
    parents_number: "",
    institute_name: "",
    standard: "",
  },
  rep_data: {
    name: "",
    userid: "",
    password: "",
    gender: "",
    role: "",
    user_phone: "",
    institute_name: "",
  },
};

export const registerSlice = createSlice({
  name: "RegisterSlice",
  initialState,
  reducers: {
    editStudent: (state, action) => {
      state.student_data.name = action.payload;
      state.rep_data.name = action.payload;
    },
    editPassword: (state, action) => {
      state.student_data.password = action.payload;
      state.rep_data.password = action.payload;
    },
    editUser: (state, action) => {
      state.student_data.userid = action.payload;
      state.rep_data.userid = action.payload;
    },
    editGender: (state, action) => {
      state.student_data.gender = action.payload;
      state.rep_data.gender = action.payload;
    },
    editRole: (state, action) => {
      state.student_data.role = action.payload;
      state.rep_data.role = action.payload;
    },
    editPhone: (state, action) => {
      state.student_data.user_phone = action.payload;
      state.rep_data.user_phone = action.payload;
    },
    editInstitute: (state, action) => {
      state.student_data.institute_name = action.payload;
      state.rep_data.institute_name = action.payload;
    },
    editFathername: (state, action) => {
      state.student_data.father_name = action.payload;
      state.rep_data.father_name = action.payload;
    },
    editMothername: (state, action) => {
      state.student_data.mother_name = action.payload;
      state.rep_data.mother_name = action.payload;
    },
    editParentNumber: (state, action) => {
      state.student_data.parents_number = action.payload;
      state.rep_data.parents_number = action.payload;
    },
    editStandard: (state, action) => {
      state.student_data.standard = action.payload;
      state.rep_data.standard = action.payload;
    },
    editAddress: (state, action) => {
      state.student_data.address = action.payload;
      state.rep_data.address = action.payload;
    },
    editRep: (state, action) => {
      const { payload } = action;
      state.student_data = { ...state.student_data, ...payload };
    },
    editProp: (state, action) => {
      const payload = action.payload;
      state.student_data[payload] = 0;
      state.rep_data[payload] = 0;
    },
    resetAll: (state, action) => {
      state.student_data = {
        name: "",
        userid: "",
        password: "",
        gender: "",
        role: "",
        user_phone: "",
        address: "",
        father_name: "",
        mother_name: "",
        parents_number: "",
        institute_name: "",
        standard: "",
      };
      state.rep_data = {
        name: "",
        userid: "",
        password: "",
        gender: "",
        role: "",
        user_phone: "",
        institute_name: "",
      };
    },
  },
});

export const {
  editRep,
  editProp,
  editStudent,
  editAddress,
  editPassword,
  editConfirm,
  editFathername,
  editGender,
  editInstitute,
  editMothername,
  editParentNumber,
  editPhone,
  editRole,
  editStandard,
  editUser,
  resetAll,
} = registerSlice.actions;
export default registerSlice.reducer;
