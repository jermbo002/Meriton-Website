const PrismicHelpers = require( '../../../prismic/utils' );
const route = 'portfolio';

module.exports = app => handleRouteRequest( app );

function handleRouteRequest( app ) {
    const mainRouteHandler = async ( req, res, next ) => {
        try {
            const content = await PrismicHelpers.getSinglePage( req.prismic, 'portfolio_landing_page' );

            let portfolioItems = await PrismicHelpers.queryByType( req.prismic, 'portfolio_company', [], {
                orderings: {
                    field: 'my.portfolio_company.display_order'
                }
            } );

            portfolioItems = portfolioItems.map( item => {
                item.className = item.display_type === 'Tall Cell'
                    ? '--tall'
                    : item.display_type === 'Split Cell'
                        ? '--split'
                        : '';

                item.primaryImage = item.portfolio_grid_images?.length > 0
                    ? item.portfolio_grid_images[ 0 ]?.image
                    : null;

                item.isSplit = item.className === '--split';
                
                return item;
            } );

            const halfIndex = Math.floor( portfolioItems.length / 2 );
            const leftColItems = portfolioItems.filter( ( item, i ) => i < halfIndex );
            const rightColItems = portfolioItems.filter( ( item, i ) => i >= halfIndex );
            

            const data = {
                ...res.locals,
                ...content,
                portfolioItems,
                leftColItems,
                rightColItems
            };

            res.locals = data;
            res.indexPath = route;
            next();
        }
        catch ( e ) {
            res.status( e.status || 500 );
            res.render( 'error', {
                message: e.message,
                error: {}
            } );
        }
    };

    app.get( `/${route}`, mainRouteHandler );
    app.get( `/${route}/:uid`, mainRouteHandler );

    app.get( `/api/v1/${route}/:uid`, async ( req, res ) => {
        try {
            const { uid } = req.params;
            const data = await PrismicHelpers.getByUID( req.prismic, 'portfolio_company', uid );
            data.overview = PrismicHelpers.getRichTextHTML( data.overview );

            res.status( 200 ).json( {
                data,
                message: 'ok',
                status: 200
            } );
        }
        catch ( e ) {
            res.status( 500 ).json( {
                data: {},
                message: e.message,
                status: 500
            } );
        }
    } );
}