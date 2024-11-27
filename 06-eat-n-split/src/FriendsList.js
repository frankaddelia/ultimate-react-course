import { useState } from "react";
import Button from "./Button";

const FriendsList = ({friends, selectedFriendId, onSelectedFriend}) => {
  return (
    <ul>
      {friends.map(friend => 
        <Friend friend={friend} selectedFriendId={selectedFriendId} id={friend.id} onSelectedFriend={() => onSelectedFriend(friend)} />
      )}
    </ul>
  );
}

const Friend = (props) => {
  const { friend, id, selectedFriendId, onSelectedFriend } = props;
  let statusColor = '';
  const message = (friend.balance === 0) ? `You and ${friend.name} are even` : `${friend.balance < 0 ? 'You owe ' + friend.name : friend.name + ' owes you '} ${Math.abs(friend.balance)}`;

  if (friend.balance < 0) {
    statusColor = 'red';
  }
  
  if (friend.balance > 0) {
    statusColor = 'green';
  }

  return <li key={id}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    <p className={statusColor}>
      {message}
    </p>
    <Button onClick={() => onSelectedFriend(friend)}>{selectedFriendId === id ? 'Close' : 'Select'}</Button>
  </li>;
}

export function FormAddFriend ({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: id
    };

    onAddFriend(newFriend);

    setName('');
    setImage("https://i.pravatar.cc/48?u=499476");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label htmlFor="friend-name">🤼 Friend Name</label>
    <input id="friend-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

    <label htmlFor="img-url">🖼 Image URL</label>
    <input id="img-url" type="text" value={image} onChange={(e) => setImage(e.target.value)} />

    <Button className="button">Add</Button>
  </form>
}

export default FriendsList;