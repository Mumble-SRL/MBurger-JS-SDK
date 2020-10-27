// Import MBurger SDK
const mburger = require('../mburger');

// Init the connection
const instance = mburger.createClient({
    api_key: '5cb5096bd6631a721187961735cd211d173488a7'
});

// Get a specific block
instance.getSection({
    section_id: 14087
}).then(result => console.log(result));
