import replace from "gulp-replace";//Search and replace
import plumber from "gulp-plumber";//Errors handler
import notify from "gulp-notify";//Messages and hints
import browsersync from "browser-sync";//Local server
import newer from "gulp-newer";//Updates chacker
import ifPlugin from "gulp-if";//Conditional brunches

//Export object
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}