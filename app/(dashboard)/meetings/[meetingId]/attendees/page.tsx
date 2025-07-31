import { FC } from "react";

import { MeetingView } from "@/views/meetings/one";

type Params = Promise<{ meetingId: string }>;

interface AttendeePageProps {
  params: Params;
}

const AttendeesPage: FC<AttendeePageProps> = async (props) => {
  const params = await props.params;

  return <MeetingView meetingId={params.meetingId} />;
};

export default AttendeesPage;
