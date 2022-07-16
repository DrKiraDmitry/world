import * as React from "react";
import styles from "./Loading.module.css";

export function Loading() {
  // return <div className={styles.loader}>
  //   <div className={styles.loaderSpinner}/>
  // </div>;
  return <></>;
}

export const LoadingIf = function (props: { children: any; isLoading: boolean }) {
  if (props.isLoading) return <Loading />;
  return <>{props.children}</>;
};

export const LoadingIfNull = function (props: { children: any }) {
  if (props.children == null) return <Loading />;
  return <>{props.children}</>;
};
