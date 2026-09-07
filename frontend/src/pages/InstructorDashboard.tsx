import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Users, ClipboardCheck, Video, LogOut, Calendar, Clock, CheckCircle2, User, X, Plus, UploadCloud, Camera } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const InstructorDashboard = () => {
    const [activeTab, setActiveTab] = useState('classes');
    
    // Core Data
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    
    // UI States
    const { logout, user, updateUser } = useAuth();
    const navigate = useNavigate();
    
    // Attendance States
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [attendanceRecord, setAttendanceRecord] = useState<{ [key: string]: 'Present' | 'Absent' }>({});
    
    // Video States
    const [newVideo, setNewVideo] = useState({ title: '', description: '', url: '', category: 'Full Class', duration: 30 });

    const fetchData = useCallback(async () => {
        try {
            const { data: classesData } = await axios.get('/api/instructor/classes');
            setClasses(classesData);
            if (classesData.length > 0 && !selectedClassId) setSelectedClassId(classesData[0]._id);

            const { data: studentsData } = await axios.get('/api/instructor/students');
            setStudents(studentsData);
        } catch (error: any) {
            if (error.response?.status !== 401) {
                toast.error("Failed to load dashboard data");
            }
        }
    }, [selectedClassId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        logout();
        navigate('/');
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

    // Submissions
    const submitAttendance = async () => {
        if (!selectedClassId) return toast.error("Select a class");
        if (Object.keys(attendanceRecord).length === 0) return toast.error("No attendance marked");

        try {
            const studentsData = Object.entries(attendanceRecord).map(([studentId, status]) => ({
                student: studentId,
                status
            }));

            await axios.post('/api/instructor/attendance', {
                classId: selectedClassId,
                date: attendanceDate,
                studentsData
            });

            toast.success("Attendance successfully recorded!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to mark attendance");
        }
    };

    const submitVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/instructor/videos', newVideo);
            toast.success("Material uploaded to Student Hub!");
            setNewVideo({ title: '', description: '', url: '', category: 'Full Class', duration: 30 });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to upload");
        }
    };
    
    const updateProgress = async (studentId: string, metric: string, value: number) => {
        try {
            await axios.put(`/api/instructor/students/${studentId}/progress`, {
                [metric]: value
            });
            toast.success("Progress saved");
            fetchData();
        } catch {
            toast.error("Failed to update progress");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row pt-20">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col h-[calc(100vh-5rem)] md:sticky top-20 shadow-xl z-10">
                <div className="mb-6 text-white font-bold text-xl tracking-tight flex flex-col">
                    <span>Instructor</span>
                    <span className="text-indigo-400 text-sm font-normal">Dashboard</span>
                </div>
                
                {/* Profile Section */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="relative group w-24 h-24 mb-4">
                        <img 
                            src={user?.profileImage ? `http://localhost:5000${user.profileImage}` : `https://ui-avatars.com/api/?name=${user?.name || 'Instructor'}&background=random`} 
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
                            {user?.name?.split(' ')[0] || 'Instructor'}
                        </h3>
                        {/* Tooltip on hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            {user?.name || 'Instructor'}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'classes', icon: BookOpen, label: 'My Classes' },
                        { id: 'students', icon: Users, label: 'My Students' },
                        { id: 'attendance', icon: ClipboardCheck, label: 'Mark Attendance' },
                        { id: 'videos', icon: Video, label: 'Upload Materials' }
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-indigo-600 text-white shadow-lg' 
                                : 'hover:bg-slate-800'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium mt-auto">
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-auto">
                <div className="max-w-5xl mx-auto space-y-8">
                    
                    {activeTab === 'classes' && (
                        <div>
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">My Assigned Classes</h1>
                                    <p className="text-slate-500">Manage your batches, students, and attendance.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {classes.length === 0 && <p className="text-slate-500 font-medium">No classes actively assigned.</p>}
                                {classes.map((cls) => (
                                    <div key={cls._id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full mb-4">{cls.level}</span>
                                        <h3 className="text-2xl font-bold mb-1">{cls.title}</h3>
                                        <p className="text-slate-500 font-medium mb-6">{cls.style}</p>
                                        {cls.schedule?.length > 0 ? (
                                            <p className="text-slate-500 font-medium mb-6 flex items-center gap-2">
                                                <Calendar className="w-4 h-4"/> {cls.schedule[0].day} • <Clock className="w-4 h-4"/> {cls.schedule[0].startTime} - {cls.schedule[0].endTime}
                                            </p>
                                        ) : (
                                            <p className="text-slate-500 font-medium mb-6">Schedule pending</p>
                                        )}
                                        <div className="flex flex-wrap gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg font-bold">
                                            <span>{cls.capacity} Max Capacity</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'students' && (
                         <div>
                            <h1 className="text-3xl font-bold mb-8">Enrolled Students</h1>
                            <div className="grid gap-6">
                                {students.length === 0 && <p className="text-slate-500">No students enrolled yet.</p>}
                                {students.map((student) => (
                                    <div key={student._id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
                                        <div className="flex items-center gap-4 min-w-[250px]">
                                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl uppercase">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{student.name}</h3>
                                                <p className="text-sm text-slate-500">{student.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-5 gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                                            {/* Progress Inputs */}
                                            {['overall', 'technique', 'flexibility', 'rhythm', 'expression'].map(metric => (
                                                <div key={metric}>
                                                    <label className="text-xs font-bold text-slate-500 uppercase">{metric}</label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <input 
                                                            type="number" 
                                                            min="0" max="100" 
                                                            defaultValue={student.progress?.[metric] || 0}
                                                            onBlur={(e) => updateProgress(student._id, metric, parseInt(e.target.value))}
                                                            className="w-full p-2 border rounded-lg text-sm bg-white"
                                                        />
                                                        <span className="text-xs text-slate-400">%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-8">Mark Attendance</h1>
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">
                                <div className="flex gap-4 mb-8 pb-8 border-b">
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold text-slate-500 mb-2">Select Class</label>
                                        <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50 outline-none">
                                            {classes.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold text-slate-500 mb-2">Date</label>
                                        <input type="date" value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)} className="w-full p-3 border rounded-xl bg-slate-50 outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {students.filter(s => s.enrolledIn.some((c:any) => c._id === selectedClassId)).length === 0 && (
                                        <p className="text-slate-500">No students enrolled in this class.</p>
                                    )}
                                    {students.filter(s => s.enrolledIn.some((c:any) => c._id === selectedClassId)).map(student => (
                                        <div key={student._id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                            <span className="font-bold">{student.name}</span>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setAttendanceRecord({...attendanceRecord, [student._id]: 'Present'})}
                                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${attendanceRecord[student._id] === 'Present' ? 'bg-green-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-green-100'}`}
                                                >Present</button>
                                                <button 
                                                    onClick={() => setAttendanceRecord({...attendanceRecord, [student._id]: 'Absent'})}
                                                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${attendanceRecord[student._id] === 'Absent' ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-red-100'}`}
                                                >Absent</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={submitAttendance} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors">
                                    Submit Attendance Register
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'videos' && (
                        <div>
                            <h1 className="text-3xl font-bold mb-8">Upload Class Materials</h1>
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-2xl border shadow-sm">
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><UploadCloud className="w-8 h-8" /></div>
                                    <div>
                                        <h3 className="font-bold border-0 text-xl">Provide URLs for Students</h3>
                                        <p className="text-sm text-slate-500">Link YouTube or Vimeo recordings directly.</p>
                                    </div>
                                </div>
                                <form onSubmit={submitVideo} className="space-y-4">
                                    <input required type="text" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border rounded-xl outline-none" placeholder="Video Title (e.g. Week 1 Recap)" />
                                    <input required type="text" value={newVideo.url} onChange={e => setNewVideo({...newVideo, url: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border rounded-xl outline-none" placeholder="Video Link (YouTube/Vimeo)" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <select value={newVideo.category} onChange={e => setNewVideo({...newVideo, category: e.target.value})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border rounded-xl outline-none">
                                            {['Full Class', 'Choreography', 'Tutorial'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                        <input required type="number" placeholder="Duration (Minutes)" value={newVideo.duration} onChange={e => setNewVideo({...newVideo, duration: parseInt(e.target.value)})} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border rounded-xl outline-none" />
                                    </div>
                                    <button type="submit" className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                                        Publish to Student Dashboards
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default InstructorDashboard;
