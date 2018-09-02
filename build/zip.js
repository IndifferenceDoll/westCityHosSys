  //npm install archiver --save
  var fs = require('fs');//引入文件系统
  var archiver = require('archiver');//引入node文件、文件夹压缩模块

  fs.exists("dist/",(exists) => {//判断被压缩文件是否存在
    if(!exists){//不存在则结束进程
      process.on("exit", (code) => {
        console.log('未发现打包文件');
      });
    }else{
      fs.renameSync('dist/', 'html/')
    }
  });

  const isOldZipExists = new Promise((resolve, reject) => {//定义一个promise对象（由于检测旧压缩文件是否存在的方法的回调是异步，所以将其转为同步执行）

    fs.exists("./html.zip",(exists) => {//判断旧的压缩文件是否存在

      if(exists){//存在则删掉
        fs.unlink('./html.zip',(err) => {
          if(err) throw err;
          console.log('已删除旧的压缩包')
        })
      }

      resolve();//检测旧压缩文件是否存在的方法的异步回调执行完毕后再开始执行后面的压缩代码

    });

  });

  var compressCompeleted = (function(){
    return new Promise((resolve,reject) => {
      isOldZipExists.then(() => {//isOldZipExists的异步回调执行完毕
        //压缩文件夹
        var output = fs.createWriteStream('./html.zip');//定义创建压缩文件流的行为
        var archive = archiver('zip');//创建压缩功能实例，指定zip
        archive.on('error', (err) => {//捕获错误
            throw err; //捕获到则抛出
            process.on("exit", (code) => {
              console.log('准备压缩过程出错');
            });
        });
        archive.pipe(output);//执行定义的创建压缩文件流的行为
        archive.directory('html/', true)//定位被压缩的文件
        archive.finalize();//开始压缩,这个进程无法监测，所以不能准确的进行异步转同步
        console.log('压缩完成')

        setTimeout(() => {
          resolve();
        },2000)
      })
    })
  }())

  compressCompeleted.then(() => {
    deleteall('./html')//删除被打包文件夹
    console.log('已删除被打包文件夹')
  })

  function deleteall(path) {//删除文件夹方法
    var files = [];
    if(fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function(file, index) {
        var curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) { // recurse
          deleteall(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };
