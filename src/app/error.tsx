"use client";
import React from "react";

function Error({ error }: { error: Error }) {
  return <>{error.message}</>;
}

export default Error;
