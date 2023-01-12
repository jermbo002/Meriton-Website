import app from './app.js';
import { $, $$ } from '../utils/$';

class Program {
    static main() {
        new GridMgr();
    }
}

class GridMgr {
    constructor() {
        this.root = $( '.c-home' );
        this.logo = $( '.c-home__logo', this.root );
        this.tl = $( '.c-home__tl', this.root );
        this.tr = $( '.c-home__tr', this.root );
        this.bl = $( '.c-home__bl', this.root );
        this.br = $( '.c-home__br', this.root );

        this.tl.addEventListener( 'mouseenter', () => this.onTopLeftMouseEnter() );
        this.tl.addEventListener( 'mouseleave', () => this.onCellMouseOut() );

        this.tr.addEventListener( 'mouseenter', () => this.onTopRightMouseEnter() );
        this.tr.addEventListener( 'mouseleave', () => this.onCellMouseOut() );

        this.bl.addEventListener( 'mouseenter', () => this.onBottomLeftMouseEnter() );
        this.bl.addEventListener( 'mouseleave', () => this.onCellMouseOut() );

        this.br.addEventListener( 'mouseenter', () => this.onBottomRightMouseEnter() );
        this.br.addEventListener( 'mouseleave', () => this.onCellMouseOut() );

        this.logo.addEventListener( 'mouseenter', () => this.onLogoMouseEnter() );
        this.logo.addEventListener( 'mouseleave', () => this.onCellMouseOut() );
    }

    onTopLeftMouseEnter() {
        this.tl.style.width = '70%';
        this.tl.style.height = '50%';

        this.tr.style.width = '30%';
        this.tr.style.height = '70%';

        this.bl.style.width = '50%';
        this.bl.style.height = '50%';

        this.br.style.width = '50%';
        this.br.style.height = '30%';

        this.logo.style.transform = 'translate3d(50%, 50%, 0)';
    }

    onTopRightMouseEnter() {
        this.tl.style.width = '44%';
        this.tl.style.height = '52%';

        this.tr.style.width = '56%';
        this.tr.style.height = '72%';

        this.bl.style.width = '24%';
        this.bl.style.height = '48%';

        this.br.style.width = '76%';
        this.br.style.height = '28%';

        this.logo.style.transform = 'translate3d(-80%, 60%, 0)';
    }

    onBottomLeftMouseEnter() {
        this.tl.style.width = '75%';
        this.tl.style.height = '40%';

        this.tr.style.width = '25%';
        this.tr.style.height = '60%';

        this.bl.style.width = '55%';
        this.bl.style.height = '60%';

        this.br.style.width = '45%';
        this.br.style.height = '40%';

        this.logo.style.transform = 'translate3d(75%, 0, 0)';
    }

    onBottomRightMouseEnter() {
        this.tl.style.width = '56%';
        this.tl.style.height = '24%';

        this.tr.style.width = '44%';
        this.tr.style.height = '44%';

        this.bl.style.width = '36%';
        this.bl.style.height = '76%';

        this.br.style.width = '64%';
        this.br.style.height = '56%';

        this.logo.style.transform = 'translate3d(-20%, -80%, 0)';
    }

    onLogoMouseEnter() {
        this.tl.style.width = '28%';
        this.tl.style.height = '72%';

        this.tr.style.width = '72%';
        this.tr.style.height = '32%';

        this.bl.style.width = '68%';
        this.bl.style.height = '28%';

        this.br.style.width = '32%';
        this.br.style.height = '68%';

        this.logo.style.width = '40%';
        this.logo.style.height = '40%';
        this.logo.style.transform = 'translate3d(-30%, -20%, 0)';
    }

    onCellMouseOut() {
        this.tl.style.width = '60%';
        this.tl.style.height = '40%';

        this.tr.style.width = '40%';
        this.tr.style.height = '60%';

        this.bl.style.width = '40%';
        this.bl.style.height = '60%';

        this.br.style.width = '60%';
        this.br.style.height = '40%';

        this.logo.style.width = '20%';
        this.logo.style.height = '20%';
        this.logo.style.transform = 'translate3d(0%, 0%, 0)';
    }
}

( async () => {
    await app();
    Program.main();
})();