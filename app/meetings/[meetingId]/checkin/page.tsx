import {CheckInView} from "@/views/Meetings/One/CheckIn";
import { FC } from "react";

type Params = Promise<{ meetingId: string }>;

interface CheckInPageProps {
  params: Params;
}

const CheckInPage:FC<CheckInPageProps> = async (props) => {
  const params = await props.params;
  return (
    <CheckInView meetingId={params.meetingId} />
  );
}

export default CheckInPage;
