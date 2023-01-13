require( 'dotenv' ).config();

const express = require( 'express' );
const { engine } = require( 'express-handlebars' );
const helmet = require( 'helmet' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );
const compression = require( 'compression' );
const rewrite = require( 'express-urlrewrite' );
const path = require( 'path' );

// --------------------
// App object
// --------------------
const app = express();


// --------------------
// Health Check
// --------------------
app.get( '/ping', ( req, res ) => res.send( 'ok' ) );


// --------------------
// Helmet, Cookie and Body Parser middleware
// --------------------
app.use( helmet.frameguard() );
app.use( helmet.hsts() );
app.use( helmet.ieNoOpen() );
app.use( helmet.noSniff() );
app.use( helmet.originAgentCluster() );
app.use( helmet.permittedCrossDomainPolicies() );
app.use( helmet.referrerPolicy( { policy: 'no-referrer-when-downgrade' } ) );
app.use( helmet.xssFilter() );
app.disable( 'x-powered-by' );
app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );


// --------------------
// Compression
// --------------------
const compressResponse = req => {
    if ( req.headers['x-no-compression'] ) {
        return false;
    }

    return true;
};

app.use( compression( { filter: compressResponse } ) );


// --------------------
// Handle all needed rewrites for static assets
// --------------------
// @ts-ignore
app.use( rewrite( /^(.+)(\.[v]\d+\.)(js|css|png|jpg|gif|webp|pdf|svg)$/, '$1.$3' ) );
// @ts-ignore
app.use( rewrite( /^(.+)(\.[v][-]\d.\d\.)(js|css|png|jpg|gif|webp|pdf|svg)$/, '$1.$3' ) );


// --------------------
// Static assets
// --------------------
const cacheMaxAge = 31536000000;
app.use( express.static( path.join( __dirname, '..', 'static' ), { maxAge: cacheMaxAge } ) );
app.use( '/node_modules', express.static( path.join( __dirname, '..', 'node_modules' ), { maxAge: cacheMaxAge } ) );
app.use( '/logs', express.static( path.join( __dirname, '..', 'logs' ) ) );


// --------------------
// Handlebars Configuration
// --------------------
app.engine( '.hbs', engine( {
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    layoutsDir: path.join( __dirname, '..', 'views', 'templates' ),
    partialsDir: path.join( __dirname, '..', 'views', 'partials' ),
} ) );
app.set( 'view engine', '.hbs' );
app.set( 'views', path.join( __dirname, '..', 'views', 'pages' ) );


// --------------------
// Inject Prismic
// --------------------
require( './prismic' )( app );


// --------------------
// Set route handlers
// --------------------
require( './routes' )( app );


// --------------------
// 404 and 500 handling
// --------------------
app.use( ( err, req, res, next ) => {
    if ( err.message?.toLowerCase().indexOf( 'failed to lookup view' ) === 0 ) {
        res.status( 404 );
        res.render( '404', { layout: 'main.hbs' } );
    }
    else {
        res.status( err.status || 500 );
        res.render( 'error', {
            error: {},
            layout: 'main.hbs',
            message: err.message
        } );
    }
} );


// --------------------
// Catch unhandledRejections
// --------------------
process.on( 'unhandledRejection', ( reason, promise ) => {
    console.log( `UnhandledRejection: ${reason}` );
} );


// --------------------
// Expose app
// --------------------
module.exports = app;