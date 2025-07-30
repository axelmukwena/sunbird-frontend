import { FC } from "react";

import { MainLayout } from "@/components/layout/main";
import { NotFound } from "@/views/not-found";

const NotFoundPage: FC = () => (
  <MainLayout>
    <NotFound />
  </MainLayout>
);

export default NotFoundPage;
