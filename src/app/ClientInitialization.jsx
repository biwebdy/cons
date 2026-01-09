'use client';

import { useEffect } from 'react';

export default function ClientInitialization() {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');

        // const WOW = require('wowjs');
        // new WOW.WOW({
        //     live: false
        // }).init();
    }, []);

    return null;
}