import { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 2) {
      return toast.error('Search term must be at least 2 characters long');
    }

    const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error("No such user found!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 mx-1'>
      <input
        type="text"
        placeholder='Search...'
        className="input input-bordered rounded-full w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-sky-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle text-white bg-sky-500'>
        <IoSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
}

export default SearchInput;
