import React, {useState, useEffect, useRef} from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AddUserMission({users, missions}) {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userSearchTerm, setUserSearchTerm] = useState("");
    const userListRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(15);
    
    const { data, setData, post, errors, processing } = useForm({
        user_id: '',
        mission_id: '',
        progress: 0,
        reward_claimed: 0,
    });

    function submit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", data.user_id);
        formData.append("mission_id", data.mission_id);
        formData.append("progress", data.progress);
        formData.append("reward_claimed", data.reward_claimed);

        post('/admin/usermissions/add', {
            data: formData,
            forceFormData: true
        });
    }

    const handleUserSearchChange = (e) => {
        const value = e.target.value;
        setUserSearchTerm(value);
        const filtered = users.filter((u) =>
          `${u.userID} ${u.memberID}`.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
      };
      
      const handleUserSelect = (user) => {
        setData("user_id", user.userID);
        setUserSearchTerm(`${user.userID} - ${user.memberID}`);
        setFilteredUsers([]);
      };

    return (
        <AdminLayout
            title="Add User Mission"
            breadcrumbs={[
                { label: "Admin", url: "/admin" },
                { label: "User Missions", url: "/admin/user-missions" },
                { label: "Add User Mission" }
            ]}
        >
            <Head title="Add User Mission" />
            <div className="p-4 bg-white shadow-md rounded-lg">
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    {/* User ID */}
                    <label>Select User</label>
                        <input
                        type="text"
                        value={userSearchTerm}
                        onChange={handleUserSearchChange}
                        className="border px-2 py-1 rounded"
                        placeholder="Type User ID or Member ID..."
                        />
                        {filteredUsers.length > 0 && (
                        <ul
                            ref={userListRef}
                            className="border rounded bg-white max-h-48 overflow-y-auto shadow"
                        >
                            {filteredUsers.slice(0, 15).map((user) => (
                            <li
                                key={user.userID}
                                onClick={() => handleUserSelect(user)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {user.userID} - {user.memberID}
                            </li>
                            ))}
                        </ul>
                        )}

                    {/* Mission ID */}
                    <label>Select Mission</label>
                        <select
                        value={data.mission_id}
                        onChange={(e) => setData("mission_id", e.target.value)}
                        className="border px-2 py-1 rounded"
                        >
                        <option value="">-- Select a Mission --</option>
                        {missions.map((mission) => (
                            <option key={mission.id} value={mission.id}>
                            {mission.mission_name}
                            </option>
                        ))}
                        </select>

                    {/* Progress */}
                    <label>Progress</label>
                    {errors.progress && <div className="error">{errors.progress}</div>}
                    <input
                        type="number"
                        min="0"
                        value={data.progress}
                        onChange={(e) => setData("progress", e.target.value)}
                    />

                    {/* Reward Claimed */}
                    <label className="font-bold block">Reward Claimed</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="reward_claimed"
                                value={1}
                                checked={data.reward_claimed === 1}
                                onChange={() => setData("reward_claimed", 1)}
                            />
                            Yes
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="reward_claimed"
                                value={0}
                                checked={data.reward_claimed === 0}
                                onChange={() => setData("reward_claimed", 0)}
                            />
                            No
                        </label>
                    </div>
                    {errors.reward_claimed && <div className="error">{errors.reward_claimed}</div>}

                    {/* Example Table */}
                    <p>Preview:</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Mission ID</th>
                                <th>Progress</th>
                                <th>Reward Claimed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.user_id}</td>
                                <td>{data.mission_id}</td>
                                <td>{data.progress}</td>
                                <td>{data.reward_claimed}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Submit Button */}
                    <button className="primary-btn mt-4" disabled={processing}>
                        Submit
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
