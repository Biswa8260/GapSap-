import { useState, useEffect } from "react";
import FriendCard from "../components/FriendCard";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getUserFriends();
        setFriends(friendsData);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <p>Loading friends...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Friends</h1>
      {friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
