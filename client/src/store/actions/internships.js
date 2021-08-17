import api from "../../services/api";

import {
  SET_CURRENT_INTERNSHIP,
  SET_INTERNSHIPS,
  FORWARD_INTERNSHIP,
  APPROVE_INTERNSHIP,
  SET_CHART,
  UPDATE_INTERNSHIP,
} from "../actionTypes";
import { addError, removeError } from "./error";
import { addSuccess } from "./success";

export const setInternships = (internships) => ({
  type: SET_INTERNSHIPS,
  internships,
});

export const setCurrentInternship = (internship) => ({
  type: SET_CURRENT_INTERNSHIP,
  internship,
});

export const PushInternship = (internship) => ({
  type: FORWARD_INTERNSHIP,
  internship,
});

export const AllowInternship = (internship) => ({
  type: APPROVE_INTERNSHIP,
  internship,
});

export const ChangeInternship = (internship) => ({
  type: UPDATE_INTERNSHIP,
  internship,
});

export const analysis = (chart) => ({
  type: SET_CHART,
  chart,
});
export const getInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships");
      console.log(internships);
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getApprovedInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/approved");
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      console.log(err);
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getStudentInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/student");
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships", data);
      dispatch(setInternships(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentInternship = (path) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("get", `internships/${path}`);
      dispatch(setInternships(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const deleteInternship = (path) => {
  return async (dispatch) => {
    try {
      console.log("deleting...");
      const internship = await api.call("delete", `internships/${path}`);
      console.log("deleted");
      dispatch(setCurrentInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const forwardInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships/forward", data);
      dispatch(PushInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const uploadDocument = (data, config) => {
  return async (dispatch) => {
    try {
      const docs = await api.call(
        "post",
        "internships/uploadDocument",
        data,
        config
      );
      if (docs.message === "Error") {
        dispatch(addError("Error Uploading try again"));
      } else {
        dispatch(addSuccess("Document Uploaded Successfully"));
        dispatch(removeError());
      }
      // dispatch(addSuccess("Document Uploaded Successfully"));
      // dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const approveInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships/approve", data);
      dispatch(AllowInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const updateInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships/update", data);
      dispatch(setCurrentInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const rejectInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships/reject", data);
      dispatch(setCurrentInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const UpdateInternship = (data) => {
  return async (dispatch) => {
    try {
      const internship = await api.call("post", "internships/update", data);
      dispatch(ChangeInternship(internship));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getAllInternshipStats = () => {
  return async (dispatch) => {
    try {
      const chart = await api.call("get", "internships/allStats");
      dispatch(analysis(chart));
      dispatch(removeError());
    } catch (err) {
      const error = "Could not load data";
      dispatch(addError(error));
    }
  };
};

export const getAllInternships = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/all");
      dispatch(setInternships(internships));
      dispatch(removeError());
    } catch (err) {
      const error = "Could not load data";
      dispatch(addError(error));
    }
  };
};

export const facultyGetReport = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/report");
      if (internships.length === 0) {
        dispatch(addError("Empty report."));
      } else {
        dispatch(setInternships(internships));
        dispatch(removeError());
      }
    } catch (err) {
      const error = "Could not load data";
      dispatch(addError(error));
    }
  };
};

export const getAicteReport = () => {
  return async (dispatch) => {
    try {
      const internships = await api.call("get", "internships/aictereport");
      console.log(internships);
      if (internships) {
        dispatch(setInternships(internships));
        dispatch(removeError());
      } else {
        dispatch(addError("Empty"));
      }
    } catch (err) {
      const error = "Could not load data";
      dispatch(addError(error));
    }
  };
};
