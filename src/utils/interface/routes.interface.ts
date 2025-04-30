import React from "react";

export interface IRoutes {
  path: string;
  element: React.ReactNode;
  children?: Children;
}

export interface Children {
  path?: string;
  index?: boolean;
  element: React.ReactNode;
  children?: subChildren[];
}

export interface subChildren {
  path?: string;
  index?: boolean;
  element: React.ReactNode;
}
