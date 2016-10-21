module.exports = () => {

    return {
        
        returnPromise: (response, targetController) => {
            
            return targetController
                .then(
                    result => {
                        
                        return response.json(result);
                        
                    },
                    error => {
                        
                        return response.json({'error': JSON.stringify(error)});
                        
                    }
                );
            
        }
                
    }

};