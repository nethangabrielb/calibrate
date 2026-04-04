import { FileUser, LayoutDashboard } from "lucide-react";

const Icon = ({ name }: { name: string }) => {
  const style = "w-7 h-7";

  switch (name) {
    case "dashboard":
      return <LayoutDashboard className={style} />;
    case "applications":
      return <FileUser className={style} />;
  }
};

export default Icon;
