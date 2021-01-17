import "../preloader.css";
import Refs from "./refs";

export function showPreloader() {
  const classes = Refs.preloader.classList;
  classes.remove("done");
  classes.add("loading");
}

export function hidePreloader() {
  const classes = Refs.preloader.classList;
  classes.remove("loading");
  classes.add("done");
}
