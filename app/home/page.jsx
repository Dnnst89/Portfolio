import Hero from '@/components/Hero';
import SideBar from '@/components/SideBar';
import ToogleSideBar from '@/components/ToogleSideBar';

const page = () => {
    return (
        <>
            <div className="grid grid-cols-5">
                <div className="col-span-1">
                    <ToogleSideBar />
                    <SideBar />
                </div>
                <div className="col-span-4">
                    <Hero />
                </div>
            </div>
        </>
    );
};

export default page;
