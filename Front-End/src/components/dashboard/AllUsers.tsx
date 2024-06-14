import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/admin/getAllUsers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Convert '1'/'0' to true/false for Switch component
            const updatedUsers = response.data.map((user: any) => {
                return { ...user, is_active: user.is_active === '1' };
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleToggleActive = async (userId: number) => {
        try {
            const token = localStorage.getItem('token');
            // Fix the endpoint here to updateUserIsActive instead of updateUseris_active
            await axios.put(`http://localhost:8000/api/admin/updateUserIsActive/${userId}`, {
                is_active: users.find(user => user.u_id === userId)?.is_active ? '0' : '1'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Assuming successful toggle, update the local state
            setUsers(users.map(user => {
                if (user.u_id === userId) {
                    return { ...user, is_active: !user.is_active };
                }
                return user;
            }));
        } catch (error) {
            console.error('Error toggling user active status:', error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.log('Response data:', axiosError.response?.data);
            }
        }
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type</th>
                        <th scope="col">is_active</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.u_name}</td>
                            <td>{user.u_email}</td>
                            <td>{user.r_type}</td>
                            <td>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={user.is_active}
                                            onChange={() => handleToggleActive(user.u_id)}
                                            name="is_active"
                                            color="primary"
                                        />
                                    }
                                    label={user.is_active ? "Active" : "Inactive"}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;
