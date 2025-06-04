import { Outlet } from "react-router";
import TextField from "./TextField";

export default function Layout() {
  return (
    <>
    <TextField/>
    <Outlet/>
    </>
  )
}