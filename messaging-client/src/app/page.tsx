"use client";

import { useState } from "react";
import Login from "./components/Login";

export default function Home() {
  const [id, setId] = useState();
  return (
    <>
      {id}
      <Login onIdSubmit={setId} />;
    </>
  );
}
