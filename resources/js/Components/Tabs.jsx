import React, { useState } from 'react';

const Tabs = ({ tabs, container=true }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const boxShadow = container ? {boxShadow: '0px 2px 12px #e3e3e3'} : {};

  const containerStyles = container ? 'shadow-xl shadow-gray-200 sm:rounded-lg p-6' : '';

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div style={boxShadow} className={"bg-white overflow-hidden items-center flex gap-3 mb-10 justify-evenly" + containerStyles}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 -mb-px flex-1 border border-gray-200 rounded text-sm text-center border-b-2 ${
              activeTab === tab.label ? 'bg-gray-200 text-black-600 font-bold' : ' text-gray-500 font-medium'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={boxShadow} className={"bg-white overflow-hidden gap-3 mb-10" + containerStyles}>
        {tabs.map((tab) =>
          activeTab === tab.label ? (
            <div key={tab.label} className="p-4">
              {tab.content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
