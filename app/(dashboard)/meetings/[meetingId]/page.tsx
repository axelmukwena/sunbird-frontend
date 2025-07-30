import { FC } from "react";

import { MeetingView } from "@/views/meetings/one";

type Params = Promise<{ meetingId: string }>;
interface MeetingPageProps {
  params: Params;
}

const MeetingsPage: FC<MeetingPageProps> = async (props) => {
  const params = await props.params;

  return <MeetingView meetingId={params.meetingId} />;
};

export default MeetingsPage;
