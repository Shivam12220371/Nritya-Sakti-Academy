import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Video, Award, LogOut, CheckCircle2, Camera, Clock, PlayCircle, ExternalLink, IndianRupee, QrCode } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const getYouTubeThumbnail = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
      : null;
};

const StudentDashboard = () => {
   const [activeTab, setActiveTab] = useState('profile');
   const [studentData, setStudentData] = useState<any>(null);
   const [classes, setClasses] = useState<any[]>([]);
   const [videos, setVideos] = useState<any[]>([]);
   
   const [uploading, setUploading] = useState(false);
   const [transactionId, setTransactionId] = useState('');
   const [paymentAmount] = useState(2000);
   const [isPaying, setIsPaying] = useState(false);
   
   const fileInputRef = useRef<HTMLInputElement>(null);
   const { logout } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      fetchPlatformData();
   }, []);

   const fetchPlatformData = async () => {
      try {
         const { data: profile } = await axios.get('/api/auth/profile');
         setStudentData(profile);
         
         const { data: classData } = await axios.get('/api/users/classes');
         setClasses(classData);

         const { data: videoData } = await axios.get('/api/users/videos');
         setVideos(videoData);

      } catch (error: any) {
         if (error.response?.status !== 401) {
             toast.error("Failed to sync platform data");
         }
      }
   };

   const handleLogout = () => {
      logout();
      navigate('/');
   };

   // File Upload Logic
   const handleImageClick = () => {
      fileInputRef.current?.click();
   };

   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      setUploading(true);
      try {
         const { data } = await axios.post('/api/users/profile-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
         });
         toast.success(data.message);
         setStudentData({ ...studentData, profileImage: data.profileImage });
      } catch (error: any) {
         toast.error(error.response?.data?.message || 'Failed to upload photo');
      } finally {
         setUploading(false);
      }
   };

   const handleMarkVideoWatched = async (videoId: string) => {
       try {
           const { data } = await axios.post(`/api/users/watch-video/${videoId}`);
           toast.success("Watch progress saved!");
           
           // Update local state to reflect the change immediately
           const updatedWatchedVideos = [...(studentData.watchedVideoIds || []), videoId];
           setStudentData({ 
               ...studentData, 
               watchedVideoIds: updatedWatchedVideos,
               videosWatched: data.videosWatched 
           });
       } catch (error: any) {
           toast.error(error.response?.data?.message || "Failed to sync video logic.");
       }
   };

   const handleFeePayment = async (e: React.FormEvent) => {
       e.preventDefault();
       
       const utrRegex = /^\d{12}$/;
       if (!transactionId || !utrRegex.test(transactionId)) {
           return toast.error("Verification Denied: UTR must be exactly 12 numbers.");
       }
       
       setIsPaying(true);
       try {
           const { data } = await axios.post('/api/users/pay-fee', {
               amount: studentData.monthlyFee || paymentAmount,
               transactionId,
               method: 'UPI/QR'
           });
           toast.success(data.message, { duration: 5000 });
           setTransactionId('');
           // Instantly lock the UI state to 'Received' as requested
           setStudentData({ ...studentData, feeStatus: 'Received' });
       } catch (error: any) {
           toast.error(error.response?.data?.message || 'Payment Verification Failed');
       } finally {
           setIsPaying(false);
       }
   };

   if (!studentData) {
       return <div className="min-h-screen pt-40 flex items-center justify-center font-bold text-xl text-slate-500 animate-pulse">Syncing Encrypted Student Profile...</div>
   }

   const profileImageUrl = studentData.profileImage ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${studentData.profileImage}` : null;
   const watchedVideoSet = new Set(studentData.watchedVideoIds || []);

   // Setup structural data safely 
   const skills = [
       { name: "Technique", score: studentData.progress?.technique || 0, color: "bg-blue-500" },
       { name: "Flexibility", score: studentData.progress?.flexibility || 0, color: "bg-emerald-500" },
       { name: "Rhythm", score: studentData.progress?.rhythm || 0, color: "bg-orange-500" },
       { name: "Expression", score: studentData.progress?.expression || 0, color: "bg-purple-500" },
   ];
   const overallProgress = studentData.progress?.overall || 0;

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row pt-20 relative">
         
         {/* Sidebar Navigation */}
         <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col h-[calc(100vh-5rem)] md:sticky top-20 z-10">
            <div className="flex items-center gap-4 mb-10">
               <div 
                   onClick={handleImageClick}
                   className={`relative w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl ring-2 ring-indigo-500/20 cursor-pointer overflow-hidden group ${uploading ? 'opacity-50 blur-sm' : ''}`}
               >
                  {profileImageUrl ? (
                      <img src={profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                      studentData.name.charAt(0).toUpperCase()
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-5 h-5 text-white" />
                  </div>
               </div>
               
               {/* Hidden File uploader */}
               <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />

               <div>
                  <h2 className="font-bold text-lg leading-tight truncate w-32" title={studentData.name}>{studentData.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded inline-block mt-1">{studentData.currentLevel || 'Beginner'}</p>
               </div>
            </div>

            <nav className="flex-1 space-y-2">
               {[
                  { id: 'profile', icon: User, label: 'Performance Matrix' },
                  { id: 'timetable', icon: Calendar, label: 'Core Timetable' },
                  { id: 'videos', icon: Video, label: 'Video Hub' },
                  { id: 'certificates', icon: Award, label: 'Achievements' },
                  { id: 'payments', icon: IndianRupee, label: 'Fee Payments' },
               ].map((item) => (
                  <button 
                     key={item.id}
                     onClick={() => setActiveTab(item.id)}
                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                     <item.icon className="w-5 h-5" />
                     <span className="font-medium tracking-wide text-sm">{item.label}</span>
                     
                     {/* Badge Counters */}
                     {item.id === 'videos' && videos.length > 0 && <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">{videos.length}</span>}
                     {item.id === 'certificates' && studentData.certificates > 0 && <span className="ml-auto bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">{studentData.certificates}</span>}
                  </button>
               ))}
            </nav>

            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-100 rounded-xl transition-all font-medium mt-auto">
               <LogOut className="w-5 h-5" />
               Sign Out Securely
            </button>
         </aside>

         {/* Main Content Area */}
         <main className="flex-1 p-6 md:p-10 overflow-auto">
            {activeTab === 'profile' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <h1 className="text-3xl font-black mb-2 tracking-tight text-slate-800 dark:text-white">Dancer Intelligence Portfolio</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Metrics actively synced with Administrator assessments.</p>
                     </div>
                  </div>

                  {/* Top Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { label: 'Attendance', value: `${studentData.attendancePercent || 0}%`, icon: Calendar },
                        { label: 'Classes Completed', value: studentData.classesCompleted || 0, icon: CheckCircle2 },
                        { label: 'Videos Watched', value: studentData.videosWatched || 0, icon: Video },
                        { label: 'Certificates', value: studentData.certificates || 0, icon: Award },
                     ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
                           <div className="flex items-center gap-3 mb-3 text-slate-400">
                               <stat.icon className="w-5 h-5" />
                               <p className="text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                           </div>
                           <p className="text-4xl font-black text-slate-800 dark:text-slate-100">{stat.value}</p>
                        </div>
                     ))}
                  </div>

                  {/* Progress Section */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                     <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
                        Skill Progression Matrix
                        <span className="text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full text-sm border border-indigo-100 dark:border-indigo-800 shadow-sm flex items-center gap-2">
                            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span></span>
                            Overall Target: {overallProgress}%
                        </span>
                     </h3>

                     <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {skills.map((skill, index) => (
                           <div key={index}>
                              <div className="flex justify-between mb-2">
                                 <span className="font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                                 <span className="font-black text-slate-900 dark:text-slate-100">{skill.score}%</span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 shadow-inner overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.score}%` }}
                                    transition={{ duration: 1.2, delay: 0.1 + (index * 0.1), ease: "easeOut" }}
                                    className={`${skill.color} h-4 rounded-full relative`}
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            )}

            {activeTab === 'timetable' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-6">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">Class Schedule</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classes.length === 0 && <p className="text-slate-500 font-medium">No classes are currently scheduled.</p>}
                        {classes.map(cls => (
                            <div key={cls._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-lg text-sm border border-indigo-100">{cls.style}</span>
                                    <span className={`font-bold text-xs px-2 py-1 rounded ${cls.level === 'Beginner' ? 'bg-green-100 text-green-700' : cls.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{cls.level}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                                <div className="space-y-3 mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                                    <p className="flex items-center gap-2"><User className="w-4 h-4"/> Instructor: {cls.instructor?.name}</p>
                                    
                                    {cls.schedule?.length > 0 ? (
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800 space-y-2 mt-3 text-indigo-700 dark:text-indigo-400">
                                            <p className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {cls.schedule[0].day}</p>
                                            <p className="flex items-center gap-2 font-bold"><Clock className="w-4 h-4"/> {cls.schedule[0].startTime} - {cls.schedule[0].endTime}</p>
                                        </div>
                                    ) : (
                                        <p className="flex items-center gap-2 text-slate-400"><Clock className="w-4 h-4"/> Schedule Pending</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'videos' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Video Hub</h2>
                    <p className="text-slate-500 mb-8 font-medium">Watch tutorials, class recordings, and masterclasses directly.</p>
                    
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {videos.length === 0 && <p className="text-slate-500 font-medium">No media uploaded yet.</p>}
                        {videos.map(v => {
                            const isWatched = watchedVideoSet.has(v._id);
                            return (
                                <div key={v._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
                                    <div className="h-48 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                                        {getYouTubeThumbnail(v.url) ? (
                                            <img 
                                                src={getYouTubeThumbnail(v.url)!} 
                                                alt={v.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                                            />
                                        ) : (
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                                <Video className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        {/* Play Overlay */}
                                        <a href={v.url} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer z-10">
                                            <PlayCircle className="w-16 h-16 text-white" />
                                        </a>
                                        {isWatched && <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Watched</div>}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{v.category}</span>
                                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {v.duration}m</span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 leading-tight">{v.title}</h3>
                                        
                                        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                            {isWatched ? (
                                                <button disabled className="w-full py-3 bg-slate-100 text-slate-500 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                                                    <CheckCircle2 className="w-5 h-5" /> Completed
                                                </button>
                                            ) : (
                                                <button onClick={() => handleMarkVideoWatched(v._id)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                                                    Mark as Watched
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            )}

            {activeTab === 'certificates' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Official Achievements</h2>
                    <p className="text-slate-500 mb-8 font-medium">Download digital copies of your certified accomplishments.</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(!studentData.certificateFiles || studentData.certificateFiles.length === 0) && (
                            <div className="col-span-full py-20 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center">
                                <Award className="w-16 h-16 text-slate-300 mb-4" />
                                <h3 className="text-xl font-bold text-slate-400">No Certificates Yet</h3>
                                <p className="text-slate-500 mt-2">Complete courses and masterclasses to earn official certificates.</p>
                            </div>
                        )}
                        {studentData.certificateFiles?.map((cert: any, i: number) => (
                            <div key={i} className="bg-gradient-to-br from-indigo-900 to-slate-900 p-1 rounded-2xl shadow-xl">
                                <div className="bg-white dark:bg-slate-950 rounded-xl p-8 h-full flex flex-col items-center text-center relative overflow-hidden">
                                     {/* Background Graphic */}
                                     <Award className="absolute -right-6 -bottom-6 w-32 h-32 text-slate-100 dark:text-slate-900 z-0" />
                                     
                                     <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 z-10 shadow-inner ring-4 ring-amber-50">
                                         <Award className="w-8 h-8" />
                                     </div>
                                     <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 z-10">{cert.title}</h3>
                                     <p className="text-sm font-medium text-slate-500 mb-8 z-10">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                                     
                                     <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${cert.fileUrl}`} target="_blank" rel="noreferrer" className="mt-auto w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2 z-10 transition-colors border border-indigo-200">
                                        <ExternalLink className="w-5 h-5" /> View Certificate
                                     </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'payments' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                            <IndianRupee className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white">Secure Fee Manager</h2>
                    </div>
                    <p className="text-slate-500 mb-8 font-medium">Scan the Academy QR code instantly or use our verified UPI ID to pay. Instantly receive an automated digital receipt on your registered email.</p>
                    
                    {studentData.feeStatus === 'Received' ? (
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-lg">
                            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-emerald-100 dark:ring-emerald-900/30">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-3xl font-black mb-2 text-emerald-800 dark:text-emerald-400">Payment Complete!</h3>
                            <p className="text-lg text-emerald-600 dark:text-emerald-500/80 font-medium max-w-md">Your monthly tuition of ₹{studentData.monthlyFee || paymentAmount} has been verified and fully cleared by the academy administrator.</p>
                        </div>
                    ) : studentData.feeStatus === 'Submitted' ? (
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-lg">
                            <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mb-6 shadow-inner ring-8 ring-amber-100 dark:ring-amber-900/30 animate-pulse">
                                <Clock className="w-12 h-12 text-amber-900" />
                            </div>
                            <h3 className="text-3xl font-black mb-2 text-amber-800 dark:text-amber-400">Verification Pending</h3>
                            <p className="text-lg text-amber-700 dark:text-amber-500/80 font-medium max-w-lg">Your transaction ID was submitted successfully. Please wait while the administrative staff securely verifies the receipt of ₹{studentData.monthlyFee || paymentAmount}.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* QR Code Section */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                                <h3 className="text-xl font-extrabold mb-2">Scan & Pay securely</h3>
                                <p className="text-slate-500 text-sm mb-6">Verified Academy Account</p>
                                
                                <div className="w-56 h-56 bg-slate-100 rounded-2xl p-4 shadow-inner mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
                                    <img src="/qr-code.jpg" alt="Secure Payment QR Code" className="w-full h-full rounded-xl pointer-events-none object-contain" />
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-full flex items-center gap-3 border border-slate-200 dark:border-slate-700">
                                    <QrCode className="w-5 h-5 text-slate-400" />
                                    <span className="font-bold text-slate-700 dark:text-slate-300">Shivam Bharadwaj</span>
                                </div>
                            </div>
                            
                            {/* Transaction Detail Form */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-lg h-full flex flex-col">
                                <h3 className="text-2xl font-bold mb-6">Payment Verification</h3>
                                
                                <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 mb-8">
                                    <div>
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-1">Total Due</p>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Tuition</p>
                                    </div>
                                    <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">₹{studentData.monthlyFee || paymentAmount}</span>
                                </div>

                                <form onSubmit={handleFeePayment} className="mt-auto space-y-4">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Transaction ID / UTR Number</label>
                                    <input 
                                        type="text" 
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="e.g. 129384892834"
                                        className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-bold text-lg"
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mb-4">* A secure confirmation receipt will be instantly emailed to {studentData.email}.</p>
                                    
                                    <button type="submit" disabled={isPaying} className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50">
                                        {isPaying ? 'Authenticating...' : 'Submit Verification'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
         </main>
      </div>
   );
};

export default StudentDashboard;
