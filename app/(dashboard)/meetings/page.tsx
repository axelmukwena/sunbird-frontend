import { FC } from "react";

import { MeetingsView } from "@/views/meetings/many";

type Params = Promise<{ subdomain: string }>;
interface MeetingsPageProps {
  params: Params;
}

const MeetingsPage: FC<MeetingsPageProps> = () => <MeetingsView />;

export default MeetingsPage;
