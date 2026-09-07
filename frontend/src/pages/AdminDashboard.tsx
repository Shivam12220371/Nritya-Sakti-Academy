import React, { useState, useEffect, useCallback } from 'react';
import { Users, GraduationCap, CalendarDays, IndianRupee, LayoutDashboard, Trash2, Plus, X, Edit, Video as VideoIcon, Award, FileUp, Camera } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const getYouTubeThumbnail = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : null;
};

const AdminDashboard = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    
    // Core Data States
    const [users, setUsers] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [videos, setVideos] = useState<any[]>([]);
    const [stats, setStats] = useState({
        totalStudents: 0,
        activeInstructors: 0,
        totalClasses: 0,
        revenue: '₹0'
    });
    
    // UI States
    const [, setLoading] = useState(false);
    const [showClassModal, setShowClassModal] = useState(false);
    const [showEditStudentModal, setShowEditStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    
    // Form States
    const [newClass, setNewClass] = useState({
        title: '', instructor: '', style: 'Bollywood', level: 'Beginner', capacity: 20,
        scheduleDay: 'Monday', scheduleStart: '18:00', scheduleEnd: '19:00'
    });
    const [newVideo, setNewVideo] = useState({
        title: '', description: '', url: '', category: 'Full Class', duration: 30
    });
    
    // Certificate States
    const [certTitle, setCertTitle] = useState('');
    const [certFile, setCertFile] = useState<File | null>(null);

    // Timetable States
    const [studentEnrollments, setStudentEnrollments] = useState<any[]>([]);
    const [selectedEnrollClass, setSelectedEnrollClass] = useState('');

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'overview') {
                const { data } = await axios.get('/api/admin/stats');
                setStats(data);
            }
            if (['overview', 'students', 'instructors', 'classes'].includes(activeTab)) {
                const { data: usersData } = await axios.get('/api/admin/users');
                setUsers(usersData);
                const { data: classData } = await axios.get('/api/admin/classes');
                setClasses(classData);
            }
            if (activeTab === 'videos') {
                const { data: vids } = await axios.get('/api/admin/videos');
                setVideos(vids);
            }
        } catch (error: any) {
            if (error.response?.status !== 401) {
                toast.error(error.response?.data?.message || 'Failed to sync data');
            }
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    // Data Loaders
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Users Logic
    const handleDeleteUser = async (id: string) => {
        if (window.confirm("PERMANENTLY delete this user?")) {
            try {
                await axios.delete(`/api/admin/users/${id}`);
                toast.success("User deleted");
                setUsers(users.filter(u => u._id !== id));
            } catch { toast.error('Deletion failed'); }
        }
    };

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            await axios.put(`/api/admin/users/${userId}/role`, { role: newRole });
            toast.success(`User updated to ${newRole}!`);
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update role');
        }
    };

    const handleUpdateStudentData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                currentLevel: selectedStudent.currentLevel,
                subscriptionPlan: selectedStudent.subscriptionPlan,
                classesCompleted: selectedStudent.classesCompleted,
                videosWatched: selectedStudent.videosWatched,
                certificates: selectedStudent.certificates,
                attendancePercent: selectedStudent.attendancePercent,
                overall: selectedStudent.progress?.overall || 0,
                technique: selectedStudent.progress?.technique || 0,
                flexibility: selectedStudent.progress?.flexibility || 0,
                rhythm: selectedStudent.progress?.rhythm || 0,
                expression: selectedStudent.progress?.expression || 0,
            };
            const { data } = await axios.put(`/api/admin/users/${selectedStudent._id}/student-data`, payload);
            toast.success("Student metrics synced!");
            setUsers(users.map(u => u._id === selectedStudent._id ? data : u));
        } catch { toast.error('Update failed'); }
    };

    const handleIssueCertificate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certFile) return toast.error("Please attach a certificate file.");
        try {
            const formData = new FormData();
            formData.append('document', certFile);
            formData.append('title', certTitle);

            const { data } = await axios.post(`/api/admin/users/${selectedStudent._id}/certificate`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(`Certificate issued to ${data.name}!`);
            setCertFile(null);
            setCertTitle('');
            setSelectedStudent(data);
            setUsers(users.map(u => u._id === selectedStudent._id ? data : u));
        } catch {
            toast.error("Failed to issue certificate.");
        }
    };

    const handleUpdateStudentFee = async (monthlyFee: number, feeStatus: string) => {
        try {
            const { data } = await axios.put(`/api/admin/users/${selectedStudent._id}/fee`, { monthlyFee, feeStatus });
            toast.success("Tuition status synced successfully!");
            setSelectedStudent(data);
            setUsers(users.map(u => u._id === selectedStudent._id ? data : u));
        } catch {
            toast.error("Failed to sync structural fee logic.");
        }
    };

    const handleEnrollStudent = async () => {
        if (!selectedEnrollClass) return toast.error("Select a class first");
        try {
            await axios.post(`/api/admin/users/${selectedStudent._id}/enroll`, { classId: selectedEnrollClass });
            toast.success("Enrolled in class!");
            const { data: updated } = await axios.get(`/api/admin/users/${selectedStudent._id}/enrollments`);
            setStudentEnrollments(updated);
            setSelectedEnrollClass('');
        } catch (e: any) { toast.error(e.response?.data?.message || "Failed to enroll") }
    };

    const handleUnenrollStudent = async (classId: string) => {
        try {
            await axios.delete(`/api/admin/users/${selectedStudent._id}/enroll/${classId}`);
            toast.success("Removed from class!");
            setStudentEnrollments(studentEnrollments.filter(e => e.class?._id !== classId));
        } catch { toast.error("Failed to remove") }
    };

    // Class Logic
    const handleCreateClass = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                title: newClass.title, instructor: newClass.instructor, style: newClass.style, level: newClass.level, capacity: newClass.capacity,
                schedule: [{ day: newClass.scheduleDay, startTime: newClass.scheduleStart, endTime: newClass.scheduleEnd }]
            };
            await axios.post('/api/admin/classes', payload);
            toast.success("Dance Class created!");
            setShowClassModal(false);
            fetchDashboardData();
        } catch { toast.error('Failed to create class'); }
    };

    const handleDeleteClass = async (id: string) => {
        if (window.confirm("PERMANENTLY delete this class and all student enrollments?")) {
            try {
                await axios.delete(`/api/admin/classes/${id}`);
                toast.success("Class deleted successfully");
                setClasses(classes.filter(c => c._id !== id));
                fetchDashboardData(); // Reload stats
            } catch { toast.error('Deletion failed'); }
        }
    };
    
    // Video Logic
    const handleCreateVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/videos', newVideo);
            toast.success("Video Published!");
            setShowVideoModal(false);
            fetchDashboardData();
        } catch { toast.error('Failed to publish'); }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await axios.post('/api/users/profile-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            updateUser({ profileImage: data.profileImage });
            toast.success("Profile image updated");
        } catch (error) {
            toast.error("Failed to upload image");
        }
    };

    const statCards = [
        { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-100 text-blue-600' },
        { title: 'Active Instructors', value: stats.activeInstructors, icon: GraduationCap, color: 'bg-purple-100 text-purple-600' },
        { title: 'Classes Hosted', value: stats.totalClasses, icon: CalendarDays, color: 'bg-orange-100 text-orange-600' },
        { title: 'Revenue (Month)', value: stats.revenue, icon: IndianRupee, color: 'bg-green-100 text-green-600' },
    ];

    const renderUsersTable = (filterRole: string = '') => {
        const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;
        return (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                    <h3 className="text-xl font-bold">{filterRole === 'instructor' ? 'Registered Instructors' : 'Platform Users'}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Identity</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm text-slate-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.role === 'student' && (
                                                <>
                                                    <button onClick={() => handleUpdateRole(user._id, 'instructor')} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold hover:bg-purple-200 transition-colors">
                                                        Make Instructor
                                                    </button>
                                                    <button 
                                                        onClick={async () => { 
                                                            setSelectedStudent(user); 
                                                            setShowEditStudentModal(true); 
                                                            try {
                                                                const { data } = await axios.get(`/api/admin/users/${user._id}/enrollments`);
                                                                setStudentEnrollments(data);
                                                            } catch { toast.error("Failed to fetch enrollments") }
                                                        }}
                                                        className="p-2 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            {user.role === 'instructor' && (
                                                <button onClick={() => handleUpdateRole(user._id, 'student')} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">
                                                    Make Student
                                                </button>
                                            )}
                                            <button onClick={() => handleDeleteUser(user._id)} className="p-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row pt-20">
            
            {showClassModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Create New Class</h2>
                            <button onClick={() => setShowClassModal(false)} className="text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleCreateClass} className="space-y-4">
                            <input required type="text" value={newClass.title} onChange={e => setNewClass({...newClass, title: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" placeholder="Class Title" />
                            <select required value={newClass.instructor} onChange={e => setNewClass({...newClass, instructor: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
                                <option value="">Select Instructor...</option>
                                {users.filter(u => u.role === 'instructor').map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
                            </select>
                            <div className="grid grid-cols-2 gap-4">
                                <select value={newClass.style} onChange={e => setNewClass({...newClass, style: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
                                    <option>Bollywood</option>
                                    <option>Hip Hop</option>
                                    <option>Classical</option>
                                    <option>Contemporary</option>
                                </select>
                                <select value={newClass.level} onChange={e => setNewClass({...newClass, level: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <select value={newClass.scheduleDay} onChange={e => setNewClass({...newClass, scheduleDay: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
                                    {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d=><option key={d} value={d}>{d}</option>)}
                                </select>
                                <input required type="time" value={newClass.scheduleStart} onChange={e => setNewClass({...newClass, scheduleStart: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" />
                                <input required type="time" value={newClass.scheduleEnd} onChange={e => setNewClass({...newClass, scheduleEnd: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" />
                            </div>
                            <input required type="number" placeholder="Capacity" value={newClass.capacity} onChange={e => setNewClass({...newClass, capacity: parseInt(e.target.value)})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" />
                            <button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg">Create Class</button>
                        </form>
                    </div>
                </div>
            )}

            {showVideoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Publish New Video</h2>
                            <button onClick={() => setShowVideoModal(false)} className="text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleCreateVideo} className="space-y-4">
                            <input required type="text" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" placeholder="Video Title" />
                            <input required type="text" value={newVideo.url} onChange={e => setNewVideo({...newVideo, url: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" placeholder="YouTube/Vimeo URL" />
                            <div className="grid grid-cols-2 gap-4">
                                <select value={newVideo.category} onChange={e => setNewVideo({...newVideo, category: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none">
                                    {['Full Class', 'Choreography', 'Tutorial'].map(c => <option key={c}>{c}</option>)}
                                </select>
                                <input required type="number" placeholder="Minutes" value={newVideo.duration} onChange={e => setNewVideo({...newVideo, duration: parseInt(e.target.value)})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none" />
                            </div>
                            <button type="submit" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg">Publish Video directly to platform</button>
                        </form>
                    </div>
                </div>
            )}

            {showEditStudentModal && selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Modify Student</h2>
                            <button onClick={() => setShowEditStudentModal(false)} className="text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
                        </div>
                        <p className="text-sm font-medium text-indigo-600 mb-6">{selectedStudent.name} • {selectedStudent.email}</p>
                        
                        <div className="mb-6 p-4 border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                            <h3 className="font-bold text-indigo-800 dark:text-indigo-400 mb-3 flex items-center gap-2"><CalendarDays className="w-5 h-5"/> Manage Timetable Core</h3>
                            <div className="flex gap-3 mb-4">
                                <select value={selectedEnrollClass} onChange={e=>setSelectedEnrollClass(e.target.value)} className="flex-1 p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 outline-none">
                                    <option value="">-- Assign a Class --</option>
                                    {classes.map(c => <option key={c._id} value={c._id}>{c.title} ({c.level})</option>)}
                                </select>
                                <button type="button" onClick={handleEnrollStudent} className="bg-indigo-600 text-white px-4 rounded-lg font-bold text-sm">Enroll</button>
                            </div>
                            <div className="space-y-2">
                                {studentEnrollments.length === 0 && <p className="text-sm text-slate-500 italic">No assigned classes.</p>}
                                {studentEnrollments.map((e) => (
                                    <div key={e._id} className="flex justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div>
                                            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{e.class?.title}</div>
                                            {e.class?.schedule?.length > 0 && (
                                                <div className="text-xs text-slate-500">{e.class.schedule[0].day}, {e.class.schedule[0].startTime} - {e.class.schedule[0].endTime}</div>
                                            )}
                                        </div>
                                        <button type="button" onClick={()=>handleUnenrollStudent(e.class?._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"><X className="w-4 h-4"/></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mb-6 p-4 border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                            <h3 className="font-bold text-indigo-800 dark:text-indigo-400 mb-3 flex items-center gap-2"><Award className="w-5 h-5"/> Issue New Certificate</h3>
                            <form onSubmit={handleIssueCertificate} className="flex gap-3">
                                <input type="text" placeholder="Certificate Name" value={certTitle} onChange={e=>setCertTitle(e.target.value)} className="flex-1 p-2 rounded-lg border outline-none text-sm" required/>
                                <input type="file" onChange={e=>setCertFile(e.target.files?.[0] || null)} className="hidden" id="cert-upload" accept=".pdf,.png,.jpg" />
                                <label htmlFor="cert-upload" className="cursor-pointer bg-white dark:bg-slate-800 border p-2 rounded-lg text-slate-500 hover:text-indigo-600"><FileUp className="w-5 h-5"/></label>
                                <button type="submit" className="bg-indigo-600 text-white px-4 rounded-lg font-bold text-sm">Issue</button>
                            </form>
                            <p className="text-xs text-slate-500 mt-2 italic shadow-sm">Warning: This automatically syncs to the student's dashboard layout.</p>
                        </div>
                        
                        <div className="mb-6 p-4 border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                            <h3 className="font-bold text-indigo-800 dark:text-indigo-400 mb-3 flex items-center gap-2"><IndianRupee className="w-5 h-5"/> Manage Tuition Fee Tracking</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input type="number" placeholder="Monthly Fee Rate" value={selectedStudent.monthlyFee || 2000} onChange={e=>setSelectedStudent({...selectedStudent, monthlyFee: parseInt(e.target.value)})} className="w-full pl-9 p-2 rounded-lg border border-slate-300 dark:border-slate-700 outline-none text-sm bg-white dark:bg-slate-800 font-bold" />
                                    </div>
                                    <button type="button" onClick={() => handleUpdateStudentFee(selectedStudent.monthlyFee || 2000, selectedStudent.feeStatus || 'Pending')} className="bg-slate-800 hover:bg-slate-900 text-white px-4 rounded-lg font-bold text-sm shadow-md transition-colors">Assign Rate</button>
                                </div>
                                
                                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <span className={`font-black uppercase tracking-wider text-sm ${selectedStudent.feeStatus === 'Received' ? 'text-green-600' : selectedStudent.feeStatus === 'Submitted' ? 'text-amber-500' : 'text-slate-500'}`}>Status: {selectedStudent.feeStatus || 'Pending'}</span>
                                    
                                    <select value={selectedStudent.feeStatus || 'Pending'} onChange={(e) => handleUpdateStudentFee(selectedStudent.monthlyFee || 2000, e.target.value)} className="p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 outline-none font-bold">
                                        <option value="Pending">1. Pending</option>
                                        <option value="Submitted">2. Submitted (Needs Admin Verify)</option>
                                        <option value="Received">3. Received (System Verified)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleUpdateStudentData} className="space-y-4">
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-b pb-2">Student Counters</h3>
                            <div className="grid grid-cols-4 gap-2">
                                <div><label className="text-xs font-bold text-slate-500">Classes</label><input type="number" min="0" value={selectedStudent.classesCompleted} onChange={e=>setSelectedStudent({...selectedStudent, classesCompleted: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Videos</label><input type="number" min="0" value={selectedStudent.videosWatched} onChange={e=>setSelectedStudent({...selectedStudent, videosWatched: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Certificates</label><input type="number" min="0" value={selectedStudent.certificates} onChange={e=>setSelectedStudent({...selectedStudent, certificates: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Attendance %</label><input type="number" min="0" max="100" value={selectedStudent.attendancePercent} onChange={e=>setSelectedStudent({...selectedStudent, attendancePercent: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
                            </div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm border-b pb-2 mt-4">Progress Matrix %</h3>
                            <div className="grid grid-cols-5 gap-2">
                                <div><label className="text-xs font-bold text-slate-500">Overall</label><input type="number" value={selectedStudent.progress?.overall} onChange={e=>setSelectedStudent({...selectedStudent, progress: {...selectedStudent.progress, overall: parseInt(e.target.value)}})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Technique</label><input type="number" value={selectedStudent.progress?.technique} onChange={e=>setSelectedStudent({...selectedStudent, progress: {...selectedStudent.progress, technique: parseInt(e.target.value)}})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Flexibility</label><input type="number" value={selectedStudent.progress?.flexibility} onChange={e=>setSelectedStudent({...selectedStudent, progress: {...selectedStudent.progress, flexibility: parseInt(e.target.value)}})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Rhythm</label><input type="number" value={selectedStudent.progress?.rhythm} onChange={e=>setSelectedStudent({...selectedStudent, progress: {...selectedStudent.progress, rhythm: parseInt(e.target.value)}})} className="w-full p-2 border rounded-lg" /></div>
                                <div><label className="text-xs font-bold text-slate-500">Expression</label><input type="number" value={selectedStudent.progress?.expression} onChange={e=>setSelectedStudent({...selectedStudent, progress: {...selectedStudent.progress, expression: parseInt(e.target.value)}})} className="w-full p-2 border rounded-lg" /></div>
                            </div>
                            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl mt-4">Force Push Dashboard Numbers</button>
                        </form>
                    </div>
                </div>
            )}

            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col h-[calc(100vh-5rem)] md:sticky top-20 shadow-xl z-10">
                <div className="mb-6 text-white font-bold text-xl tracking-tight">Admin<span className="text-indigo-400">Hub</span></div>
                
                {/* Profile Section */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="relative group w-24 h-24 mb-4">
                        <img 
                            src={user?.profileImage ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${user.profileImage}` : `https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=random`} 
                            alt="Profile" 
                            className="w-full h-full object-cover rounded-full border-4 border-slate-800"
                        />
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <Camera className="text-white w-6 h-6" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>
                    <div className="text-center w-full relative group">
                        <h3 className="font-bold text-lg text-white truncate max-w-full px-2 cursor-pointer w-full text-center">
                            {user?.name?.split(' ')[0] || 'Admin'}
                        </h3>
                        {/* Tooltip on hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            {user?.name || 'Admin'}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                        { id: 'students', icon: Users, label: 'Student Users' },
                        { id: 'instructors', icon: GraduationCap, label: 'Instructors' },
                        { id: 'classes', icon: CalendarDays, label: 'Class Scheduler' },
                        { id: 'videos', icon: VideoIcon, label: 'Academy Media' },
                    ].map((item) => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-6 md:p-10 overflow-auto">
                <div className="max-w-6xl mx-auto space-y-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statCards.map((stat, i) => (
                                <div key={i} className="bg-white rounded-2xl p-6 border group hover:shadow-lg">
                                    <div className="flex justify-between">
                                        <div><p className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">{stat.title}</p><p className="text-4xl font-black">{stat.value}</p></div>
                                        <div className={`p-3 rounded-xl ${stat.color}`}><stat.icon className="w-6 h-6" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'students' && renderUsersTable('student')}
                    {activeTab === 'instructors' && renderUsersTable('instructor')}
                    
                    {activeTab === 'classes' && (
                        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                                <h3 className="text-xl font-bold">Dance Classes</h3>
                                <button onClick={() => setShowClassModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow">
                                    <Plus className="w-5 h-5" /> Add Class
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {classes.length === 0 && <p className="text-slate-500">No classes scheduled yet.</p>}
                                {classes.map(c => (
                                    <div key={c._id} className="border border-slate-200 rounded-xl p-4 shadow-sm relative group">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-lg">{c.title}</h4>
                                            <button onClick={() => handleDeleteClass(c._id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-3">Instructor: {c.instructor?.name}</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">{c.style}</span>
                                            <span className="text-slate-600">{c.level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'videos' && (
                        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                                <h3 className="text-xl font-bold">Recorded Videos Database</h3>
                                <button onClick={() => setShowVideoModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow">
                                    <Plus className="w-5 h-5" /> Upload Linked Video
                                </button>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {videos.length === 0 && <p className="text-slate-500">No videos published yet.</p>}
                                {videos.map(v => (
                                    <div key={v._id} className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md group">
                                        <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center mb-3 overflow-hidden relative">
                                            {getYouTubeThumbnail(v.url) ? (
                                                <img 
                                                    src={getYouTubeThumbnail(v.url)!} 
                                                    alt={v.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center">
                                                    <VideoIcon className="w-10 h-10 text-white/20" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight mb-1">{v.title}</h4>
                                        <div className="flex justify-between items-center text-sm text-slate-500">
                                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">{v.category}</span>
                                            <span>{v.duration} min</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
