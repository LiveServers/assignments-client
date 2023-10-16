import Backdrop from "./Backdrop";
import Card from "./Card";
import Button from "./Button";

export default function ComponentsOverrides(theme) {
  return Object.assign(Backdrop(theme), Card(theme), Button(theme));
}