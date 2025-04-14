import {EditMeetingView} from "@/views/Meetings/One/Edit";
import { FC } from "react";

type Params = Promise<{ meetingId: string }>;

interface EditMeetingPageProps {
  params: Params;
}

const EditMeetingPage:FC<EditMeetingPageProps> = async (props) => {
  const params = await props.params;
  return (
    <EditMeetingView meetingId={params.meetingId} />
  );
}

export default EditMeetingPage;
