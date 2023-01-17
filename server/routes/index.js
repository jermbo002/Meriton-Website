const path = require( 'path' );
const getAppData = require( './app-data' );

const routes = [
    'home',
    'portfolio'
];

module.exports = app => {
    app.get( '/*', async ( req, res, next ) => {
        try {
            res.locals = await getAppData( req.originalUrl );
            next();
        }
        catch ( e ) {
            res.status( e.status || 500 );
            res.render( 'error', {
                message: e.message,
                error: {}
            } );
        }
    } );

    // Specific route handling
    routes.forEach( route => require( `./pages/${route}` )( app ) );

    // Default route handling
    app.get( '/*', ( req, res ) => {
        try {
            let route = res.indexPath || req.originalUrl.substring( 1 );
            route = route === '' ? 'home' : route;
            
            res.render( path.join( __dirname, '..', '..', 'views', 'pages', route ), {
                ...res.locals
            } );
        }
        catch ( e ) {
            throw e;
        }
    } );
};