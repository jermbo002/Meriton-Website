const prismic = require( '@prismicio/client' );
const prismicH = require( '@prismicio/helpers' );

module.exports = class PrismicUtils {
    static routes() {
        return [
            { type: 'home_page', path: '/' },
            { type: 'portfolio_company', path: '/portfolio/:uid' },
            { type: 'portfolio_landing_page', path: '/portfolio' }
        ];
    }

    static cleanFieldValue( value ) {
        if ( !value || value === 'null' ) {
            return '';
        }

        return value;
    }

    static async getSinglePage( { client }, docType ) {
        try {
            const { data } = await client.getSingle( docType );{{}}
            return data;
        }
        catch ( e ) {
            throw e;
        }
    }

    static async getByUID( { client }, docType, uid ) {
        try {
            const result = await client.getByUID( docType, uid );

            if ( !result || !result.data ) {
                throw new Error( '404' );
            }

            return {
                id: result.id,
                uid: result.uid,
                ...result.data
            };
        }
        catch ( e ) {
            throw e;
        }
    }

    static async queryByType( { client }, docType, filters = [], options = {} ) {
        try {
            const rsp = await client.getByType( docType, {
                predicates: filters,
                ...options
            } );

            return rsp.results.map( doc => {
                return {
                    id: doc.id,
                    uid: doc.uid,
                    url: doc.url,
                    type: doc.type,
                    ...doc.data
                };
            } );
        }
        catch ( e ) {
            throw e;
        }
    }

    static getRichTextHTML( field ) {
        return prismicH.asHTML( field );
    }

    static getURL( field ) {
        return prismicH.asLink( field );
    }
};