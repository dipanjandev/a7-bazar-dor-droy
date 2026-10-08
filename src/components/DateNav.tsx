"use client";

import { useSyncExternalStore } from "react";

const getSnapshot = () =>
  new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

const getServerSnapshot = () => "";

const subscribe = () => () => {};

export default function DateNav() {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!date) return <span className="font-normal text-sm opacity-0">...</span>;

  return <span className="font-normal text-sm">{date}</span>;
}
