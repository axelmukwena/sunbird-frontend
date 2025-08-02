import { FC } from "react";

import { MainLayout } from "@/components/layout/main";
import { HomeView } from "@/views/homeeee";

const HomePage: FC = () => {
  return (
    <MainLayout>
      <HomeView />
    </MainLayout>
  );
};

export default HomePage;
