import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const LiveMeetingRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const jitsiContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const verifyAccess = async () => {
            if (!user) {
                navigate('/');
                return;
            }
            try {
                const { data } = await axios.get(`/api/live-meetings/verify/${roomId}`);
                if (data.valid) {
                    setIsAuthorized(true);
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Access denied');
                navigate(user.role?.toLowerCase() === 'admin' ? '/admin/dashboard' : user.role?.toLowerCase() === 'instructor' ? '/instructor/dashboard' : '/student/dashboard');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAccess();
    }, [roomId, user, navigate]);

    useEffect(() => {
        if (!isAuthorized || !jitsiContainerRef.current) return;

        // Dynamically load Jitsi External API Script to bypass NPM lock issues
        const domain = 'meet.jit.si';
        let api: any = null;

        const initJitsi = () => {
            if (!(window as any).JitsiMeetExternalAPI) return;
            
            const options = {
                roomName: roomId,
                parentNode: jitsiContainerRef.current,
                configOverwrite: {
                    startWithAudioMuted: true,
                    startWithVideoMuted: true,
                    prejoinPageEnabled: false,
                    disableModeratorIndicator: true,
                },
                interfaceConfigOverwrite: {
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    SHOW_BRAND_WATERMARK: false,
                    SHOW_JITSI_WATERMARK: false,
                    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
                    DEFAULT_BACKGROUND: '#000000',
                },
                userInfo: {
                    displayName: user?.name,
                }
            };
            
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            api = new (window as any).JitsiMeetExternalAPI(domain, options);
            
            api.addListener('videoConferenceLeft', () => {
                 navigate(user?.role?.toLowerCase() === 'admin' ? '/admin/dashboard' : user?.role?.toLowerCase() === 'instructor' ? '/instructor/dashboard' : '/student/dashboard');
            });
        };

        if ((window as any).JitsiMeetExternalAPI) {
            initJitsi();
        } else {
            const script = document.createElement('script');
            script.src = `https://${domain}/external_api.js`;
            script.async = true;
            script.onload = initJitsi;
            document.body.appendChild(script);
        }

        return () => {
            if (api) {
                api.dispose();
            }
        };
    }, [isAuthorized, roomId, user, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                <h2 className="text-xl font-bold">Securing Live Instance...</h2>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; 
    }

    return (
        <div className="w-full h-screen bg-black fixed top-0 left-0 z-[100] flex flex-col">
            <div ref={jitsiContainerRef} className="flex-1 w-full h-full relative" />
        </div>
    );
};

export default LiveMeetingRoom;
