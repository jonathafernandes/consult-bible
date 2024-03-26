import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

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

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            {verses.map((verse, index) => (
                <div key={index}>
                    <h3>{verse.book.name} {verse.chapter}</h3>
                    <h4>{verse.number}</h4>
                    <p>{verse.text}</p>
                </div>
            ))}
        </div>
    );
};
