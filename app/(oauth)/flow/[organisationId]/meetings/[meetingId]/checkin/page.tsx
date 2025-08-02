import { FC } from "react";

import { MeetingCheckInFlowView } from "@/views/flow";

type Params = Promise<{
  organisationId: string;
  meetingId: string;
}>;

interface CheckInPageProps {
  params: Params;
}

const CheckInPage: FC<CheckInPageProps> = async (props) => {
  const params = await props.params;

  return (
    <MeetingCheckInFlowView
      organisationId={params.organisationId}
      meetingId={params.meetingId}
    />
  );
};

export default CheckInPage;
