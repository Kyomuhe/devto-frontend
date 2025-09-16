import React from 'react';

export default function ProfileModal({
    open,
    onClose,
    name,
    username,
    onDashboard,
    onCreatePost,
    onReadingList,
    onSettings,
    onSignOut,
}) {
    if (!open) return null;

    return (
        <div className="absolute top-[60px] right-5 bg-white border border-gray-300 rounded-lg shadow-lg px-5 py-6 min-w-[220px] z-[1000]">
            <div className="mb-4">
                <div className="font-bold text-lg">{name}</div>
                <div className="text-gray-500 text-base">@{username}</div>
            </div>
            <div className="border-t border-gray-200 mb-2" />
            <div
                className="py-2 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={onDashboard}
            >
                Dashboard
            </div>
            <div
                className="py-2 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={onCreatePost}
            >
                Create Post
            </div>
            <div
                className="py-2 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={onReadingList}
            >
                Reading List
            </div>
            <div
                className="py-2 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={onSettings}
            >
                Settings
            </div>
            <div className="border-t border-gray-200 mt-2 mb-2" />
            <div
                className="py-2 cursor-pointer text-red-600 hover:bg-red-50"
                onClick={onSignOut}
            >
                Sign Out
            </div>
        </div>
    );
}