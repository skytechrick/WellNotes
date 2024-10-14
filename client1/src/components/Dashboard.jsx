
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, PlusCircle } from 'lucide-react';
import { useOkto } from "okto-sdk-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const { getUserDetails, logOut } = useOkto();
  const [userData, setUserData] = useState({
    name: '',
    avatar: '../../public/profile.svg',
    userId: 'a51821',
    totalJournals: 35,
    groupsWon: 12,
    tokensEarned: 427.44,
    currentStreak: 26,
    leaderboardRank: 3
  });
  const [journals, setJournals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const details = await getUserDetails();
      console.log("User details fetched from Okto:", details);
      setUserDetails(details);

      const authResponse = await axios.post('http://localhost:3000/api/auth', {
        email: details.email,
      });

      if (authResponse.status === 200) {
        console.log('User authenticated successfully:', authResponse.data);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      setError(`Failed to fetch user details or authenticate: ${error.message}`);
    }
  };

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewJournal = () => {
    window.location.href = '/new-journal';
  };

  const handleJoinGroup = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <img src="/logo.svg" alt="Wellnotes Logo" width={150} height={50} />
        <div className="flex items-center gap-4">
          <span>Hey there 👋</span>
          <span className="font-bold">
            {userDetails ? userDetails.email: 'Loading...'}
          </span>
          <img 
            src={userDetails && userDetails.avatar ? userDetails.avatar : '../../public/profile.svg'} 
            alt="User avatar" 
            className="w-10 h-10 rounded-full" 
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">User ID</h2>
          <p className="text-1xl font-semibold">{userDetails.user_id}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Total Journals</h2>
          <p className="text-2xl font-bold">{userData.totalJournals}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Groups Won</h2>
          <p className="text-2xl font-bold">{userData.groupsWon}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Leaderboard Rank</h2>
          <p className="text-2xl font-bold">#{userData.leaderboardRank}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Tokens Earned</h2>
          <p className="text-2xl font-bold">{userData.tokensEarned} $NOTE</p>
          <p className="text-sm text-gray-400">${(userData.tokensEarned * 0.054).toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Current Streak</h2>
          <p className="text-2xl font-bold">{userData.currentStreak} Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search journals..."
                className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={handleNewJournal}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <PlusCircle size={20} />
              New Journal
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {filteredJournals.length > 0 ? (
              filteredJournals.map(journal => (
                <div key={journal.id} className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">{journal.title}</h3>
                  <p className="text-gray-400">{journal.excerpt}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No journals found.</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Journal Groups</h2>
          <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {[1, 2, 3, 4].map((group) => (
              <div key={group} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Fitness Goal Gang</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Entry Fee: 10 $NOTE</div>
                  <div>Duration: 14 Days</div>
                  <div>Max Players: 55</div>
                  <div>Current Players: 33</div>
                </div>
                <button
                  onClick={handleJoinGroup}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="bg-gray-1000 bg-opacity-20 backdrop-filter backdrop-blur-lg text-white border border-gray-600 shadow-lg">
          <DialogHeader>
            <DialogTitle>Yay! You discovered something...</DialogTitle>
            <DialogDescription>
              This feature to join groups and take part in journals will be launched soon in v2
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}