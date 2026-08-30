import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import ProfileSummary from '../../components/User/ProfileSummary';
import PersonalDetailsCard from '../../components/User/PersonalDetailsCard';
import PasswordCard from '../../components/User/PasswordCard';
import AddressCard from '../../components/User/AddressCard';
import OrdersCard from '../../components/User/OrdersCard';
import WishlistCard from '../../components/User/WishlistCard';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const userData = user?.data;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">My Account</h1>

        <Reveal className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <ProfileSummary user={userData} />
            <PersonalDetailsCard user={userData} />
            <PasswordCard />
            <AddressCard user={userData} />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <OrdersCard />
            <WishlistCard wishlist={userData?.wishlist} />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Profile;
