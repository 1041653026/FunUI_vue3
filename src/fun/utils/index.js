/*** 数据类型检测
 * @data 待检测数据
 * 可判断数据类型，Number, String, Boolean, undefined, null, Array, Object, Symbol, Function, Date, 
 */
export function testType(data) {
    if (data) {
        return data.constructor.name;
    } else if (data === undefined) {
        return 'undefined';
    } else if (data === null) {
        return 'null';
    } else {
        return data.constructor.name;
    }
}
/*** 数据类型比对
 * @data    待检测数据
 * @target  目标数据类型
 */
export function compareType(data, target) {
    return testType(data) === target;
}