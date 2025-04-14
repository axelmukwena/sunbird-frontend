import {MeetingView} from "@/views/Meetings/One";
import { FC } from "react";

type Params = Promise<{ meetingId: string }>;

interface MeetingPageProps {
  params: Params;
}

const MeetingPage:FC<MeetingPageProps> = async (props) => {
  const params = await props.params;
  return (
    <MeetingView meetingId={params.meetingId} />
  );
}

export default MeetingPage;
