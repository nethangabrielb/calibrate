import { LucideIcon } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon?: LucideIcon;
}) => {
  return (
    <div className="bg-card rounded-md border border-border border-l-4 border-l-primary p-6 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="size-4 text-primary" />}
      </div>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
};
export default DashboardCard;
