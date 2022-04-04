import React from "react";

export const About = (props) => {
  return (
    <div className="mt-40">
      <h2 className=" dark:text-white">
        {""}
        Sistema simples de cadastro de contas
        <h3>{props.title}</h3>
      </h2>
    </div>
  );
};
