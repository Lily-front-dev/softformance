//Main module 
import gulp from "gulp";
//Import path 
import { path } from "./gulp/config/path.js";
//Import plugins
import { plugins } from "./gulp/config/plugins.js";


//Pass values to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}
//Import tasks 
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//Watcher on changes in the files
function watcher () {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html); //gulp.watch(path.watch.html, gulp.series(html, ftp)); To upload immediatly on ftp after changes in html
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
export { svgSprive }
//Sequential font processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Main Tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)) ;

//Building the scenary of performing the tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//Export of the scenaries
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

//Perform tasks by default
gulp.task('default', dev);