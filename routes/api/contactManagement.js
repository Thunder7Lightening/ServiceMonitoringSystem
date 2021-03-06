var express = require('express');
var router = express.Router();

var AddContactUseCase = require('../../useCase/contactManagement/AddContactUseCase');
// var DeleteHostUseCase = require('../../useCase/hostManagement/DeleteHostUseCase');
var GetContactsUseCase = require('../../useCase/contactManagement/GetContactsUseCase');

var MongoContactRepository = require('../../adapter/repository/mongoDB/MongoContactRepository');
var contactRepository = new MongoContactRepository();

router.get('/getContacts', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    let getContactsUseCase = new GetContactsUseCase(entityContext, contactRepository);
    let contacts = await getContactsUseCase.execute();

    if (contacts == 'error')
        res.sendStatus(500);
    else
        res.send(contacts)
});

router.post('/addContact', async function(req, res, next) {
    var entityContext = req.app.get('entityContext');
    for(let notifyAddress of req.body.notifyAddresses)
        console.log(notifyAddress)
    
    let addContactUseCase = new AddContactUseCase(entityContext, contactRepository);
    let result = await addContactUseCase.execute(req.body);

    if (result == 'error')
        res.sendStatus(500);
    else
        res.sendStatus(200);
});

module.exports = router;