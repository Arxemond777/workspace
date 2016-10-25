/**
 *
 * @param expression - Выражение. (если передаем объект, то expression = {сообщение: проверка}, а message пустой)
 * @param message - Сообщение, которое будет в ошибке
 * @param code - Код Exception
 */
module.exports = (expression, message, code = null) => {

    if (code != null || code != undefined) {

        code = `. Код ошибки: ${code}`;

    } else {

        code = '';

    }

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

function stringException(expression, message, code) { // Если передана строка

    if (expression) {

        throw new Error(`${message} ${code}`);

    }

}

function objectException(expression, code) { // Если передан объект

    for (var val in expression) {

        if (expression[val]) throw new Error(val + code); // TODO может работать не корректно

    }

}

function arrayException(expression, message, code) { // Если передан массив

    expression.forEach(function(val, index) {

        var messageForException =
            (message instanceof Array)
                ? message[index] + code
                : message + code;

        if (val) {

            throw new Error(messageForException);

        }

    });

}
