import { FC } from "react";

import { MeetingView } from "@/views/meetings/one";

type Params = Promise<{ meetingId: string; attendeeId: string }>;
interface AttendeePageProps {
  params: Params;
}

const AttendeePage: FC<AttendeePageProps> = async (props) => {
  const params = await props.params;

  return (
    <MeetingView meetingId={params.meetingId} attendeeId={params.attendeeId} />
  );
};

export default AttendeePage;
