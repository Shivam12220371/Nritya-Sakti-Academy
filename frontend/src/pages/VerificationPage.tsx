import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Award, Calendar, User, Download } from 'lucide-react';

const VerificationPage = () => {
  const { certificateId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [certData, setCertData] = useState<any>(null);

  useEffect(() => {
    const verifyCertificate = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/certificates/verify/${certificateId}`);
        setCertData(response.data);
        setError('');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Certificate not found or invalid');
      } finally {
        setLoading(false);
      }
    };

    if (certificateId) {
      verifyCertificate();
    }
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p>Verifying Certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 transition-all">
        {certData ? (
          <div>
            <div className="bg-emerald-500 py-6 flex flex-col items-center justify-center">
              <CheckCircle className="h-16 w-16 text-white mb-2" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Verified Authentic</h2>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">CERTIFICATE ID</p>
                <p className="text-lg font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded inline-block">
                  {certData.certificateId}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                  <User className="h-6 w-6 text-indigo-500" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Student</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{certData.student?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                  <Award className="h-6 w-6 text-rose-500" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Course Completed</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{certData.class?.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                  <Calendar className="h-6 w-6 text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Date Issued</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {new Date(certData.dateIssued).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-100 dark:bg-slate-900 aspect-[1.414]">
                  <iframe 
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${certData.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    width="100%"
                    height="100%"
                    title="Official Certificate Document"
                  />
                </div>
                <a 
                  href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${certData.pdfUrl}`}
                  target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors"
                >
                  <Download className="w-5 h-5" /> Download Official Certificate
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-rose-500 py-8 flex flex-col items-center justify-center">
              <XCircle className="h-16 w-16 text-white mb-3" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Verification Failed</h2>
            </div>
            
            <div className="p-8 text-center space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                {error || "We couldn't verify this certificate. It might be invalid or no longer exist."}
              </p>
              
              <div className="mt-6">
                <Link to="/" className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors w-full">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
