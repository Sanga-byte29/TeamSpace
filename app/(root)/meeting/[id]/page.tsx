"use client";

import React,{useState} from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { Loader } from 'lucide-react';
import { useGetCallById } from '@/hooks/useGetCallById';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';

const MeetingPage = ({params : {id}}: {params: {id: string}}) => {
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;




  return (
     <main className="h-screen w-full">
      <StreamCall call={call}>
      <StreamTheme>
      {!isSetupComplete ? (
          <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>

      </StreamCall>
     </main>
  )
}

export default MeetingPage