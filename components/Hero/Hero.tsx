// Hero.tsx


'use client';

import { useState } from 'react';
import SequencePlayer from './SequencePlayer';
import IdentityBlock from './IdentityBlock';
import Preloader from '../Loader/Preloader';

export default function Hero() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <Preloader isLoading={isLoading} />
            <div className="relative">
                <SequencePlayer onLoadComplete={() => setIsLoading(false)}>
                    <IdentityBlock />
                </SequencePlayer>
            </div>
        </>
    );
}
