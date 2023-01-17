require( 'dotenv' ).config();

const path = require( 'path' );
const fs = require( 'mz/fs' );

module.exports = async ( docPath ) => {
    try {
        docPath = docPath === '/' ? 'home' : docPath.substring( 1 );
        
        const env = process.env.env;
        const isProd = process.env.mode === 'prod';
        const scripts = await getScripts( docPath );
        const pageStyles = await getPageStyles( docPath );
        
        return {
            htmlClass: '',
            bodyClass: '',
            page_title: 'Page Title',
            og_img: process.env.ogImg || '',
            cssVersion: isProd ? `v-${process.env.vCss}` : `v${Date.parse( new Date().toString() )}`,
            currentYear: ( new Date() ).getFullYear(),
            isProd,
            env: {
                isLocal: env === 'local',
                isDev: env === 'dev',
                isStage: env === 'stage',
                isProd: env === 'prod'
            },
            scripts,
            pageStyles
        }
    }
    catch( e ) {
        throw e;
    }
};

async function getScripts( docPath ) {
    try {
        const scriptPath = path.join( __dirname, '..', '..', '..', 'static', 'js', process.env.jsDir, 'pages' );
        const fileNames = fs.readdirSync( scriptPath );
        
        if ( !fileNames || fileNames.length === 0 ) {
            throw new Error( 'No bundles have been built via webpack yet.' );
        }

        let commons = '';
        let pageSrc = '';
        
        fileNames.filter( f => f.indexOf( '.txt' ) === -1 && f.indexOf( '.css' ) === -1 ).forEach( f => {
            const fileName = f.toLowerCase();
            const prefix = fileName.substring( 0, fileName.indexOf( '.' ) );
            
            if ( prefix === docPath ) {
                pageSrc = `/js/${process.env.jsDir}/pages/${fileName}`;
            }
            else if ( prefix === 'commons' ) {
                commons = `/js/${process.env.jsDir}/pages/${fileName}`;
            }
        } );

        if ( pageSrc === '' ) {
            fileNames.filter( f => f.indexOf( '.txt' ) === -1 && f.indexOf( '.css' ) === -1 ).forEach( f => {
                const fileName = f.toLowerCase();
                const prefix = fileName.substring( 0, fileName.indexOf( '.' ) );

                if ( docPath.indexOf( prefix ) === 0 ) {
                    pageSrc = `/js/${process.env.jsDir}/pages/${fileName}`;
                }
            } );
        }

        return {
            commons,
            pageSrc
        }
    }
    catch( e ) {
        if ( e.code === 'ENOENT' ) {
            throw new Error( 'JS static output directory does not exist.' );
        }

        throw e;
    }
}

async function getPageStyles( docPath ) {
    try {
        let files = [];

        const scriptPath = path.join( __dirname, '..', '..', '..', 'static', 'js', process.env.jsDir, 'pages' );
        const fileNames = fs.readdirSync( scriptPath );

        fileNames.filter( f => f.indexOf( '.txt' ) === -1 && f.indexOf( '.css' ) !== -1 ).forEach( f => {
            const fileName = f.toLowerCase();
            const prefix = fileName.substring( 0, fileName.indexOf( '.' ) );
            
            if ( prefix === docPath || prefix === 'commons' ) {
                files.push( fileName );
            }
        } );

        return files;
    }
    catch ( e ) {
        throw e;
    }
}