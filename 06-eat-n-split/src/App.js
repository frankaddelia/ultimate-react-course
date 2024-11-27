import { useState } from 'react';
import Button from './Button';
import FormSplitBill from './FormSplitBill';
import FriendsList, { FormAddFriend } from './FriendsList';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  };

  const handleUpdateFriend = (friend) => {
    setFriends((friends) => [...friends], friend);
  };

  const handleSelectedFriend = (updatedSelectedFriend) => {
    if (selectedFriend?.id === updatedSelectedFriend.id) {
      setSelectedFriend(null);
      setShowAddFriend(false);
      return;
    }
    setSelectedFriend(updatedSelectedFriend);
  };

  const handleCalculateBill = (
    friendId,
    billTotal,
    yourExpense,
    whoIsPaying
  ) => {
    const friend = friends.find((friend) => friend.id === friendId);
    const userIsPaying = whoIsPaying === 'user' ? 1 : -1;

    friend.balance = (billTotal - yourExpense) * userIsPaying + friend.balance;

    handleUpdateFriend(friend);
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friends}
          selectedFriendId={!!selectedFriend ? selectedFriend.id : ''}
          onSelectedFriend={handleSelectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onCalculateBill={handleCalculateBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
