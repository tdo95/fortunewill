const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const fortuneResponses = require('./reponses');

const server = http.createServer((req, res) => {
    const requestUrl = url.parse(req.url);
    const page = requestUrl.pathname;
    const params = querystring.parse(requestUrl.query);
    const routes = {
        '/': {
          file: 'index.html', 
          contentType: 'text/html'
        }, 
        '/css/style.css':{
          file: 'css/style.css',
          contentType: 'text/css'
        },
        '/css/normalize.css':{
          file: 'css/style.css',
          contentType: 'text/css'
        },
        '/js/main.js': {
          file: 'js/main.js',
          contentType: 'text/javascript'
        },
        '/js/three.js': {
          file: 'js/three.js',
          contentType: 'text/javascript'
        },
        '/js/GLTFLoader.js': {
          file: 'js/GLTFLoader.js',
          contentType: 'text/javascript'
        },
        '/js/OrbitControls.js': {
          file: 'js/OrbitControls.js',
          contentType: 'text/javascript'
        },
        '/js/RGBELoader.js': {
          file: 'js/RGBELoader.js',
          contentType: 'text/javascript'
        },
        '/js/DRACOLoader.js': {
          file: 'js/DRACOLoader.js',
          contentType: 'text/javascript'
        },
        '/js/MR_INT-001_NaturalStudio_NAD.hdr': {
          file: 'js/MR_INT-001_NaturalStudio_NAD.hdr',
          contentType: 'image/vnd.radiance'
        },
        '/js/royal_esplanade_1k.hdr': {
          file: 'js/royal_esplanade_1k.hdr',
          contentType: 'image/vnd.radiance'
        },
        '/js/brown_photostudio_02_1k.hdr': {
          file: 'js/brown_photostudio_02_1k.hdr',
          contentType: 'image/vnd.radiance'
        },
        '/js/sepulchral_chapel_rotunda_1k.hdr': {
          file: 'js/sepulchral_chapel_rotunda_1k.hdr',
          contentType: 'image/vnd.radiance'
        },
        '/js/scene.gltf': {
          file: 'js/scene.gltf',
          contentType: 'model/gltf-binary'
        },
        '/js/fortune_teller.glb': {
          file: 'js/fortune_teller.glb',
          contentType: 'model/gltf-binary'
        },
        '/js/scene.bin': {
          file: 'js/scene.bin',
          contentType: 'application/octet-stream'
        },
        '/js/textures/Fortune_baseColor.jpeg': {
          file: 'js/textures/Fortune_baseColor.jpeg',
          contentType: 'image/jpeg'
        },
        '/js/textures/Fortune_metallicRoughness.png': {
          file: 'js/textures/Fortune_metallicRoughness.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Fortune_normal.png': {
          file: 'js/textures/Fortune_normal.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Fortune_emissive.jpeg': {
          file: 'js/textures/Fortune_emissive.jpeg',
          contentType: 'image/jpeg'
        },
        '/js/textures/Glass_normal.png': {
          file: 'js/textures/Glass_normal.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Glass_metallicRoughness.png': {
          file: 'js/textures/Glass_metallicRoughness.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Glass_emissive.jpeg': {
          file: 'js/textures/Glass_emissive.jpeg',
          contentType: 'image/jpeg'
        },
        '/js/textures/Glass_baseColor.png': {
          file: 'js/textures/Glass_baseColor.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Cabinet_normal.png': {
          file: 'js/textures/Cabinet_normal.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Cabinet_metallicRoughness.png': {
          file: 'js/textures/Cabinet_metallicRoughness.png',
          contentType: 'image/jpeg'
        },
        '/js/textures/Cabinet_baseColor.jpeg': {
          file: 'js/textures/Cabinet_baseColor.jpeg',
          contentType: 'image/jpeg'
        },

        "/api": {
          contentType: 'application/json'
        }
    };
    console.log(page);
    if (routes[page]) {
      
      if (page === '/api') {
        res.writeHead(200, {'Content-Type': routes[page].contentType});
        let obj = getRandomFortuneResponse();
        res.end(JSON.stringify(obj));
      } 
      else {
        fs.readFile(routes[page].file, 
          function(err, data) {
            res.writeHead(200, {'Content-Type': routes[page].contentType});        
            res.write(data);
            res.end();          
          });
      }
    }

});

function getRandomFortuneResponse() {
  let listLength = Object.keys(fortuneResponses).length;
  let randomNum = Math.floor(Math.random() * listLength)
  console.log(randomNum)

  return {'response': fortuneResponses[randomNum]};
}



server.listen(8000);