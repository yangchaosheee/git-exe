
const webserver = require("gulp-webserver");
const gulp = require("gulp");
const url = require("url");
const fs = require("fs");
const hotData = require("./static/data/hot.json")

gulp.task("serverStatic",()=>{
    return gulp.src("./static")
    .pipe(webserver({
        port:8000,
        open:true,
        livereload:true,
        proxies:[
            {source:"/hot",target:"http://localhost:9000/hot"}
        ]
    }))
})

gulp.task("serverData",()=>{
    return gulp.src(".")
    .pipe(webserver({
        port : 9000,
        middleware:(req,res,next) =>{
            res.setHeader("content-type","application/json");
            if(req.url.includes("favicon.ico")){
                return res.end();
                next()
            };
            let {pathname,query} = url.parse(req.url,true);
            if(pathname === "/hot/"){
                res.end(JSON.stringify(hotData))
            }
        }        
    }))
})

gulp.task("default", gulp.parallel("serverStatic", 'serverData'))                    

