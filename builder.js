const fs = require('fs-extra');
const path = require('path');
const postcss = require('postcss');
const cssnested = require('postcss-nested');
const cssCustomMedia = require('postcss-custom-media');
const autoprefixer = require('autoprefixer');
const uglifycss = require('uglifycss');
const babel = require('@babel/core');
const watch = require('node-watch');

const src = 'assets/';
const dist = 'dist/';
const bundle = 'app.js';

const isProd = process.argv[2] == '--prod' ? true : false;

const json = {
    datas: {
        modules: {},
        views: {},
        app: []
    },
    add(key, name, filename, ext){
        const dir = filename.replace(ext, '')
        if(!this.datas[key][dir] && ext != '.php') this.datas[key][dir] = {
            js: '',
            css: '',
            dependencies: []
        };
        if(ext == '.js'){
            this.datas[key][dir].js = name;
            key == 'views' && this.dependencies(this.datas[key][dir]['dependencies'], name);
        }
        if(ext == '.css') this.datas[key][dir].css = name; 
    },
    dependencies(arr, name){
        const content = fs.readFileSync(name, 'utf8');
        const matches = content.matchAll(/\/modules\/(.*?)\//g);
        Array.from(matches, x => arr.push(x[1]))
    },
    create: () => fs.writeFileSync(`${dist}${src}views.json`, JSON.stringify(json.datas))
}

const core = {
    initTime: new Date(),
    compile(file, dist_name, ext){
        if(ext == '.js'){
            this.babel(fs.readFileSync(file, 'utf8'), dist_name);
        } else if(ext == '.css'){
            this.postcss(fs.readFileSync(file, 'utf8'), dist_name);
        } else{
            fs.copySync(file, dist_name);
        }
    },
    dirScan(dir) {
        const recursive = dir => {
            fs.readdirSync(dir).forEach(res => {
                const file = path.resolve(dir, res);
                const stat = fs.statSync(file);
                
                if (stat && stat.isDirectory()) {
                    recursive(file);
                } else {
                    if (!/.DS_Store$/.test(file)) {
                        const name = file.replace(`${__dirname}/`, '');
                        const filename = path.parse(name).base;
                        const ext = path.extname(filename);
          
                        if(/\/views\//.test(file)) json.add('views', name, filename, ext);
                        if(/\/modules\//.test(file)) json.add('modules', name, filename, ext);
                        filename == bundle && json.dependencies(json.datas['app'], name);
                        
                        core.compile(file, dist + name, ext);
                    }
                }
            });
        }
        recursive(dir);
	},
	
    rmDir(dirPath, removeSelf) {
        if(removeSelf === undefined) removeSelf = true;
        try{ var files = fs.readdirSync(dirPath); }
        catch(e){ return; }
        for(let file of files){
            const filePath = `${dirPath}/${file}`;
            fs.statSync(filePath).isFile() ? fs.unlinkSync(filePath) : core.rmDir(filePath);
        }
        removeSelf && fs.rmdirSync(dirPath);
	},
	
    time : () => time = (new Date() - core.initTime) / 1000,

    babel(result, dest){
        result = babel.transform(result, {
            minified: isProd ? true : false,
            comments: false,
            presets: [['@babel/preset-env']]
        }).code;
        fs.ensureDirSync(path.dirname(dest));
        fs.writeFileSync(dest, result);
    },

    postcss(result, dest){
        postcss([cssnested, 
        cssCustomMedia({
            importFrom: `${src}styles/customMedias.css`
        }), 
        autoprefixer({add: true})])
        .process(result, {from: 'undefined'})
        .then(result => {
            const minify = isProd ? uglifycss.processString(result.css) : result.css;   
            fs.ensureDirSync(path.dirname(dest));
            fs.writeFileSync(dest, minify);
        })
    },

    console(folder, filename, evt){
        let status;
        if(evt == 'remove') status = `31mremoved`;
        if(evt == 'update') status = `32mupdated`;
        if(evt == 'add') status = `36madded`;
        console.log(`\x1b[90m\x1b[3m(${folder})\x1b[39m\x1b[23m`, `\x1b[1m${filename}\x1b[22m`, `\x1b[${status}\x1b[39m`, `\x1b[3m${core.time()}s\x1b[23m`);
    }
}

core.rmDir(`${dist}${src}`);
core.dirScan(src);
json.create();
console.log(`${core.time()}s`);  

if(isProd) return
watch(src, {recursive: true}, (evt, file) => {
    if(/.DS_Store$/.test(file)) return 

    core.initTime = new Date();
    const isFile = file.indexOf(".") > 0 ? true : false;
    const filename = path.basename(file);
    const ext = path.extname(filename);
    const dist_file = dist + file;
    const folder = file.split('/')[1]; // module, view, styles, img, fonts ..
    const dir = filename.replace(ext, '') // stage, block-intro ...
   
    if(!fs.existsSync(dist_file)) evt = 'add';

    if(evt == 'update' || evt == 'add'){
        core.compile(file, dist_file, ext);
    }

    isFile && evt == 'remove' ? fs.unlinkSync(dist_file) : core.rmDir(dist_file);

    // update json
    if(folder == 'views' && ext == '.js'){
        json.datas[folder][dir]['dependencies'] = [];
        json.dependencies(json.datas[folder][dir]['dependencies'], file);
        json.create();
    }
    if(folder == 'app.js'){
        json.datas['app'] = [];
        json.dependencies(json.datas['app'], file);
        json.create();
    }
 
    core.console(folder,filename,evt);
});

console.log(`I'm Watching you...`);