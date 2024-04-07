module.exports = (app) => {
    const paniers = require('../controllers/panier.controller.js');


    app.post('/paniers', paniers.create);

    
    app.get('/paniers', paniers.findAll);

   
    app.get('/paniers/:panierId', paniers.findOne);

    
    app.put('/paniers/:panierId', paniers.update);

    
    app.delete('/paniers/:panierId', paniers.delete);
}
