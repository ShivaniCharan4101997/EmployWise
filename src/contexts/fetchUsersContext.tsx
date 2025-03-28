import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../type.ts";

interface UsersContextType {
    users: User[];
    isLoading: boolean;
    error: string;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (user: User) => void;
    editingUser: User | null;
    setEditingUser: (user: User | null) => void;
    updateUser: (id: number, updatedData: Partial<User>) => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const fetchUsers = async (page: number) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data.data);
            setTotalPages(data.total_pages);
        } catch (e: any) {
            console.error(e.message);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        fetchUsers(page);
    }, [page]);

    const handleEdit = (user: User) => {
        setEditingUser(user);
    };

    const updateUser = async (id: number, updatedData: Partial<User>) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, ...updatedData } : user
                )
            );

            toast.success("User updated successfully!");
        } catch (error: any) {
            console.error(error.message);
            toast.error("Error updating user");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success("User deleted successfully!");
        } catch (error: any) {
            console.error(error.message);
            toast.error("Error deleting user.");
        }
    };

    return (
        <UsersContext.Provider
            value={{
                users,
                isLoading,
                error,
                totalPages,
                page,
                setPage,
                handleDelete,
                handleEdit,
                editingUser,
                setEditingUser,
                updateUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }
    return context;
};
