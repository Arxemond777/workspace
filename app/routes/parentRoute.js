module.exports = {

    returnPromise: (targetController) => {
        return targetController
            .then(
                result => {
                    return response.json(result);
                },
                error => {
                    return response.json(error);
                }
            );
    }

};