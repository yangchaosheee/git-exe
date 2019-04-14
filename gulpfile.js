const gulp = require("gulp");
const webserver =  require("gulp-webserver");
const setsass = require("gulp-sass");
const mybabel = require("gulp-babel");
const mincss = require("gulp-clean-css");
const minjs = require("gulp-uglify");

const url = require("url")

gulp.task("changeSass",()=>{
    return gulp.src("./public/scss/**/*.scss")
    .pipe(setsass())
    .pipe(gulp.dest("./public/css"))
})

gulp.task("changeJs",()=>{
    return gulp.src("./public/js/index.js")
    .pipe(mybabel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest("./public/newjs"))
})

gulp.task("watch",()=>{
    return gulp.watch(["./public/scss/**/*.scss","./public/js/index.js"],gulp.series("changeSass","changeJs"))
})

gulp.task("publicWeb",()=>{
    return gulp.src("./public/")
    .pipe(webserver({
        port:9000,
        open:true,
        livereload:true,
        proxies:[
            {source:"/getData",target:"http://localhost:3000/getData"}
        ]
    }))
})

gulp.task("backWeb",()=>{
    return gulp.src(".")
    .pipe(webserver({
        port:3000,
        middleware:(req,res,next)=>{

            let {pathname,query} = url.parse(req.url,true);
            
            res.setHeader("content-type","application/json");
            if(pathname == "/getData/"){
                
                res.end("222222")
            }
        }
    }))
})


gulp.task("default",gulp.series("changeSass","changeJs","publicWeb","backWeb","watch"))
