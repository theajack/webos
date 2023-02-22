/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-22 09:03:03
 * @Description: Coding something
 */
const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.join(__dirname, './a.txt'), '111');