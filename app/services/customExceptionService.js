/**
 * если передаем объект, то expression = {сообщение: проверка}, а message пустой
 */

module.exports = (expression, message, code = null) => {

    if (Object.prototype.toString.call(expression) === '[object Object]' && message == undefined) { // Если передан объект
        if (message != undefined) throw new Error('Не правильно задан параметр message для объекта');
        return objectException(expression, code);
    }

    if (Object.prototype.toString.call(expression) === '[object Array]') { // Если передан массив
        return arrayException(expression, message, code);
    }

    if (message instanceof Array || message == undefined || message == null) { // Как бы неявно и message instanceof Object попадет, ипо прототипирован
        throw new Error('Не может быть, что expression строка, а сообщение массив, объект или не определенное значение');
    }

    return stringException(expression, message, code);

};

function stringException(expression, message, code = null) { // Если передана строка
    var messageForError = message + (code ? '. Код ошибки: ' + code : '');

    if (expression) {
        console.error(messageForError);
        throw new Error(messageForError);
    }
}

function objectException(expression, code = null) { // Если передан объект
    if (code != null || code != undefined) {

        code = `. Код ошибки: ${code}`;
    } else {

        code = '';
    }

    for (var val in expression) {
        //if (val) throw new Error(expression[val] + code); //TODO может работать не корректно
        if (expression[val]) throw new Error(val + code); //TODO может работать не корректно
    }
}

function arrayException(expression, message, code = null) { // Если передан массив
    if (code != null || code != undefined) {

        code = '. Код ошибки:' + code;

    } else {

        code = '';

    }

    expression.forEach(function(val, index) {

        var messageForException =
            (message instanceof Array)
                ? message[index] + code
                : message + code
            ;
        if (val) {
            //console.error(messageForException);
            throw new Error(messageForException);
        }
    });
}
