const middleware = {}

middleware['auth'] = require('../middleware/auth.js');
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['mobile-auth'] = require('../middleware/mobile-auth.js');
middleware['mobile-auth'] = middleware['mobile-auth'].default || middleware['mobile-auth']

export default middleware
