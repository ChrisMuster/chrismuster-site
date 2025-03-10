import { TabsProps } from "@/components/tabs/tabs.types";

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="tab-buttons flex relative">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`relative px-xxsmall sm:px-xsmall py-3 sm:text-lg font-semibold transition-colors duration-200 
            ${activeTab === tab.id
            ? "border border-gray-300 border-b-[var(--background)] bg-[var(--background)] text-[var(--foreground)] z-20"
            : "border-transparent text-[var(--foreground)] hover:text-[var(--color-primary)] hover:bg-gray-100 z-10"
            } mt-[1px] -mb-[1px]
          `}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
