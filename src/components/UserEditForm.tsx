import { useState } from "react";
import { User } from "../type.ts";
import { useUsers } from "../contexts/fetchUsersContext.tsx";

interface Props {
    editingUser: User;
    updateUser: (id: number, updatedData: Partial<User>) => Promise<void>;
    onClose: () => void;
}

function UserEditForm({ editingUser, onClose }: Props) {
    const { updateUser } = useUsers();

    const [userData, setUserData] = useState({
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
    });

    const [errors, setErrors] = useState<{ first_name?: string; last_name?: string; email?: string }>({});

    const validate = () => {
        let newErrors: { first_name?: string; last_name?: string; email?: string } = {};
        if (!userData.first_name.trim()) newErrors.first_name = "First name is required";
        if (!userData.last_name.trim()) newErrors.last_name = "Last name is required";
        if (!userData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = "Invalid email format";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        await updateUser(editingUser.id, userData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

            <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}

            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">
                    Update
                </button>
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default UserEditForm;
