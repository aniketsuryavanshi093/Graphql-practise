import { Outlet } from 'react-router-dom';
import UserLayout from './UserLayout';
import NavigationBar from '../Components/NavBar/Navbar';

const LayoutWrapper: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return (
            <UserLayout>
                <div className='flex w-4/5 m-auto'>
                    <Outlet />
                </div>
            </UserLayout>
        );
    }
    return (
        <>
            <NavigationBar isAuth={false} />
            <div className='flex w-4/5 m-auto'>
                <Outlet />
            </div>
        </>
    );
}

export default LayoutWrapper;