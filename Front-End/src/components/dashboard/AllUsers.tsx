import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './custom.css';

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
            const updatedUsers = response.data.map((user: any) => ({
                ...user,
                is_active: user.is_active === '1'
            }));
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (userId: number, currentStatus: boolean) => {
        try {
            const token = localStorage.getItem('token');
            const newIsActiveStatus = currentStatus ? '0' : '1';

            await axios.put(`http://localhost:8000/api/admin/updateUserIsActive/${userId}`, {
                is_active: newIsActiveStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(users.map(user => {
                if (user.u_id === userId) {
                    return { ...user, is_active: !currentStatus };
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <h2 className="mt-4">User Management</h2>
            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.u_id}>
                            <td>{index + 1}</td>
                            <td>{user.u_name}</td>
                            <td>{user.u_email}</td>
                            <td>{user.r_type}</td>
                            <td>
                                <span className={`status-label ${user.is_active ? 'status-active' : 'status-inactive'}`}>
                                    {user.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={user.is_active}
                                            onChange={() => handleToggleActive(user.u_id, user.is_active)}
                                            name="is_active"
                                            color="primary"
                                        />
                                    }
                                    label=""
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
