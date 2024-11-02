import React, { useState, useEffect } from 'react';

const TabsHorizontal = ({ tabs, actions=[], title, loadItem }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };
  useEffect(() => {
    tabs.map((tab) => {
      if (tab.label === activeTab && tab.loadItem) {
        tab.loadItem();
      }
    });
  }, [activeTab])

  return (
    <div className='flex flex-row gap-4'>
      <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white overflow-hidden shadow-xl h-[80vh] shadow-gray-200 sm:rounded-lg justify-between items-center w-1/5 flex flex-col gap-3 mb-10 p-6">
        <div className='flex flex-col w-full gap-3 items-center'>
            <h3 className='font-semibold text-left w-full'>{title}</h3>
            {tabs.map((tab) => (
            <button
                key={tab.label}
                onClick={() => handleTabClick(tab.label)}
                className={`px-4 py-2 -mb-px border w-full bg-gray-200 border-gray-200 rounded text-sm flex justify-between border-b-2 ${
                activeTab === tab.label ? 'bg-blue-200 text-blue-600 font-bold' : ' text-black font-medium'
                }`}
            >
                <p className='truncate'>
                {tab.label} <span>{tab.val}</span>
                </p>
            </button>
            ))}
        </div>
        <div className='actions flex flex-col w-full gap-3 items-center'>
            {actions?.map((action) => (
                <button
                    key={action.label}
                    onClick={action.action}
                    className={`px-4 py-2 -mb-px border flex flex-row gap-3 items-center justify-center w-full ${action.color} border-gray-200 rounded text-sm text-center border-b-2 ${
                    activeTab === action.label ? 'bg-blue-500 text-blue-600 font-bold' : ' text-white font-medium'
                    }`}
                >
                    {action.icon} {action.label}
                </button>
            ))}
        </div>
      </div>
      <div style={{boxShadow: '0px 2px 12px #e3e3e3'}} className="bg-white h-[80vh] overflow-y-auto shadow-xl shadow-gray-200 sm:rounded-lg gap-3 w-4/5 mb-10 p-4">
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

export default TabsHorizontal;
