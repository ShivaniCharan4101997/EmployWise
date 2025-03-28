import { User } from "../type.ts";

interface UserCardProps {
    user: User;
    openModalForEditing: (user: User) => void;
    handleDelete: (id: number) => void;
    isLoading?:boolean
}

function UserCard({ user, isLoading, openModalForEditing, handleDelete }: UserCardProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center border border-pink-300">
            <img
                src={user.avatar}
                alt={user.first_name}
                className="w-20 h-20 rounded-full mx-auto border-2 border-pink-500"
                loading="lazy"
            />
            <h2 className="mt-2 font-semibold text-pink-700">
                {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="mt-4 flex justify-center gap-4">
                <button
                    disabled={isLoading}
                    onClick={() => openModalForEditing(user)}
                    className="px-4 py-2 bg-pink-400 text-white rounded-lg disabled:opacity-50"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(user.id)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UserCard;
