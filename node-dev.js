/*
 * @Author: chenzhongsheng
 * @Date: 2023-01-19 09:37:52
 * @Description: Coding something
 */
const path = require('path');

console.log(path.join('c://a/b', './'));

console.log(
    path.join(
        '/cdn.jsdelivr.net/npm/es-abstract/2020/RequireObjectCoercible.js',
        '../5/CheckObjectCoercible'
    ),
);
console.log(
    path.join(
        '/cdn.jsdelivr.net/npm/es-abstract/2020/',
        '../5/CheckObjectCoercible'
    ),
);
