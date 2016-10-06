/**
 *
 * @param errorMessage - сообщение ошибки
 * @param status - статус ошибки, default = 500
 * @returns {{status: number, error: *}}
 */
module.exports = (errorMessage, status = 500) => {

  return {
      status: status,
      error: errorMessage
  }

};
