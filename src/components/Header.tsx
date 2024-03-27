import logo from '../../public/logoipsum-327.svg';

export const Header: React.FC = () => {
    return (
        <header className='flex flex-col items-center p-4 text-center'>
            <div className='flex items-center gap-1'>
                <img src={logo} alt="Consult Bible" className='size-5' />
                <span className='text-xl font-bold'>Consult Bible</span>
            </div>
            <p className='my-4 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </header>
    );
};