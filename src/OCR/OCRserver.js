const spawn = require('child_process').spawn;

// 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
const result = spawn('python', ['temp.py']);


result.stderr.on('data', function(data) {
        console.log("222", data.toString());
});