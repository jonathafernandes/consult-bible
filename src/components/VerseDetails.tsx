import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button } from './Button';

interface Verse {
    book: {
        name: string;
    };
    text: string;
    chapter: number;
    number: number;
}

export const VerseDetails: React.FC = () => {
    const urlsForSad = [
        'https://www.abibliadigital.com.br/api/verses/nvi/sl/30/5',
        'https://www.abibliadigital.com.br/api/verses/nvi/sl/23/4',
        'https://www.abibliadigital.com.br/api/verses/nvi/sl/55/22',
    ];

    const urlsForConfused = [
        'https://www.abibliadigital.com.br/api/verses/nvi/lc/1/37',
        'https://www.abibliadigital.com.br/api/verses/nvi/jo/14/27',
        'https://www.abibliadigital.com.br/api/verses/nvi/sl/55/22',
    ];

    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<'sad' | 'confused' | null>(null);

    useEffect(() => {
        const fetchVerseDetails = async () => {
            try {
                const responsesSad = await Promise.all(urlsForSad.map(url => axios.get(url)));
                const fetchedVersesSad = responsesSad.map(response => response.data);

                const responsesConfused = await Promise.all(urlsForConfused.map(url => axios.get(url)));
                const fetchedVersesConfused = responsesConfused.map(response => response.data);

                const allVerses = [...fetchedVersesSad, ...fetchedVersesConfused];
                
                setVerses(allVerses);
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Erro:', axiosError.message, axiosError.response?.data);
                } else {
                    console.error('Erro:', error);
                }
                setLoading(false);
            }
        };

        fetchVerseDetails();
    }, []);

    const filterVerses = () => {
        if (!selectedCategory) {
            return [];
        }

        if (selectedCategory === 'sad') {
            return verses.filter(verse => urlsForSad.some(url => url.includes(`${verse.book.name}/${verse.chapter}/${verse.number}`)));
        }

        if (selectedCategory === 'confused') {
            return verses.filter(verse => urlsForConfused.some(url => url.includes(`${verse.book.name}/${verse.chapter}/${verse.number}`)));
        }

        return verses;
    };

    if (loading) {
        return <div className='text-center text-sm text-zinc-600'>Carregando...</div>;
    }

    return (
        <>
            <div className='flex justify-center items-center gap-4 md:flex-row flex-col'>
                <h1 className='text-xl text-center font-semibold my-4'>Escrituras para quando eu estiver:</h1>
                <div className='flex flex-wrap gap-4'>
                    <Button content='triste' onClick={() => setSelectedCategory('sad')} />
                    <Button content='confuso' onClick={() => setSelectedCategory('confused')} />
                </div>
            </div>
            {selectedCategory ? (
                <div className='flex flex-wrap justify-center gap-8 m-8 md:flex-row flex-col items-center'>
                    {filterVerses().map((verse, index) => (
                        <div key={index} className='w-full md:w-1/4 pb-3 border-b-[1px] border-solid border-rose-900'>
                            <h3 className='font-medium'>{verse.book.name} {verse.chapter}</h3>
                            <span>{verse.number}</span>
                            <p>{verse.text}</p>
                        </div>
                    ))}
                </div>
            ) : <div className='mt-20 text-center text-zinc-600 text-sm'>Selecione uma categoria acima</div>}
        </>
    );
};