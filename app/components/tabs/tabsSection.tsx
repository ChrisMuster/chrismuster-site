import { TabsSectionProps } from "@/components/tabs/tabs.types";
import Tabs from "@/components/tabs/tabs";

export default function TabsSection({ tabs, activeTab, onTabChange, children }: TabsSectionProps) {
  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

      {/* Content Section */}
      <div className="tab-section bg-[var(--background)] p-0 border border-gray-300 relative z-10">
        {children}
      </div>
    </div>
  );
}
