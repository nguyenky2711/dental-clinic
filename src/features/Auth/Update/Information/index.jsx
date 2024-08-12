import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { AuthContext } from "../../../../provider/AuthContext";
import StaffInfPage from "./staff";
import UpdateInfPatientPage from "./patient";

const ChangeInforPage = () => {
  const { token, role, logout } = useContext(AuthContext);

  return role === "Role_Staff" ? <StaffInfPage /> : <UpdateInfPatientPage />;
};

export default ChangeInforPage;
