module.exports = (app) => {
    const livraisons = require('../controllers/livraison.controller.js');


    app.post('/livraisons', livraisons.create);

    
    app.get('/livraisons', livraisons.findAll);

   
    app.get('/livraisons/:livraisonId', livraisons.findOne);

    
    app.put('/livraisons/:livraisonId', livraisons.update);

    
    app.delete('/livraisons/:livraisonId', livraisons.delete);
}
