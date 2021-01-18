import { success, defaultModules, error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, {});

window.stackTopRight = new Stack({
  dir1: "down",
  dir2: "left",
  firstpos1: 25,
  firstpos2: 25,
  push: "top",
  maxStrategy: "close",
  maxOpen: 1,
});

const noticeConfig = {
  animate_speed: 500,
  delay: 1000,
  stack: window.stackTopRight,
};

export function successMessage(message) {
  success({
    title: "Success",
    text: message,
    ...noticeConfig,
  });
}

export function errorMessage(message) {
  error({
    title: "Error",
    text: message,
    ...noticeConfig,
  });
}
