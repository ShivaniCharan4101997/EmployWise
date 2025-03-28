import Pagination from "../components/Pagination.tsx";
import { useUsers } from "../contexts/fetchUsersContext.tsx";
import { useState } from "react";
import Loader from "../components/Loader.tsx";
import UserCard from "../components/UserCard.tsx";
import { User } from "../type.ts";
import UserEditForm from "../components/UserEditForm.tsx";

function Users() {
    const { error, isLoading, users, handleDelete, updateUser } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const openModalForEditing = (user: User) => {
        setIsModalOpen(true);
        setEditingUser(user);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    return (
        <div className="p-6 bg-pink-100 min-h-screen">
            <h1 className="text-3xl font-bold text-pink-700 mb-4 text-center">User List</h1>

            {error && <p className="text-red-500 text-center">Error: {error}</p>}
            {isLoading && <Loader />}

            {/* User List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user: User) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isLoading={isLoading}
                        openModalForEditing={openModalForEditing}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <Pagination />

            {/* Edit User Modal */}
            {isModalOpen && editingUser && (
                <div className="fixed inset-0 bg-pink-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-pink-700">Edit User</h2>
                        <UserEditForm
                            editingUser={editingUser}
                            updateUser={updateUser}
                            onClose={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
