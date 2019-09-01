module.exports = (app) => {
    const contact = require('../controllers/contact.controllers');
    
    app.get('/api/contact/',  contact.show_contact)
    app.post('/api/contact/add', contact.add_contact)
    app.put('/api/contact/edit', contact.edit_contact)
    app.delete('/api/contact/delete/', contact.delete_contact)
    app.post('/api/contact/search', contact.search_contact)
    
}