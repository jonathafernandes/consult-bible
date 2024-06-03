import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Button } from './Button';

interface Verse {
    book: {
        name: string;
    };
    text: string;
    chapter: number;
    number: number;
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJNb24gSnVuIDAzIDIwMjQgMTM6Mjc6NDYgR01UKzAwMDAuam9uYXRoYWZlcm5hbmRlc0BsaXZlLmNvbSIsImlhdCI6MTcxNzQyMTI2Nn0.IfxcIJKD_MywC96HKpP2fvEdaRny0cCfJdqr0mjilqg';

const urlsForSad = [
    'https://www.abibliadigital.com.br/api/verses/nvi/js/1/9',
    'https://www.abibliadigital.com.br/api/verses/nvi/jo/14/18',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/118/6',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/55/22',
    'https://www.abibliadigital.com.br/api/verses/nvi/jo/16/33',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/51/10',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/121/2',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/30/5',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/91/2',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/119/28',
];

const urlsForConfused = [
    'https://www.abibliadigital.com.br/api/verses/nvi/lc/1/37',
    'https://www.abibliadigital.com.br/api/verses/nvi/jo/14/27',
    'https://www.abibliadigital.com.br/api/verses/nvi/sl/119/105',
];

export const VerseDetails: React.FC = () => {
    const [verse, setVerse] = useState<Verse | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'sad' | 'confused' | null>(null);

    const urls = useMemo(() => {
        return {
            sad: urlsForSad,
            confused: urlsForConfused,
        };
    }, []);

    useEffect(() => {
        const fetchVerseDetails = async () => {
            if (!selectedCategory) return;

            setLoading(true);

            try {
                const categoryUrls = urls[selectedCategory];
                const url = categoryUrls[Math.floor(Math.random() * categoryUrls.length)];
                const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
                setVerse(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Erro:', error.message, error.response?.data);
                } else {
                    console.error('Erro:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVerseDetails();
    }, [selectedCategory, urls]);

    if (loading) {
        return <div className='text-center text-sm text-zinc-600'>Carregando...</div>;
    }

    return (
        <>
            <div className='flex justify-center items-center gap-4 md:flex-row flex-col'>
                <h1 className='text-xl text-center font-semibold my-4'>Escrituras para quando eu estiver:</h1>
                <div className='flex flex-wrap gap-4'>
                    <Button
                        content='triste'
                        onClick={() => setSelectedCategory('sad')}
                        className={`py-1 px-2 rounded ${selectedCategory === 'sad' ? 'border-solid border-[1px] border-rose-900' : 'border-transparent'}`}
                    />
                    <Button
                        content='confuso'
                        onClick={() => setSelectedCategory('confused')}
                        className={`py-1 px-2 rounded ${selectedCategory === 'confused' ? 'border-solid border-[1px] border-rose-900' : 'border-transparent'}`}
                    />
                </div>
            </div>
            {verse ? (
                <div className='p-8 my-0 mx-auto w-max-[800px]'>
                    <div className='w-full pb-3 border-b-[1px] border-solid border-rose-900'>
                        <h3 className='font-medium'>{verse.book.name} {verse.chapter}</h3>
                        <span>{verse.number}</span>
                        <p>{verse.text}</p>
                    </div>
                </div>
            ) : (
                <div className='mt-20 text-center text-zinc-600 text-sm'>Selecione uma categoria acima</div>
            )}
        </>
    );
};