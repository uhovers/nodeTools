// 遍历目录下所有的文件，按照不同类型移动到对应目录
const path = require('path')
const fs = require('fs')

const basePath = './mapPath/raw-assets';
const pngPath = './mapPath/png';
const mp3Path = './mapPath/mp3';

function mapDir(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach((filename, idx) => {
            let pathname = path.join(dir, filename);
            fs.stat(pathname, (err, stats) => {
                if (err) {
                    console.log('获取文件失败');
                    return;
                }
                if (stats.isDirectory()) {
                    mapDir(pathname, callback, finish);
                } else if (stats.isFile()) {
                    if (['.png', '.jpg'].includes(path.extname(pathname))) {
                        console.log('图片: ', pathname);
                        let dest = pngPath + '/' + filename
                        fs.rename(pathname, dest, function (err) {
                            if (err) console.log(err);
                        })
                    }else if (['.mp3'].includes(path.extname(pathname))) {
                        console.log('音频: ', pathname);
                        let dest = mp3Path + '/' + filename
                        fs.rename(pathname, dest, function (err) {
                            if (err) console.log(err);
                        })
                    }
                }
            });
        });
    })
}

mapDir(basePath);
