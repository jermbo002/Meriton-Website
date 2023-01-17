import app from './app.js';
import { $, $$ } from '../utils/$';
import PubSub from '../utils/pubsub';

class Program {
    static main() {
        new PortfolioMgr();
    }
}

class PortfolioMgr {
    constructor() {
        new LogoBar();
        new CompanyMgr();
        this.addEvents();
        this.onPopState();
    }

    addEvents() {
        window.addEventListener( 'popstate', ( e ) => this.onPopState() );
    }

    onPopState() {
        const path = window.location.pathname;
        console.log( 'here' );
        console.log( path );

        if ( path === '/portfolio' ) {
            PubSub.publish( 'dialog-close' );
        }
        else {
            new CompanyDialog( path );
        }
    }
}

class LogoBar {
    constructor() {
        this.hdr = $( '.c-hdr' );
        this.root = $( '.c-portfolio-logos' );
        this.items = $$( 'a', this.root );
        this.addEvents();
    }

    addEvents() {
        this.items.forEach( item => item.addEventListener( 'click', e => this.onLogoClick( e, item ) ) );
    }

    onLogoClick( e, el ) {
        e.preventDefault();
        const targetId = el.getAttribute( 'data-target' );
        const target = $( `.c-portfolio-grid__cell[data-id="${targetId}"]` );
        window.scrollTo( 0, target.offsetTop - this.hdr.offsetHeight );
    }
}

class CompanyMgr {
    constructor() {
        this.root = $( '.c-portfolio-grid' );
        this.items = $$( '.c-portfolio-grid__item', this.root );
        this.items.forEach( item => new CompanyItem( item ) );
    }
}

class CompanyItem {
    constructor( root ) {
        this.root = root;

        this.root.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const url = this.root.getAttribute( 'href' );
            history.pushState( {}, '', url );
            new CompanyDialog( url );
        } );
    }
}

class CompanyDialog {
    constructor( url ) {
        this.url = url;
        this.data = {};
        this.root = document.createElement( 'div' );
        this.root.classList.add( 'c-portfolio-dialog' );
        this.getData();

        PubSub.subscribe( 'dialog-close', () => {
            if ( this.root ) {
                this.destroy();
            }
        } );
    }

    async getData() {
        try {
            this.data = await fetch( `/api/v1/${this.url}` );
            this.render();
        }
        catch ( e ) {
            console.log( 'Error retrieving data...' );
            console.log( e );
        }
    }

    render() {
        this.root.innerHTML = `
            <div class="c-portfolio-dialog__container">
                <div class="c-portfolio-dialog__col">
                    <h3 class="c-portfolio-dialog__hdr">
                        <img src="${this.data.color_logo.url}"
                            width="${this.data.color_logo.dimensions.width}"
                            height="${this.data.color_logo.dimensions.height}"
                            alt="${this.data.color_logo.alt}" />
                    </h3>
                    <div class="c-portfolio-dialog__overview">${this.data.overview}</div>
                    <ul class="c-portfolio-dialog__list">
                        <li><span class="c-portfolio-dialog__list-label">Headquarters:</span><span class="c-portfolio-dialog__list-value">${this.data.headquarters}</span></li>
                        <li><span class="c-portfolio-dialog__list-label">Number of Associates:</span><span class="c-portfolio-dialog__list-value">${this.data.associates}</span></li>
                        <li><span class="c-portfolio-dialog__list-label">Founded:</span><span class="c-portfolio-dialog__list-value">${this.data.founded}</span><span class="c-portfolio-dialog__list-label">Partnered:</span><span class="c-portfolio-dialog__list-value">${this.data.partnered}</span></li>
                        <li><span class="c-portfolio-dialog__list-label">Company Leadership:</span><span class="c-portfolio-dialog__list-value">${this.data.leadership}</span></li>
                    </ul>
                    <div class="c-portfolio-dialog__website">
                        <a href="${this.data.website}" target="_blank" rel="noopener">${this.data.website.replace( /http\:\/\//i, '' ).replace( /https\:\/\//i, '' ).replace( /www\./i, '' )}</a>
                    </div>
                </div>
                <div class="c-portfolio-dialog__col" style="--bg:url(${this.data.popup_image.url});--bg-twoX:url(${this.data.popup_image.twoX.url});">
                    <button class="c-portfolio-dialog__btn-close">
                        <img src="/img/icons/close.v1.svg"
                            width="40" height="40"
                            alt="Close" />
                    </button>
                </div>
            </div>
        `;

        requestAnimationFrame( () => {
            document.body.appendChild( this.root );

            requestAnimationFrame( () => {
                this.root.classList.add( '--is-visible' );
                $( '.c-portfolio-dialog__btn-close', this.root ).addEventListener( 'click', () => history.back() );
            } );
        } );
    }

    destroy() {
        const fn = () => {
            if ( this.root ) {
                this.root.parentNode.removeChild( this.root );
                this.root = null;
            }
        };

        this.root.addEventListener( 'transitionend', fn );
        this.root.classList.remove( '--is-visible' );
    }
}

( async () => {
    await app();
    Program.main();
} )();